import React, { useEffect, useState } from 'react';
import { FaPhone, FaVideo, FaInfoCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './ChatRoomPage.css';

const socket = io('http://localhost:3000');

// Dữ liệu giả cho cuộc hội thoại
const fakeMessages = [
    { sender: { id: '1', name: 'Alice', avatar: 'https://via.placeholder.com/30' }, content: 'Chào, bạn có khỏe không?', time: '10:00 AM', status: 'Delivered' },
    { sender: { id: '2', name: 'Bob', avatar: 'https://via.placeholder.com/30' }, content: 'Mình khỏe, cảm ơn bạn! Còn bạn thì sao?', time: '10:01 AM', status: 'Delivered' },
    // Thêm các tin nhắn khác nếu cần
];

// Dữ liệu giả cho danh sách tin nhắn chờ
const fakePendingMessages = [
    { user: { id: '1', name: 'Alice', avatar: 'https://via.placeholder.com/30' }, lastMessage: 'Đang chờ bạn phản hồi!', time: '10:15 AM', isActive: true, isRead: false },
    { user: { id: '2', name: 'Bob', avatar: 'https://via.placeholder.com/30' }, lastMessage: 'Có tin nhắn mới từ mình!', time: '10:10 AM', isActive: false, isRead: true },
    { user: { id: '3', name: 'Charlie', avatar: 'https://via.placeholder.com/30' }, lastMessage: 'Hẹn gặp lại!', time: '10:05 AM', isActive: true, isRead: false },
];

const ChatRoomPage = () => {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [pendingMessages, setPendingMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);


    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        socket.connect();
        socket.emit('join_room', chatId);

        // Giả lập dữ liệu tin nhắn ban đầu
        setMessages(fakeMessages);
        setPendingMessages(fakePendingMessages);

        const handleLoadMessages = (loadedMessages) => {
            setMessages(loadedMessages);
        };

        const handleReceiveMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.on('load_messages', handleLoadMessages);
        socket.on('receive_message', handleReceiveMessage);

        return () => {
            socket.off('load_messages', handleLoadMessages);
            socket.off('receive_message', handleReceiveMessage);
            socket.disconnect();
        };
    }, [chatId]);

    const sendMessage = () => {
        const senderId = localStorage.getItem('token');
        if (message.trim()) {
            const newMessage = { 
                sender: { id: senderId, name: 'Bạn', avatar: 'https://via.placeholder.com/30' }, 
                content: message, 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
                status: 'Sent' 
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            socket.emit('send_message', { chatId, senderId, content: message });
            setMessage('');
        }
    };

    return (
        <div className="chatroom-container">
            <div className="feature-sidebar">
            <button onClick={openModal} className="calendar-button">
                Calendar
            </button>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        
                        <div className="calendar-container">
                            <style>
                                {`
                                /* Cài đặt background và hiệu ứng hover */
                                .bg-gradient::after {
                                    background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.6), transparent 20%);
                                }
                                `}
                            </style>
                            <div className="flex flex-col items-center justify-center px-6 bg-gray-900 rounded-lg">
                                <h1 className="text-2xl font-bold text-center text-white mb-4">Calendar</h1>

                                {/* Tiêu đề các ngày trong tuần */}
                                <div className="grid w-full grid-cols-7 gap-1 text-blue-300">
                                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, idx) => (
                                        <p key={idx} className="flex items-center justify-center h-12">
                                            {day}
                                        </p>
                                    ))}
                                </div>

                                {/* Các ô ngày trong tháng */}
                                <div className="grid w-full grid-cols-7 gap-1 mt-2">
                                    {[...Array(30).keys()].map(day => (
                                        <div 
                                            key={day} 
                                            className="relative cursor-pointer bg-gradient after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:opacity-0 hover:after:opacity-50"
                                            onMouseMove={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                                                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                                            }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-lg">
                                                {day + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="blur-background"></div>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>

            <div className="pending-messages-sidebar">
                <h2>Pending Messages</h2>
                {pendingMessages.map((msg, index) => (
                    <div key={index} className="pending-message">
                        <img src={msg.user.avatar} alt={msg.user.name} className="avatar" />
                        <div className="pending-message-content">
                            <strong>{msg.user.name}</strong>
                            <p>{msg.lastMessage}</p>
                            <small>{msg.time}</small>
                            <span className={`message-status ${msg.isRead ? 'read' : 'unread'}`}>
                                {msg.isRead ? '✔️' : '⏳'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="main-content">
            <div className="chat-header">
                <h1 className="chat-title">Chat Room</h1>

                {/* Các biểu tượng nút ở góc trên bên phải */}
                <div className="icon-container">
                    <button className="icon-button">
                        <FaPhone />
                    </button>
                    <button className="icon-button">
                        <FaVideo />
                    </button>
                    <button className="icon-button">
                        <FaInfoCircle />
                    </button>
                </div>
            </div>

            <div className="message-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender?.id === localStorage.getItem('token') ? 'my-message' : 'other-message'}`}>
                        <img src={msg.sender.avatar} alt={msg.sender.name} className="avatar" />
                        <div className="message-content">
                            <strong>{msg.sender.name}:</strong>
                            <p>{msg.content}</p>
                            <small>{msg.time} - {msg.status}</small>
                        </div>
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="message-input"
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="send-button">Send</button>
            </div>
        </div>
        </div>

    );
};

export default ChatRoomPage;
