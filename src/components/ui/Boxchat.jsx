import { useState } from "react";

const Boxchat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "You" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 w-80 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-lg font-semibold">Chatbox</h3>
        <button className="text-gray-600 hover:text-gray-900">
          &times;
        </button>
      </div>
      <div className="mt-2 mb-4 max-h-60 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-1 p-2 rounded ${
              message.sender === "You" ? "bg-blue-100 text-right" : "bg-gray-100"
            }`}
          >
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Boxchat;
