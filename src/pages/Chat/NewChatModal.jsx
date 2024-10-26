import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './NewChatModal.css';

const NewChatModal = ({ isOpen, onClose, updateNavbarChats, setUserChatDatas}) => {
    const currentUserId = localStorage.getItem('token');
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function searchUsers(query) {
            try {
                const res = await axios.get(
                    `http://localhost:9090/api/user/getUsersByName/${query}`,
                    { withCredentials: true }
                );
                const filteredResults = res.data.filter(user => user._id !== currentUserId);
                setSearchResults(filteredResults);
            } catch (error) {
                console.log(error);
            }
        }
        if (searchQuery) {
            searchUsers(searchQuery);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const fetchUser = async (userId) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await axios.get(`${apiUrl}/user/getUser/${userId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedUser) {
            try {
                const res = await axios.post(
                    'http://localhost:9090/api/chat/chats',
                    { participants: [currentUserId, selectedUser._id],
                            isGroupChat: false,
                            groupName: '',
                            groupPicture: '' },
                    { withCredentials: true }
                );
                const userData = await fetchUser(selectedUser._id);
                updateNavbarChats();
                setUserChatDatas(prevData => ({
                    ...prevData,
                    [selectedUser._id]: userData
                }));
                updateNavbarChats(res.data);
                onClose();
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal">
                <div className="modal-header">Tạo Chat Mới</div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="search"
                            placeholder="Tìm kiếm người dùng"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            required
                        />
                        {searchQuery && (
                            <div className="search-results">
                                {searchResults
                                    .filter(user => user.id !== currentUserId)
                                    .map((user) => (
                                        <div
                                            key={user.id}
                                            className={`search-result-item ${selectedUser && selectedUser.id === user.id ? 'selected' : ''}`}
                                            onClick={() => handleUserSelect(user)}
                                        >
                                            {user.profile.profilePhoto ? (
                                                <img src={user.profile.profilePhoto} alt="Avatar" />
                                            ) : (
                                                <div className="avatar-placeholder">
                                                    {user.name.charAt(0)}
                                                </div>
                                            )}
                                            {user.name}
                                        </div>
                                    ))}
                            </div>
                        )}
                        {selectedUser && (
                            <div className="selected-user">
                                <span>Người dùng đã chọn: {selectedUser.name}</span>
                            </div>
                        )}
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={onClose}>Đóng</button>
                    <button type="submit" onClick={handleSubmit}>Tạo</button>
                </div>
            </div>
        </>
    );
};

NewChatModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    updateNavbarChats: PropTypes.func.isRequired,
    setUserChatDatas: PropTypes.func.isRequired
};

export default NewChatModal;