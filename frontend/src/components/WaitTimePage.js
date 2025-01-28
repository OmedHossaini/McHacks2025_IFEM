import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const WaitTimePage = () => {
  const location = useLocation();
  const { waitTime, triageLevel } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message to the chat
    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response (replace with actual AI API call)
    const aiResponse = { text: `Thank you for your question: "${input}". A nurse will respond shortly.`, sender: 'ai' };
    setMessages((prev) => [...prev, aiResponse]);

    // Clear input
    setInput('');
  };

  return (
    <div className="wait-time-page">
      <h1>Your Wait Time</h1>
      <p>Your estimated wait time is: <strong>{waitTime} minutes</strong></p>
      <p>Your triage level is: <strong>{triageLevel}</strong></p>

      <div className="chatbox">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default WaitTimePage;