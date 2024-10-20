// Chatbox.jsx
import { useState } from "react";

const FakeChatbox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("User1"); // Thay bằng tên người dùng thực tế
  const [avatar, setAvatar] = useState("https://via.placeholder.com/50"); // Thay bằng link avatar thực tế

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: userName }]);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 border rounded-lg shadow-lg bg-white">
      <div className="flex items-center p-4 border-b">
        <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
        <span className="font-semibold">{userName}</span>
      </div>
      <div className="h-60 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === userName ? 'text-right' : ''}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.sender === userName ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          className="border rounded-lg w-full p-2"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default FakeChatbox;
