import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingRobot from "./TypingRobot";

export default function ChatWindow({
  error,
  isOpen,
  isStreaming,
  messages,
  onClose,
  onSend,
  viewportRef,
}) {
  return (
    <section
      className={`chatbot-window ${isOpen ? "is-open" : ""}`}
      aria-hidden={!isOpen}
    >
      <ChatHeader onClose={onClose} />

      <div className="chatbot-body" ref={viewportRef}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
            citations={message.citations}
          />
        ))}

        {isStreaming ? <TypingRobot /> : null}
      </div>

      {error ? <p className="chatbot-error">{error}</p> : null}

      <ChatInput disabled={isStreaming} onSend={onSend} />
    </section>
  );
}
