import { useEffect, useRef, useState } from "react";
import {
  FALLBACK_ERROR_MESSAGE,
  getChatSessionId,
  getTwinId,
  sendChatMessage,
  logError,
  logInfo,
} from "../api/chatbotApi";

const VISITOR_EMAIL = "visitor@example.com";

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
  // `isStreaming` keeps its name so the UI (typing dots + disabled input/send)
  // works unchanged; it now means "a request is in flight".
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const viewportRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Resolve the twin and its stable session id once on mount.
  const twinIdRef = useRef(getTwinId());
  const sessionIdRef = useRef(getChatSessionId(twinIdRef.current));

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
      abortControllerRef.current?.abort();
    };
  }, []);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen((current) => !current);

  const sendMessage = async (input) => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isStreaming) {
      return;
    }

    const userMessage = createMessage("user", trimmedMessage);
    const assistantMessage = createMessage("assistant", "");

    setError("");
    setIsOpen(true);
    setIsStreaming(true);
    setMessages((current) => [...current, userMessage, assistantMessage]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // The backend keeps history via sessionId, so only the latest user
      // message is sent.
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
        current.map((message) =>
          message.id === assistantMessage.id
            ? { ...message, content: reply, citations }
            : message
        )
      );
    } catch (requestError) {
      if (requestError?.name === "AbortError") {
        return;
      }

      logError("Chat request failed", requestError);
      const displayMessage = requestError?.message || FALLBACK_ERROR_MESSAGE;

      setError(displayMessage);
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id
            ? { ...message, content: displayMessage }
            : message
        )
      );
    } finally {
      abortControllerRef.current = null;
      setIsStreaming(false);
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
    toggleChat,
    viewportRef,
  };
}
