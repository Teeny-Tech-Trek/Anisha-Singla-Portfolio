import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useChatbotContext } from "./ChatbotProvider";
import PhoneFrame from "./components/PhoneFrame";
import ChatShell from "./components/ChatShell";
import "./styles/assistant.css";

const DESKTOP_MIN = 1024;
const EXIT_MS = 320;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= DESKTOP_MIN : true
  );
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= DESKTOP_MIN);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isDesktop;
}

function LauncherIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 8V4M9 3h6" />
      <circle cx="9" cy="13" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1.3" fill="currentColor" stroke="none" />
      <path d="M9 16.5h6" />
    </svg>
  );
}

/**
 * Top-level layout: a PUSH split (site shrinks left, phone docks right) on
 * desktop, a fullscreen panel on mobile. Reuses the chatbot context for all
 * open/close state. The phone's home button (and Esc) is the only exit; the
 * old floating "×" launcher is gone.
 */
export default function AssistantLayout({ children }) {
  const { isOpen, openChat, closeChat } = useChatbotContext();
  const isDesktop = useIsDesktop();
  const launcherRef = useRef(null);
  const wasOpen = useRef(false);

  // `rendered` keeps the phone/panel mounted through the exit animation;
  // `shown` drives the open transition (push + slide).
  const [rendered, setRendered] = useState(isOpen);
  const [shown, setShown] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // Mount next frame, then flip `shown` so the open transition runs.
      const raf = requestAnimationFrame(() => setRendered(true));
      const enter = window.setTimeout(() => setShown(true), 20);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(enter);
      };
    }
    // Animate out, then unmount after the transition finishes.
    const raf = requestAnimationFrame(() => setShown(false));
    const exit = window.setTimeout(() => setRendered(false), EXIT_MS);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exit);
    };
  }, [isOpen]);

  // Esc exits.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") closeChat();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeChat]);

  // Return focus to the launcher on close; nudge scroll-driven layout to
  // recompute after the width transition settles.
  useEffect(() => {
    if (wasOpen.current && !isOpen) launcherRef.current?.focus();
    wasOpen.current = isOpen;
    const timer = window.setTimeout(() => window.dispatchEvent(new Event("resize")), EXIT_MS + 20);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const splitOpen = shown && isDesktop;

  const canPortal = typeof document !== "undefined";

  return (
    <>
      {/* Reserve space via padding-right so content shifts left under no fixed phone */}
      <div className="assistant-split" data-open={splitOpen ? "" : undefined}>
        <main className="assistant-main">{children}</main>
      </div>

      {/* Desktop: phone dock FIXED to the viewport, portaled to <body> so no
          transformed/clipping ancestor can capture position: fixed. */}
      {isDesktop && rendered && canPortal && createPortal(
        <div className="assistant-dock" data-shown={shown ? "" : undefined} aria-hidden={!isOpen}>
          <PhoneFrame onExit={closeChat}>
            <ChatShell onExit={closeChat} />
          </PhoneFrame>
        </div>,
        document.body
      )}

      {/* Mobile: fullscreen panel, also portaled to <body>. */}
      {!isDesktop && rendered && canPortal && createPortal(
        <div className="assistant-mobile" data-shown={shown ? "" : undefined}>
          <ChatShell onExit={closeChat} mobile />
        </div>,
        document.body
      )}

      <button
        ref={launcherRef}
        type="button"
        className="assistant-launcher"
        onClick={openChat}
        aria-label="Open portfolio assistant"
        aria-expanded={isOpen}
        hidden={isOpen}
      >
        <LauncherIcon />
      </button>
    </>
  );
}
