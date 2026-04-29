import { ChatbotProvider, useChatbotContext } from "../ChatbotProvider";
import "../styles/chatbot.css";
import ChatWindow from "./ChatWindow";

function ChatbotLauncher() {
  const {
    closeChat,
    error,
    isOpen,
    isStreaming,
    messages,
    sendMessage,
    toggleChat,
    viewportRef,
  } = useChatbotContext();

  return (
    <div className="chatbot-shell">
      <ChatWindow
        error={error}
        isOpen={isOpen}
        isStreaming={isStreaming}
        messages={messages}
        onClose={closeChat}
        onSend={sendMessage}
        viewportRef={viewportRef}
      />

      <button
        type="button"
        className={`chatbot-fab ${isOpen ? "is-open" : ""}`}
        onClick={toggleChat}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
      >
        <span className="chatbot-fab-ring" />
        <span className="chatbot-fab-icon">
          {isOpen ? "×" : "🤖"}
        </span>
      </button>
    </div>
  );
}

export default function ChatButton() {
  return (
    <ChatbotProvider>
      <ChatbotLauncher />
    </ChatbotProvider>
  );
}
