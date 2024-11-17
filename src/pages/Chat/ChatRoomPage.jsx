import React, { useEffect, useState, useRef } from 'react';
import { FaPhone, FaVideo, FaInfoCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import feather from 'feather-icons';
import './ChatRoomPage.css';

const socket = io('http://localhost:3000');

const ChatRoomPage = () => {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [pendingMessages, setPendingMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    const messageListRef = useRef(null);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const scrollToBottom = () => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    };

    const handleScroll = () => {
        if (messageListRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
            const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
            setShowScrollButton(isScrolledUp);
            setIsAutoScroll(!isScrolledUp);
        }
    };

    useEffect(() => {
        feather.replace(); 
      }, []);

    useEffect(() => {
        socket.connect();
        socket.emit('join_room', chatId);

        const handleLoadMessages = (loadedMessages) => {
            setMessages(loadedMessages);
            setTimeout(scrollToBottom, 100); 
        };

        const handleReceiveMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        const handleDeleteMessage = (messageId) => {
            setMessages((prevMessages) => prevMessages.filter(msg => msg._id !== messageId));
        };

        socket.on('load_messages', handleLoadMessages);
        socket.on('new_message', handleReceiveMessage);
        socket.on('delete_message', handleDeleteMessage);

        fetch(`/api/messages?chatID=${chatId}`)
            .then(response => response.json())
            .then(data => {
                setMessages(data);
                setTimeout(scrollToBottom, 100);
            })
            .catch(error => console.error('Error fetching messages:', error));

        return () => {
            socket.off('load_messages', handleLoadMessages);
            socket.off('new_message', handleReceiveMessage);
            socket.off('delete_message', handleDeleteMessage);
            socket.disconnect();
        };
    }, [chatId]);

    useEffect(() => {
        if (isAutoScroll && messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isAutoScroll]);

    const sendMessage = () => {
        const userToken = localStorage.getItem('token');
        if (userToken && message.trim()) {
            const user = JSON.parse(userToken); 
            const now = new Date();
            const formattedDate = now.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const formattedTime = now.toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
            });

            const newMessage = { 
                sender: { id: user.id, name: user.name, avatar: user.avatar }, 
                content: message, 
                date: formattedDate,
                time: formattedTime,
                status: 'Sent' 
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            socket.emit('send_message', { chatId, senderId: user.id, content: message });
            setMessage('');
        }
    };

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const userId = 'current_user_id';
                const response = await axios.get(`${apiUrl}/chat/all/${userId}`); 
                setPendingMessages(response.data.chats);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, []);

    return (
        <div className="chatroom-container">
            <main className="c-app">
                <aside className="c-sidepanel">
                <nav className="c-sidepanel__nav">
                    <ul>
                    <li className="c-sidepanel__nav__li">
                        <a className="c-sidepanel__nav__link" href="" title="Inbox">
                        <i data-feather="inbox"></i> Inbox
                        </a>
                    </li>
                    <li className="c-sidepanel__nav__li">
                        <a className="c-sidepanel__nav__link" href="" title="Drafts">
                        <i data-feather="edit"></i> Drafts
                        </a>
                    </li>
                    <li className="c-sidepanel__nav__li">
                        <a className="c-sidepanel__nav__link" href="" title="Sent">
                        <i data-feather="send"></i> Sent
                        </a>
                    </li>
                    <li className="c-sidepanel__nav__li">
                        <a className="c-sidepanel__nav__link" href="" title="Favourites">
                        <i data-feather="star"></i> Favourites
                        </a>
                    </li>
                    <li className="c-sidepanel__nav__li">
                        <a className="c-sidepanel__nav__link" href="" title="Trash">
                        <i data-feather="trash"></i> Trash
                        </a>
                    </li>
                    </ul>
                </nav>

                <nav className="c-sidepanel__nav c-sidepanel__nav--spacer">
                    <ul>
                    <li className="c-sidepanel__nav__li">
                        <a className="c-sidepanel__nav__link c-sidepanel__nav__link--success" href="" title="Paid">
                        <i data-feather="check-circle"></i> Paid
                        </a>
                    </li>
                    <li className="c-sidepanel__nav__li">
                        <a className="c-sidepanel__nav__link c-sidepanel__nav__link--pending" href="" title="Pending">
                        <i data-feather="clock"></i> Pending
                        </a>
                    </li>
                    <li className="c-sidepanel__nav__li">
                        <a className="c-sidepanel__nav__link c-sidepanel__nav__link--warning" href="" title="Denied">
                        <i data-feather="x-circle"></i> Denied
                        </a>
                    </li>
                    </ul>
                </nav>

                <nav className="c-sidepanel__nav c-sidepanel__nav--spacer c-friends">
                    <div className="c-sidepanel__header">
                    <h2>Friends</h2>
                    <button>See All</button>
                    </div>
                    <ul className="c-friends__list">
                    <li className="c-friends__link">
                        <img className="c-friends__image" src="friend1.jpg" alt="Friend 1" />
                        Friend 1
                    </li>
                    <li className="c-friends__link">
                        <img className="c-friends__image" src="friend2.jpg" alt="Friend 2" />
                        Friend 2
                    </li>
                    <li className="c-friends__link">
                        <img className="c-friends__image" src="friend1.jpg" alt="Friend 1" />
                        Friend 1
                    </li>
                    <li className="c-friends__link">
                        <img className="c-friends__image" src="friend2.jpg" alt="Friend 2" />
                        Friend 2
                    </li>
                    </ul>
                    <p className="c-friends__active">Active: 2</p>
                </nav>
                </aside>
            </main>


        <div className="pending-messages-sidebar">
            <h2>Pending Messages</h2>
            {pendingMessages.map((chat, index) => (
                <div key={index} className="pending-message">
                <img src={chat.participants[0].avatar} alt={chat.participants[0].name} className="avatar" />
                <div className="pending-message-content">
                    <strong>{chat.participants[0].name}</strong>
                    <p>{chat.lastMessage}</p>
                    <small>{new Date(chat.updatedAt).toLocaleString()}</small>
                    <span className={`message-status ${chat.isRead ? 'read' : 'unread'}`}>
                    {chat.isRead ? '✔️' : '⏳'}
                    </span>
                </div>
            </div>
            ))}
        </div>

        <div className="main-content">
                <div className="chat-header">
                    <h1 className="chat-title">Chat Room</h1>
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

                <div className="message-list" ref={messageListRef} onScroll={handleScroll}>
                    {messages.map((msg, index) => (
                        <div key={index} 
                            className={`message ${msg.sender.id === localStorage.getItem('token') ? 'my-message' : 'other-message'}`}
                        >
                            <div className="message-wrapper">
                                <img src={msg.sender.avatar} alt={msg.sender.name} className="avatar" />
                                <div className="message-content">
                                    <div className="message-header">
                                        <span className="message-author">{msg.sender.name}</span>
                                        <div className="message-time">
                                            <span className="date">{msg.date}</span>
                                            <span className="time">{msg.time}</span>
                                        </div>
                                    </div>
                                    <div className="message-body">
                                        <p className="message-text">{msg.content}</p>
                                        <span className={`message-status ${msg.status.toLowerCase()}`}>
                                            {msg.status === 'Sent' ? '✔️' : '⏳'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showScrollButton && (
                    <button 
                        className="new-message-button"
                        onClick={scrollToBottom}
                    >
                        New Messages ↓
                    </button>
                )}

                <div className="message-input-container">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') sendMessage();
                        }}
                        className="message-input"
                    />
                    <button onClick={sendMessage} className="send-button">Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoomPage;