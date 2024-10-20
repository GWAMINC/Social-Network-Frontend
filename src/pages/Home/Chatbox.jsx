import React, { useState, useRef, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import './Chatbox.css'; 

const Chatbox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [recipient, setRecipient] = useState(""); 
  const [chatActive, setChatActive] = useState(false); 
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState(""); 
  const chatboxRef = useRef(null); 
  const messagesEndRef = useRef(null); // Ref for scrolling to the bottom

  // Thêm sự kiện click cho document
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatboxRef.current && !chatboxRef.current.contains(event.target)) {
        setIsChatOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cuộn đến tin nhắn cuối cùng
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleAddRecipient = () => {
    if (recipient.trim() !== "") {
      setChatActive(true); 
      setIsChatOpen(false); 
      setRecipient(""); 
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "You" }]);
      setInputMessage(""); 
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Biểu tượng message ở góc phải dưới */}
      <button
        className="fixed bottom-20 right-6 p-3 rounded-full bg-[#333] text-white shadow-md hover:bg-[#444] transition-all duration-300 transform hover:scale-110"
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Open chat"
      >
        <FaComments className="text-2xl" />
      </button>

      {/* Chatbox để nhập người nhận */}
      {isChatOpen && !chatActive && (
        <div
          ref={chatboxRef} 
          className={`chatbox fixed bottom-20 right-6 p-4 w-72 transition-opacity duration-300 ${isChatOpen ? 'open' : ''}`}
        >
          <button 
            className="absolute top-2 right-2 close-button" 
            onClick={() => setIsChatOpen(false)}
            aria-label="Close chatbox"
          >
            X
          </button>
          <h2 className="font-bold text-lg">New Message</h2>
          <div className="mt-2 flex items-center">
            <label htmlFor="to" className="block text-sm font-medium">To:</label>
            <input
              id="to"
              type="text"
              value={recipient} 
              onChange={(e) => setRecipient(e.target.value)} 
              className="w-full border rounded mt-1 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#333]"
              placeholder="Enter recipient"
            />
            <button
              onClick={handleAddRecipient} 
              className="ml-2 px-2 bg-[#333] text-white rounded hover:bg-[#444] transition duration-200"
              aria-label="Add recipient"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Chatbox hiển thị khi có recipient */}
      {chatActive && (
        <div className="chatbox fixed bottom-20 right-6 p-4 w-72 bg-white border border-gray-300 shadow-lg rounded-lg" ref={chatboxRef}>
          <button 
            className="absolute top-2 right-2 close-button" 
            onClick={() => setChatActive(false)}
            aria-label="Close chat"
          >
            X
          </button>
          <h2 className="font-bold text-lg">Chat with {recipient}</h2>
          
          {/* Hiển thị danh sách tin nhắn */}
          <div className="mt-2 h-48 overflow-y-auto border border-gray-300 p-2">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
                <span className={`font-medium ${msg.sender === "You" ? "text-blue-500" : "text-black"}`}>
                  {msg.sender}: 
                </span> 
                <span>{msg.text}</span>
              </div>
            ))}
            {/* Ref to scroll to the bottom */}
            <div ref={messagesEndRef} />
          </div>

          {/* Ô nhập tin nhắn */}
          <div className="mt-2 flex items-center">
            <input
              type="text"
              value={inputMessage} 
              onChange={(e) => setInputMessage(e.target.value)} 
              onKeyPress={handleKeyPress} // Thêm sự kiện cho phím Enter
              className="w-full border rounded mt-1 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#333]"
              placeholder="Type a message"
            />
            <button
              onClick={handleSendMessage} 
              className="ml-2 px-2 bg-[#333] text-white rounded hover:bg-[#444] transition duration-200"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
