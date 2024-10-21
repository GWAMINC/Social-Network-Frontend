// src/pages/NotificationsPage/NotificationsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NotificationsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; // Thêm biểu tượng dấu tick

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' hoặc 'unread'

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9090/api/notification/getNotificationByUser",
          { withCredentials: true }
        );
        setNotifications(res.data.notifications.reverse());
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      notification.isRead = true; // Cập nhật trạng thái tại client
      setNotifications([...notifications]); // Cập nhật lại danh sách thông báo để re-render
    }
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
  };

  const filteredNotifications = notifications.filter(notification => {
    const isUnread = !notification.isRead;
    const matchesSearch = notification.content.toLowerCase().includes(searchTerm.toLowerCase());
    return filter === 'all' ? matchesSearch : isUnread && matchesSearch;
  });

  return (
    <div className="notifications-page">
       <h1 className="TitleNoti">Your Notifications</h1>
      <div className="notifications-header">
        <div className="search-notification-section">
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-notification-input"
          />
        </div>
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('unread')} className={filter === 'unread' ? 'active' : ''}>Unread</button>
          <button onClick={markAllAsRead} className="mark-all-read">
            <FontAwesomeIcon icon={faCheckCircle} />
          </button>
        </div>
      </div>
      <div className="notifications-container">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification._id}
              className="notification-card"
              onClick={() => handleNotificationClick(notification)}
            >
              <img src={notification.author.avatar} alt={notification.author.name} className="notification-avatar" />
              <div className="notification-content">
                <p className="notification-message">{notification.content}</p>
                <p className="notification-time">{new Date(notification.createdAt).toLocaleString()}</p>
              </div>
              {notification.isRead && <span className="read-indicator"><FontAwesomeIcon icon={faCheck} /></span>} {/* Dấu tick xanh */}
            </div>
          ))
        ) : (
          <div>No notifications available.</div>
        )}
      </div>
    </div>
  );
};


export default NotificationsPage;

