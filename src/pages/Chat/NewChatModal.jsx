import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './NewChatModal.css';

const NewChatModal = ({ isOpen, onClose, updateNavbarChats, setUserChatDatas,userChatDatas }) => {
    const currentUserId = localStorage.getItem('token');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [groupName, setGroupName] = useState("");


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
    useEffect(() => {
        if (selectedUsers.length > 0) {
            const names = selectedUsers.slice(0, 3).map(user => user.name).join(', ');
            const moreUsers = selectedUsers.length > 3 ? ', ...' : '';
            setGroupName(names + moreUsers);
        } else {
            setGroupName("");
        }
    }, [selectedUsers]);
    const handleUserSelect = (user) => {
        setSelectedUsers(prevSelectedUsers => {
            if (prevSelectedUsers.some(selectedUser => selectedUser._id === user._id)) {
                return prevSelectedUsers.filter(selectedUser => selectedUser._id !== user._id);
            } else {
                return [...prevSelectedUsers, user];
            }
        });
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
        if (selectedUsers.length > 0) {
            try {
                const isGroupChat = selectedUsers.length > 1;
                const res = await axios.post(
                    'http://localhost:9090/api/chat/chats',
                    {
                        participants: [currentUserId, ...selectedUsers.map(user => user._id)],
                        isGroupChat: isGroupChat,
                        groupName: isGroupChat ? groupName : '' ,
                        groupPicture: ''
                    },
                    { withCredentials: true }
                );
                const userDataPromises = selectedUsers.map(user => fetchUser(user._id));
                const userDatas = await Promise.all(userDataPromises);
                const newUserChatDatas = userDatas.reduce((acc, userData) => {
                    acc[userData._id] = userData;
                    return acc;
                }, {});
                setUserChatDatas(prevData => ({
                    ...prevData,
                    ...newUserChatDatas
                }));
                updateNavbarChats(res.data);
                onClose();
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    alert("Chat đã tồn tại");
                } else {
                    console.log(error);
                }
            }
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal">
                <div className="modal-header">Tạo Chat Nhóm Mới</div>
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
                                {searchResults.length === 0 && (
                                    <div className="search-result-item">Không tìm thấy kết quả</div>
                                )}
                                {searchResults.map((user) => (
                                    <div
                                        key={user._id}
                                        className={`search-result-item ${selectedUsers.some(selectedUser => selectedUser._id === user._id) ? 'selected' : ''}`}
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
                        {selectedUsers.length > 0 && (
                            <div className="selected-users">
                                <span>Người dùng đã chọn:</span>
                                <ul>
                                    {selectedUsers.map(user => (
                                        <li key={user._id}>{user.name}</li>
                                    ))}
                                </ul>
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
    updateNavbarChats: PropTypes.func.isRequired,
    setUserChatDatas: PropTypes.func.isRequired,
    userChatDatas: PropTypes.object.isRequired
};

export default NewChatModal;