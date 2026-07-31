import { useEffect, useRef, useState } from "react";
import { useChatbotContext } from "../ChatbotProvider";

// Each chip label maps to the actual question sent to the chatbot.
// This way clicking "AI projects" sends a proper, specific question that
// gets a sharp 2-3 sentence response, not just the label as a query.
const CHIP_QUESTIONS = {
  "AI projects":  "What are your most exciting AI projects you've built?",
  "Tech stack":   "What's your core tech stack and what do you build best with?",
  "Experience":   "Give me a quick snapshot of your professional experience.",
  "Contact":      "How can I get in touch with you?",
};
const CHIPS = Object.keys(CHIP_QUESTIONS);

// Render obviously "code-ish" assistant replies in mono/green to match the OS aesthetic.
function looksLikeCode(text) {
  return /[{}<>]|=>|;\s|\bfunction\b|```/.test(text || "");
}

// "AS" monogram — Anisha Singla's initials in the portfolio's display font.
function Monogram({ size = 15 }) {
  return (
    <span
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: `${size}px`,
        lineHeight: 1,
        letterSpacing: "0.5px",
        fontWeight: 400,
      }}
    >
      AS
    </span>
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
  const { messages, isStreaming, error, sendMessage, viewportRef, streamingBubbleIdRef } = useChatbotContext();
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  // Move focus into the input when the assistant opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // The typing indicator shows only before the first token arrives on the
  // currently-streaming bubble (i.e. its content is still empty).
  const streamingMsg = streamingBubbleIdRef?.current
    ? messages.find((m) => m.id === streamingBubbleIdRef.current)
    : null;
  const showTypingDots = isStreaming && (!streamingMsg || !streamingMsg.content);

  const submit = (event) => {
    event.preventDefault();
    const next = value.trim();
    if (!next || isStreaming) return;
    setValue("");
    sendMessage(next); // existing handler
  };

  const pickChip = (label) => {
    if (isStreaming) return;
    // API receives the full question; UI bubble shows just the short chip label
    sendMessage(CHIP_QUESTIONS[label] || label, label);
  };

  return (
    <section className="pa-chat" role="dialog" aria-label="Portfolio assistant" aria-modal={mobile ? "true" : undefined}>
      {/* Inline keyframe for the streaming cursor — avoids requiring a CSS file change */}
      <style>{`
        @keyframes pa-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <header className="pa-header">
        <span className="pa-bot" aria-hidden="true"><Monogram size={15} /></span>
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
          const isThisBubbleStreaming =
            !isUser &&
            isStreaming &&
            streamingBubbleIdRef?.current === message.id;
          const hasCitations = !isUser && Array.isArray(message.citations) && message.citations.length > 0;
          return (
            <div key={message.id}>
              <div className={`pa-row ${isUser ? "user" : "assistant"}`}>
                <div className={`pa-bubble ${isUser ? "user" : "assistant"} ${!isUser && looksLikeCode(message.content) ? "mono" : ""}`}>
                  <p className="pa-text">
                    {message.content}
                    {/* Streaming cursor — blinks while tokens are flowing */}
                    {isThisBubbleStreaming && (
                      <span
                        style={{
                          display: "inline-block",
                          width: "2px",
                          height: "1em",
                          background: "currentColor",
                          marginLeft: "2px",
                          verticalAlign: "middle",
                          animation: "pa-cursor-blink 0.9s step-end infinite",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </p>
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

        {/* Typing dots — show only before the first token arrives */}
        {showTypingDots && (
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
