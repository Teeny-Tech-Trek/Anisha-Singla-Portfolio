export default function TypingRobot() {
  return (
    <div className="chatbot-message-row is-assistant">
      <div className="chatbot-typing">
        <div className="chatbot-robot" aria-hidden="true">
          <span className="chatbot-robot-antenna" />
          <span className="chatbot-robot-eye left" />
          <span className="chatbot-robot-eye right" />
          <span className="chatbot-robot-mouth" />
        </div>

        <div className="chatbot-typing-dots" aria-label="Assistant is typing">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
