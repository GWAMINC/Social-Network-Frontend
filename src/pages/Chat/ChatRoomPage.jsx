import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const ChatRoomPage = () => {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Kết nối lại với server khi component được render
        socket.connect();

        socket.emit('join_room', chatId);

        // Đảm bảo rằng các sự kiện chỉ được đăng ký một lần
        const handleLoadMessages = (loadedMessages) => {
            setMessages(loadedMessages);
        };

        const handleReceiveMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.on('load_messages', handleLoadMessages);
        socket.on('receive_message', handleReceiveMessage);

        // Ngắt kết nối và hủy sự kiện khi component bị unmount
        return () => {
            socket.off('load_messages', handleLoadMessages);
            socket.off('receive_message', handleReceiveMessage);
            socket.disconnect();
        };
    }, [chatId]);
    const sendMessage = () => {
        const senderId = localStorage.getItem('token');
        socket.emit('send_message', { chatId, senderId, content: message });
        setMessage('');
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 bg-white p-6 rounded shadow-lg">
                <h1 className="text-lg font-bold mb-4">Chat Room</h1>
                <div className="mb-4 h-64 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.sender?.name}: </strong>{msg.content}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <button onClick={sendMessage} className="w-full bg-blue-500 text-white p-2 rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoomPage;
