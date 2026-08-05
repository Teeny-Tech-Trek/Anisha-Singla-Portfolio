import { useEffect, useRef, useState } from "react";
import { useChatbotContext } from "../ChatbotProvider";
import { navigateTo, navigateToSection, ROUTES } from "../../../routes";

// Each chip label maps to the actual question sent to the chatbot.
// This way clicking "AI projects" sends a proper, specific question that
// gets a sharp 2-3 sentence response, not just the label as a query.
const CHIP_QUESTIONS = {
  "AI projects":      "What are your most exciting AI projects you've built?",
  "Tech stack":       "What's your core tech stack and what do you build best with?",
  "Experience":       "Give me a quick snapshot of your professional experience.",
  "Download Resume":  "Download Resume",
  "Contact":          "How can I get in touch with you?",
  "🎬 Know Me in 64s": "Tell me about yourself in 64 seconds.",
};
const CHIPS = Object.keys(CHIP_QUESTIONS);

// This preset takes over the whole chat content area instead of rendering
// as a normal small bubble — see `videoTakeoverActive` below.
const VIDEO_TAKEOVER_LABEL = "🎬 Know Me in 64s";

// Render obviously "code-ish" assistant replies in mono/green to match the OS aesthetic.
function looksLikeCode(text) {
  return /[{}<>]|=>|;\s|\bfunction\b|```/.test(text || "");
}

// Helper to extract section links like [Show More](#experience) and determine section routing.
function parseMessageContent(text) {
  if (!text) return { cleanText: "", actionSection: null, buttonLabel: "Show More" };

  let actionSection = null;
  let buttonLabel = "Show More";
  const regex = /\[([^\]]+)\]\(#([a-zA-Z0-9_-]+)\)/g;

  const cleanText = text.replace(regex, (match, label, sectionId) => {
    actionSection = sectionId;
    buttonLabel = label || "Show More";
    return "";
  }).trim();

  // Smart fallback section detection if LLM didn't output explicit markdown link
  if (!actionSection) {
    const lower = text.toLowerCase();
    if (
      lower.includes("resume") || lower.includes("cv") || lower.includes("download resume") ||
      lower.includes("provide me your resume") || lower.includes("give me your resume")
    ) {
      actionSection = "download_resume";
      buttonLabel = "Download Resume ⬇️";
    } else if (
      lower.includes("yourself") || lower.includes("who is anisha") || lower.includes("about me") ||
      lower.includes("who are you") || lower.includes("tell me about") || lower.includes("background") ||
      lower.includes("profile") || lower.includes("summary")
    ) {
      actionSection = "about";
    } else if (
      lower.includes("experience") || lower.includes("work history") || lower.includes("career") ||
      lower.includes("appu international") || lower.includes("role") || lower.includes("job") ||
      lower.includes("employment")
    ) {
      actionSection = "experience";
    } else if (
      lower.includes("education") || lower.includes("degree") || lower.includes("college") ||
      lower.includes("george brown") || lower.includes("jhanjeri") || lower.includes("qualification") ||
      lower.includes("b.tech") || lower.includes("academic") || lower.includes("university")
    ) {
      actionSection = "education";
    } else if (
      lower.includes("project") || lower.includes("projects") || lower.includes("nex-estate") ||
      lower.includes("neo-script") || lower.includes("built") || lower.includes("app") ||
      lower.includes("products") || lower.includes("case study")
    ) {
      actionSection = "projects";
    } else if (
      lower.includes("skill") || lower.includes("skills") || lower.includes("tech stack") ||
      lower.includes("tool") || lower.includes("python") || lower.includes("fastapi") ||
      lower.includes("react") || lower.includes("gemini") || lower.includes("rag") ||
      lower.includes("agile") || lower.includes("product management")
    ) {
      actionSection = "skills";
    } else if (
      lower.includes("contact") || lower.includes("email") || lower.includes("reach out") ||
      lower.includes("touch") || lower.includes("connect") || lower.includes("hire") ||
      lower.includes("phone") || lower.includes("location")
    ) {
      actionSection = "contact";
    }
  }

  return { cleanText, actionSection, buttonLabel };
}


// Helper to render **bold headings** & inline [Read More](#section) links cleanly at text end.
function renderFormattedContent(text, actionSection) {
  if (!text) return null;

  let contentToRender = text;

  // For non-bullet sections (about, experience, education, general), flatten any accidental bullet formatting into a single smooth paragraph
  if (actionSection && actionSection !== "projects" && actionSection !== "skills") {
    contentToRender = contentToRender
      .replace(/^-\s*\*\*[^*]+\*\*:\s*/gm, "")
      .replace(/^-\s*/gm, "")
      .replace(/\n+/g, " ")
      .trim();
  }

  // If there's an action section and text doesn't already end with a markdown link, append inline Read More link
  if (actionSection && actionSection !== "download_resume" && !/\[[^\]]+\]\([^)]+\)\s*$/.test(contentToRender.trim())) {
    if (actionSection === "contact") {
      contentToRender += " [Read More](#home)";
    } else {
      contentToRender += ` [Read More](#${actionSection})`;
    }
  }


  // Tokenize by **bold** and [label](url)
  const tokenRegex = /(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = contentToRender.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Handle **bold**
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={idx} style={{ color: "#f3c677", fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Handle [Label](URL)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={idx}
          href={url}
          onClick={(e) => {
            e.preventDefault();
            if (url === "#download_resume") {
              const link = document.createElement("a");
              link.href = "/resume.pdf";
              link.download = "Anisha_Singla_Resume.pdf";
              link.target = "_blank";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else if (url === "#contact") {
              navigateToSection("home");
            } else if (url.startsWith("#")) {
              navigateToSection(url.slice(1));
            } else {
              navigateTo(url);
            }
          }}
          style={{
            color: "#E4C976",
            textDecoration: "underline",
            fontWeight: 600,
            cursor: "pointer",
            marginLeft: "4px",
            fontSize: "0.82rem",
          }}
        >
          {label.includes("➔") || label.includes("⬇️") ? label : `${label} ➔`}
        </a>
      );
    }

    return part;
  });
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

// Renders a preset response of type "video" — used by "🎬 Know Me in 64s".
// Shows a caption, a buffering skeleton while the video loads, and a text
// fallback (with a direct link) if the video fails to load.
function VideoMessage({ url, caption }) {
  const [status, setStatus] = useState("loading");

  return (
    <>
      {caption && (
        <p className="pa-text" style={{ whiteSpace: "pre-wrap", marginBottom: 8 }}>
          {caption}
        </p>
      )}
      {status === "error" ? (
        <p className="pa-text" style={{ whiteSpace: "pre-wrap" }}>
          Couldn&apos;t load the video —{" "}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#E4C976", textDecoration: "underline", fontWeight: 600 }}
          >
            Watch it here
          </a>{" "}
          instead.
        </p>
      ) : (
        <div className="pa-video-wrap">
          {status === "loading" && (
            <div className="pa-video-skeleton" aria-label="Video loading">
              <span className="pa-video-spinner" />
            </div>
          )}
          <video
            src={url}
            controls
            autoPlay
            playsInline
            onCanPlay={() => setStatus("ready")}
            onError={() => setStatus("error")}
            style={{
              width: "100%",
              borderRadius: "12px",
              marginTop: "8px",
              display: status === "ready" ? "block" : "none",
            }}
          />
        </div>
      )}
    </>
  );
}

// Follow-up bubble shown right after the video takeover is closed — a quick
// "thanks for watching" nudge toward the About page.
function PostVideoCta({ title, subtitle, buttonLabel }) {
  return (
    <div className="pa-post-video">
      <p className="pa-text" style={{ marginBottom: 4 }}>{title}</p>
      <p className="pa-text" style={{ marginBottom: 10 }}>{subtitle}</p>
      <button
        type="button"
        className="pa-cta-btn"
        onClick={() => navigateTo(ROUTES.ABOUT)}
      >
        {buttonLabel} <span aria-hidden="true">➔</span>
      </button>
    </div>
  );
}

// Fullscreen-within-the-widget presentation for the video preset — fills the
// entire area above the input bar, hiding header/chips/message list while active.
function VideoTakeover({ url, caption, onClose }) {
  const [status, setStatus] = useState("loading");

  return (
    <div className="pa-video-takeover">
      <button
        type="button"
        className="pa-video-takeover-close"
        onClick={onClose}
        aria-label="Close video — back to chat"
      >
        ✕
      </button>

      {status === "error" ? (
        <div className="pa-video-takeover-fallback">
          <p className="pa-text" style={{ whiteSpace: "pre-wrap" }}>
            Couldn&apos;t load the video —{" "}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#E4C976", textDecoration: "underline", fontWeight: 600 }}
            >
              Watch it here
            </a>{" "}
            instead.
          </p>
        </div>
      ) : (
        <>
          {status === "loading" && (
            <div className="pa-video-takeover-skeleton" aria-label="Video loading">
              <span className="pa-video-spinner" />
            </div>
          )}
          <video
            src={url}
            controls
            autoPlay
            playsInline
            onCanPlay={() => setStatus("ready")}
            onError={() => setStatus("error")}
            className="pa-video-takeover-el"
            style={{ display: status === "ready" ? "block" : "none" }}
          />
        </>
      )}

      {caption && (
        <div className="pa-video-takeover-caption">
          <p className="pa-text">{caption}</p>
        </div>
      )}
    </div>
  );
}

/**
 * In-phone chat UI. Reuses ALL existing chat state/handlers from the context —
 * this is layout + reskin only. `mobile` shows an in-header exit button
 * (on desktop the phone's physical home button is the only exit).
 */
export default function ChatShell({ onExit, mobile = false }) {
  const {
    messages,
    isStreaming,
    error,
    sendMessage,
    scrollToBottom,
    viewportRef,
    streamingBubbleIdRef,
    closeIntroVideo,
  } = useChatbotContext();
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [videoTakeoverActive, setVideoTakeoverActive] = useState(false);

  // Move focus into the input when the assistant opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Restore normal scroll position once takeover closes and the message list remounts.
  const wasTakeoverActive = useRef(false);
  useEffect(() => {
    if (wasTakeoverActive.current && !videoTakeoverActive) {
      scrollToBottom(false);
    }
    wasTakeoverActive.current = videoTakeoverActive;
  }, [videoTakeoverActive, scrollToBottom]);

  const exitTakeover = () => setVideoTakeoverActive(false);

  // Explicit close (X) click — as opposed to the takeover being interrupted
  // by the user typing/submitting a new message — ends the video, removes
  // it from the chat history so it can't reappear as an inline bubble, and
  // immediately nudges toward the About page with a follow-up bubble.
  const handleVideoTakeoverClose = () => {
    setVideoTakeoverActive(false);
    closeIntroVideo();
  };

  const activeVideoMessage = videoTakeoverActive
    ? [...messages].reverse().find((m) => m.content && typeof m.content === "object" && m.content.type === "video")
    : null;

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
    exitTakeover();
    sendMessage(next); // existing handler
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Anisha_Singla_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pickChip = (label) => {
    if (isStreaming) return;
    if (label === "Download Resume") {
      handleDownloadResume();
      sendMessage("Can I download your resume?", "Download Resume");
      return;
    }
    sendMessage(CHIP_QUESTIONS[label] || label, label);
    if (label === VIDEO_TAKEOVER_LABEL) {
      setVideoTakeoverActive(true);
    }
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
      {!videoTakeoverActive && (
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
      )}

      {videoTakeoverActive && activeVideoMessage ? (
        <VideoTakeover
          url={activeVideoMessage.content.url}
          caption={activeVideoMessage.content.caption}
          onClose={handleVideoTakeoverClose}
        />
      ) : (
        <div className="pa-body" ref={viewportRef} aria-live="polite">
          {messages.map((message, index) => {
          const isUser = message.role === "user";
          const isThisBubbleStreaming =
            !isUser &&
            isStreaming &&
            streamingBubbleIdRef?.current === message.id;
          const hasCitations = !isUser && Array.isArray(message.citations) && message.citations.length > 0;
          const isVideoMessage =
            !isUser && message.content && typeof message.content === "object" && message.content.type === "video";
          const isPostVideoCta =
            !isUser && message.content && typeof message.content === "object" && message.content.type === "post-video-cta";
          const parsed = !isUser && !isVideoMessage && !isPostVideoCta ? parseMessageContent(message.content) : null;
          return (
            <div key={message.id}>
              <div className={`pa-row ${isUser ? "user" : "assistant"}`}>
                <div
                  className={`pa-bubble ${isUser ? "user" : "assistant"} ${
                    !isUser && !isVideoMessage && !isPostVideoCta && looksLikeCode(message.content) ? "mono" : ""
                  } ${isVideoMessage ? "video-bubble" : ""}`}
                >
                  {isVideoMessage ? (
                    <VideoMessage url={message.content.url} caption={message.content.caption} />
                  ) : isPostVideoCta ? (
                    <PostVideoCta
                      title={message.content.title}
                      subtitle={message.content.subtitle}
                      buttonLabel={message.content.buttonLabel}
                    />
                  ) : (
                    <p className="pa-text" style={{ whiteSpace: "pre-wrap" }}>
                      {isUser ? message.content : renderFormattedContent(parsed.cleanText, parsed.actionSection)}
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
                  )}
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
      )}

      {error ? <p className="pa-error">{error}</p> : null}

      <form className="pa-input" onSubmit={submit}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder="Ask anything…"
          onChange={(event) => {
            setValue(event.target.value);
            if (videoTakeoverActive) exitTakeover();
          }}
          onFocus={() => {
            if (videoTakeoverActive) exitTakeover();
          }}
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
