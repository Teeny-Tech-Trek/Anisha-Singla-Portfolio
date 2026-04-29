function RobotAvatar() {
  return (
    <div className="chatbot-header-avatar" aria-hidden="true">
      <span style={{
        position: 'absolute',
        fontSize: '1.5rem',
        lineHeight: 1,
      }}>
        🤖
      </span>
    </div>
  );
}

export default function ChatHeader({ onClose }) {
  return (
    <div className="chatbot-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RobotAvatar />
        <div>
          <p className="chatbot-eyebrow">Always On</p>
          <h2>Portfolio AI Assistant</h2>
        </div>
      </div>

      <button
        type="button"
        className="chatbot-close"
        onClick={onClose}
        aria-label="Close chat"
      >
        ×
      </button>
    </div>
  );
}
