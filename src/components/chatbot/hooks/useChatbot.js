import { useEffect, useRef, useState } from "react";
import {
  FALLBACK_ERROR_MESSAGE,
  getChatSessionId,
  getTwinId,
  sendChatMessage,
  streamChatMessage,
  logError,
  logInfo,
} from "../api/chatbotApi";

const VISITOR_EMAIL = "anonymous@visitor.internal";

const createMessage = (role, content, citations = []) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  role,
  content,
  citations,
});

const initialMessages = [
  createMessage(
    "assistant",
    "Hi, I'm your portfolio AI assistant. Ask me about projects, skills, experience, or anything you'd like to explore."
  ),
];

export function useChatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [isOpen, setIsOpen] = useState(false);
  // `isStreaming` is true while tokens are flowing — drives typing indicator
  // and disabled input state. Stays true even between stream start and first
  // token so the UI never shows a blank window.
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const viewportRef = useRef(null);
  const abortControllerRef = useRef(null);
  // Track the ID of the currently-streaming assistant bubble so ChatShell
  // can show the blinking cursor on the right bubble.
  const streamingBubbleIdRef = useRef(null);

  // Resolve the twin and its stable session id once on mount.
  const twinIdRef = useRef(getTwinId());
  const sessionIdRef = useRef(getChatSessionId(twinIdRef.current));

  // ── Typewriter queue ────────────────────────────────────────────────────
  // Split tokens into individual words and queue them for smooth 20ms rendering
  const typewriterQueue = useRef([]);
  const typewriterTimer = useRef(null);
  const TYPEWRITER_MS = 20;

  const startTypewriter = (targetId) => {
    if (typewriterTimer.current !== null) return;

    const tick = () => {
      if (typewriterQueue.current.length === 0) {
        typewriterTimer.current = null;
        return;
      }
      const word = typewriterQueue.current.shift();
      setMessages((current) =>
        current.map((msg) =>
          msg.id === targetId ? { ...msg, content: (msg.content || "") + word } : msg
        )
      );
      typewriterTimer.current = setTimeout(tick, TYPEWRITER_MS);
    };

    typewriterTimer.current = setTimeout(tick, TYPEWRITER_MS);
  };

  const stopTypewriter = () => {
    if (typewriterTimer.current !== null) {
      clearTimeout(typewriterTimer.current);
      typewriterTimer.current = null;
    }
    typewriterQueue.current = [];
  };

  logInfo("Hook initialized", { twinId: twinIdRef.current, sessionId: sessionIdRef.current });

  const scrollToBottom = () => {
    if (!viewportRef.current) {
      return;
    }
    viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  useEffect(() => {
    return () => {
      stopTypewriter();
      abortControllerRef.current?.abort();
    };
  }, []);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen((current) => !current);

  // sendMessage(input)              — normal typed message
  // sendMessage(query, displayText) — chip: query goes to API, displayText shown in bubble
  const sendMessage = async (input, displayText) => {
    const trimmedMessage = input.trim();
    // What shows in the user's bubble — either the display override or the raw input
    const bubbleText = (displayText || trimmedMessage).trim();

    if (!trimmedMessage || isStreaming) {
      return;
    }

    // Abort any previous in-flight request.
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const userMessage = createMessage("user", bubbleText);
    const assistantMessage = createMessage("assistant", "");

    setError("");
    setIsOpen(true);
    setIsStreaming(true);
    streamingBubbleIdRef.current = assistantMessage.id;
    setMessages((current) => [...current, userMessage, assistantMessage]);

    try {
      // ── Streaming path ──────────────────────────────────────────────────── //
      const stream = await streamChatMessage({
        twinId: twinIdRef.current,
        userEmail: VISITOR_EMAIL,
        sessionId: sessionIdRef.current,
        messages: [{ role: "user", content: trimmedMessage }],
        signal: controller.signal,
      });

      let gotAny = false;
      let finalReply = "";
      let finalCitations = [];

      stopTypewriter();
      for await (const event of stream) {
        if (controller.signal.aborted) break;

        if (!event.done) {
          // Token chunk — split into words and queue for smooth 20ms typing
          gotAny = true;
          const words = event.text.match(/\S+\s*/g) || [event.text];
          for (const word of words) {
            typewriterQueue.current.push(word);
          }
          startTypewriter(assistantMessage.id);
        } else {
          // Done frame — set canonical full reply
          finalReply = event.reply || "";
          finalCitations = event.citations || [];
        }
      }

      if (finalReply) {
        // Wait for typewriter queue to finish draining
        await new Promise((resolve) => {
          const wait = () => {
            if (typewriterQueue.current.length === 0 && typewriterTimer.current === null) resolve();
            else setTimeout(wait, 16);
          };
          wait();
        });
        setMessages((current) =>
          current.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: finalReply, citations: finalCitations }
              : msg
          )
        );
      } else if (!gotAny) {
        // Nothing streamed — fall through to non-streaming fallback below.
        stopTypewriter();
        throw Object.assign(new Error("no_tokens"), { streamedAny: false });
      }

    } catch (streamError) {
      if (streamError?.name === "AbortError") return;

      logError("Stream failed; trying non-streaming fallback", streamError);

      // ── Non-streaming fallback ─────────────────────────────────────────── //
      try {
        const data = await sendChatMessage({
          twinId: twinIdRef.current,
          userEmail: VISITOR_EMAIL,
          sessionId: sessionIdRef.current,
          messages: [{ role: "user", content: trimmedMessage }],
          signal: controller.signal,
        });

        const reply =
          (typeof data.reply === "string" && data.reply.trim()) ||
          "I couldn't generate a response just yet. Please try again.";
        const citations = Array.isArray(data.citations) ? data.citations : [];

        setMessages((current) =>
          current.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: reply, citations }
              : msg
          )
        );
      } catch (fallbackError) {
        if (fallbackError?.name === "AbortError") return;

        logError("Fallback also failed", fallbackError);
        const displayMessage = fallbackError?.message || FALLBACK_ERROR_MESSAGE;
        setError(displayMessage);
        setMessages((current) =>
          current.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: displayMessage }
              : msg
          )
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        const waitAndCleanup = async () => {
          if (typewriterQueue.current.length > 0 || typewriterTimer.current !== null) {
            await new Promise((resolve) => {
              const wait = () => {
                if (typewriterQueue.current.length === 0 && typewriterTimer.current === null) resolve();
                else setTimeout(wait, 16);
              };
              wait();
            });
          }
          abortControllerRef.current = null;
          streamingBubbleIdRef.current = null;
          setIsStreaming(false);
        };
        waitAndCleanup();
      }
    }
  };

  return {
    closeChat,
    error,
    isOpen,
    isStreaming,
    messages,
    openChat,
    scrollToBottom,
    sendMessage,
    streamingBubbleIdRef,
    toggleChat,
    viewportRef,
  };
}
