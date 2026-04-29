import { useState } from "react";

export default function ChatInput({ disabled, onSend }) {
  const [value, setValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextValue = value.trim();

    if (!nextValue || disabled) {
      return;
    }

    setValue("");
    await onSend(nextValue);
  };

  return (
    <form className="chatbot-input-wrap" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chatbot-input"
        placeholder="Ask about projects, skills, or experience..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
        aria-label="Message portfolio assistant"
      />

      <button
        type="submit"
        className="chatbot-send"
        disabled={disabled || !value.trim()}
      >
        Send
      </button>
    </form>
  );
}
