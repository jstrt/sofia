import React, { useState, useEffect, useRef } from "react";
import "./chat.css";

function Chat() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    setInput("");

    try {
      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [userMessage] }),
      });

      const data = await response.json();
      const botMessage = { role: "assistant", content: data.reply };
      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      localStorage.setItem("chatMessages", JSON.stringify(newMessages));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Welcome to SOFIA</h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            <div className="chat-name">
              {msg.role === "user" ? "You" : "Sofia"}
            </div>
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="질문을 입력하세요..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
