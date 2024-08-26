// pages/AllChats.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllChats = () => {
    const [chats, setChats] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const userId = localStorage.getItem('token');
    const fetchChats = async () => {
        try {
            const response = await axios.get(`${apiUrl}/chat/all/${userId}`, { withCredentials: true });
            console.log(response.data.chats);
            setChats(response.data.chats);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    };

    useEffect(() => {


        fetchChats();
    }, [userId]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 bg-white p-6 rounded shadow-lg">
                <h1 className="text-lg font-bold mb-4">All Chats</h1>
                <ul>
                    {chats.map((chat) => (
                        <li key={chat._id} className="mb-2">
                            <Link to={`/chats/${chat._id}`} className="text-blue-500 hover:underline">
                                {chat.isGroupChat ? chat.groupName : `Chat with ${chat.participants[1]}`}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AllChats;
