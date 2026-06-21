import { useEffect, useRef, useState } from "react";
import { useChatbotContext } from "../ChatbotProvider";

const CHIPS = ["AI projects", "Tech stack", "Experience", "Contact"];

// Render obviously "code-ish" assistant replies in mono/green to match the OS aesthetic.
function looksLikeCode(text) {
  return /[{}<>]|=>|;\s|\bfunction\b|```/.test(text || "");
}

function BotIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 8V4M9 3h6" />
      <circle cx="9" cy="13" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

function HomeGlyphSmall() {
  return <span style={{ width: 13, height: 13, border: "1.5px solid currentColor", borderRadius: 3, display: "block" }} />;
}

/**
 * In-phone chat UI. Reuses ALL existing chat state/handlers from the context —
 * this is layout + reskin only. `mobile` shows an in-header exit button
 * (on desktop the phone's physical home button is the only exit).
 */
export default function ChatShell({ onExit, mobile = false }) {
  const { messages, isStreaming, error, sendMessage, viewportRef } = useChatbotContext();
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  // Move focus into the input when the assistant opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const next = value.trim();
    if (!next || isStreaming) return;
    setValue("");
    sendMessage(next); // existing handler
  };

  const pickChip = (text) => {
    if (isStreaming) return;
    sendMessage(text); // existing handler — no new send path
  };

  return (
    <section className="pa-chat" role="dialog" aria-label="Portfolio assistant" aria-modal={mobile ? "true" : undefined}>
      <header className="pa-header">
        <span className="pa-bot" aria-hidden="true"><BotIcon /></span>
        <div>
          <div className="pa-title">Portfolio Assistant</div>
          <div className="pa-online">● online</div>
        </div>
        <div className="pa-header-spacer" />
        {mobile && (
          <button type="button" className="pa-header-close" onClick={onExit} aria-label="Home — exit assistant">
            <HomeGlyphSmall />
          </button>
        )}
      </header>

      <div className="pa-body" ref={viewportRef} aria-live="polite">
        {messages.map((message, index) => {
          const isUser = message.role === "user";
          const hasCitations = !isUser && Array.isArray(message.citations) && message.citations.length > 0;
          return (
            <div key={message.id}>
              <div className={`pa-row ${isUser ? "user" : "assistant"}`}>
                <div className={`pa-bubble ${isUser ? "user" : "assistant"} ${!isUser && looksLikeCode(message.content) ? "mono" : ""}`}>
                  <p className="pa-text">{message.content}</p>
                  {hasCitations && (
                    <div className="pa-citations">
                      <p className="pa-citations-label">Sources</p>
                      <ul>
                        {message.citations.map((citation, i) => (
                          <li key={`cite-${i}`}>
                            {typeof citation === "string" ? citation : citation.text || citation.title || String(citation)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Suggested prompts below the first assistant message */}
              {index === 0 && message.role === "assistant" && (
                <div className="pa-chips">
                  {CHIPS.map((chip) => (
                    <button key={chip} type="button" className="pa-chip" onClick={() => pickChip(chip)} disabled={isStreaming}>
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isStreaming && (
          <div className="pa-row assistant">
            <div className="pa-typing" aria-label="Assistant is typing">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      {error ? <p className="pa-error">{error}</p> : null}

      <form className="pa-input" onSubmit={submit}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder="Ask anything…"
          onChange={(event) => setValue(event.target.value)}
          disabled={isStreaming}
          aria-label="Message portfolio assistant"
        />
        <button type="submit" className="pa-send" disabled={isStreaming || !value.trim()} aria-label="Send message">
          <SendIcon />
        </button>
      </form>
    </section>
  );
}
