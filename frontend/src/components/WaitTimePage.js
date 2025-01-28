import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const WaitTimePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { waitTime, triageLevel } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(waitTime * 60); // Convert waitTime to seconds

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // Redirect to the Doctor's Treatment Page when the timer runs out
      navigate('/doctor', { state: { triageLevel } });
    }
  }, [timeLeft, navigate, triageLevel]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message to the chat
    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    // Call your backend API for AI response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      if (response.ok) {
        const aiResponse = { text: data.response, sender: 'ai' };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        throw new Error(data.error || 'Unable to get AI response.');
      }
    } catch (error) {
      console.error('Error:', error);
      const aiResponse = { text: 'Sorry, I am unable to respond at the moment.', sender: 'ai' };
      setMessages((prev) => [...prev, aiResponse]);
    }

    // Clear input
    setInput('');
  };

  return (
    <div className="wait-time-page">
      <h1>Your Wait Time</h1>
      <p>Your estimated wait time is: <strong>{Math.floor(timeLeft / 60)} minutes {timeLeft % 60} seconds</strong></p>
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