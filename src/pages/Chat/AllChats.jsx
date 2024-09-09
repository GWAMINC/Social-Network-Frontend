// pages/AllChats.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllChats = () => {
    const [chats, setChats] = useState([]);
    const [userNames, setUserNames] = useState({});
    const apiUrl = import.meta.env.VITE_API_URL;
    const userId = localStorage.getItem('token');

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get(`${apiUrl}/chat/all/${userId}`, { withCredentials: true });
                setChats(response.data.chats);
            } catch (error) {
                console.error('Failed to fetch chats:', error);
            }
        };
        fetchChats();
    }, [userId]);

    useEffect(() => {
        const fetchUser = async (userId) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                const response = await axios.get(`${apiUrl}/user/getUser/${userId}`, { withCredentials: true });
                return response.data.name;
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };
        const setUserData = async () => {
            const newNames = {};
            for (const chat of chats) {
                const otherUserId = chat.participants.find(id => id !== userId);
                newNames[otherUserId] = await fetchUser(otherUserId);
            }
            setUserNames(newNames);
        };
        setUserData();
    }, [chats]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 bg-white p-6 rounded shadow-lg">
                <h1 className="text-lg font-bold mb-4">All Chats</h1>
                <ul>
                    {chats.map((chat) => (
                        <li key={chat._id} className="mb-2">
                            <Link to={`/chats/${chat._id}`} className="text-blue-500 hover:underline">
                                {chat.isGroupChat ? chat.groupName : `Chat with ${userNames[chat.participants.find(id => id !== userId)]}`}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AllChats;