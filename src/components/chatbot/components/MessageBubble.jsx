export default function MessageBubble({ content, role, citations = [] }) {
  const isUser = role === "user";
  const hasCitations = Array.isArray(citations) && citations.length > 0;

  return (
    <div
      className={`chatbot-message-row ${isUser ? "is-user" : "is-assistant"}`}
    >
      <div className={`chatbot-message-bubble ${isUser ? "user" : "assistant"}`}>
        <p className="chatbot-message-text">{content}</p>
        {hasCitations && !isUser && (
          <div className="chatbot-citations">
            <p className="chatbot-citations-label">Sources:</p>
            <ul className="chatbot-citations-list">
              {citations.map((citation, index) => (
                <li key={`citation-${index}`} className="chatbot-citation-item">
                  {typeof citation === "string" ? citation : citation.text || citation.title || String(citation)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
