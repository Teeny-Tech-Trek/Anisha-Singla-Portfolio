import { useEffect, useRef, useState } from "react";
import {
  FALLBACK_ERROR_MESSAGE,
  getChatSessionId,
  streamChatbotResponse,
} from "../api/chatbotApi";

const LOG_PREFIX = "[useChatbot]";

function logInfo(message, data = null) {
  const timestamp = new Date().toISOString();
  console.log(`${LOG_PREFIX} [${timestamp}] ${message}`, data || "");
}

function logError(message, error = null) {
  const timestamp = new Date().toISOString();
  console.error(`${LOG_PREFIX} [${timestamp}] ❌ ERROR: ${message}`, error || "");
}

function logDebug(message, data = null) {
  const timestamp = new Date().toISOString();
  console.debug(`${LOG_PREFIX} [${timestamp}] 🔍 DEBUG: ${message}`, data || "");
}

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

const getDisplayErrorMessage = (errorMessage) => {
  if (!errorMessage) {
    return FALLBACK_ERROR_MESSAGE;
  }

  const normalized = errorMessage.trim().toLowerCase();

  if (
    normalized === "failed to fetch" ||
    normalized.includes("networkerror") ||
    normalized.includes("load failed") ||
    normalized.includes("cors") ||
    normalized.includes("invalid empty stream")
  ) {
    return FALLBACK_ERROR_MESSAGE;
  }

  return errorMessage;
};

export function useChatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const viewportRef = useRef(null);
  const abortControllerRef = useRef(null);
  const sessionIdRef = useRef(getChatSessionId());

  logInfo("Hook initialized with sessionId", sessionIdRef.current);

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
      logInfo("Cleanup: aborting current request if any");
    };
  }, []);

  const openChat = () => {
    logInfo("Opening chat");
    setIsOpen(true);
  };
  
  const closeChat = () => {
    logInfo("Closing chat");
    setIsOpen(false);
  };
  
  const toggleChat = () => {
    logDebug("Toggling chat visibility");
    setIsOpen((current) => !current);
  };

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
    let streamReportedError = "";
    let receivedCitations = [];
    let accumulatedText = "";

    try {
      await streamChatbotResponse(trimmedMessage, {
        signal: controller.signal,
        sessionId: sessionIdRef.current,
        onError: (message) => {
          if (!message) {
            return;
          }

          streamReportedError = message;
        },
        onToken: (token, event) => {
          // Track accumulated text for token events
          if (event?.event === "token") {
            accumulatedText += token;
          }

          // Extract citations from the done event
          if (event?.done && event?.raw?.citations) {
            receivedCitations = Array.isArray(event.raw.citations) 
              ? event.raw.citations 
              : [event.raw.citations];
          }

          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessage.id
                ? { ...message, content: `${message.content}${token}` }
                : message
            )
          );
        },
      });

      if (streamReportedError) {
        setError(FALLBACK_ERROR_MESSAGE);
      }

      setMessages((current) => {
        const assistantEntry = current.find(
          (message) => message.id === assistantMessage.id
        );
        const assistantContent = assistantEntry?.content.trim() || "";
        const nextContent =
          assistantContent ||
          getDisplayErrorMessage(streamReportedError) ||
          "I couldn't generate a response just yet. Please try again.";

        return current.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                content: nextContent,
                citations: receivedCitations,
              }
            : message
        );
      });
    } catch (streamError) {
      if (streamError.name === "AbortError") {
        return;
      }

      const friendlyMessage =
        streamError instanceof Error && streamError.message
          ? getDisplayErrorMessage(streamError.message)
          : FALLBACK_ERROR_MESSAGE;

      setError(FALLBACK_ERROR_MESSAGE);
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                content:
                  message.content ||
                  friendlyMessage ||
                  FALLBACK_ERROR_MESSAGE,
                citations: receivedCitations,
              }
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
