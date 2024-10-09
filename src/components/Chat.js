import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5001/chat', {
        params: { message }
      });
      setChatHistory([...chatHistory, { user: message, ai: response.data }]);
      setMessage('');
    } catch (err) {
      setError('Failed to get response from AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Chat with AI</h2>
      <div>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <p><strong>You:</strong> {chat.user}</p>
            <p><strong>AI:</strong> {chat.ai}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage} disabled={loading || !message}>
        {loading ? 'Loading...' : 'Send'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Chat;
