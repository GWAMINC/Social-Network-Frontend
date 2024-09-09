import React, {useEffect, useState} from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button.jsx";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar.jsx";
import {
  LogOut,
  User2,
  Settings,
  HelpCircle,
  MessageCircle,
  Bell,
} from "lucide-react";
import {
  FiHome,
  FiUsers,
  FiPlusSquare,
  FiVideo,
  FiGitPullRequest,
  FiMenu,
} from "react-icons/fi";
import axios from "axios";

import "./Messenger.css";
import "./Notification.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav>
      <NotificationPopover />
    </nav>
  );
};
const handleViewProfile = () => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    navigate(`/profile/${userId}`);
  }
};

const NotificationPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const [chats, setChats] = useState([]);
  const [userChatDatas, setUserChatDatas] = useState({});
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem('token');
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    const fetchnoti = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9090/api/notification/getNotificationByUser",
          { withCredentials: true }
        );
        setNotifications(res.data.notifications.reverse());
        console.log("data", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchnoti();
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/chat/all/${userId}`, {
          withCredentials: true,
        });
        setChats(response.data.chats);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };
    fetchChats();
  }, [userId]);
  const toggleChats = () => {
    const setUserDatas = async () => {
      const userDatas = {};
      for (const chat of chats) {
        const otherUserId = chat.participants.find(id => id !== userId);
        const response = await fetchUser(otherUserId);
        userDatas[otherUserId] = response;
      }
      setUserChatDatas(userDatas);
    };
    const fetchUser = async (userId) => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(`${apiUrl}/user/getUser/${userId}`, { withCredentials: true });
        return response.data;
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    setUserDatas();
  }
  const handleDateTime = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);

    const diffInSeconds = Math.floor((now - createdDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return "Vừa xong";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    } else {
      const day = createdDate.getDate();
      const month = createdDate.getMonth() + 1; // getMonth() trả về giá trị từ 0 (tháng 1) đến 11 (tháng 12)
      const year = createdDate.getFullYear();
      return `${day} tháng ${month}, ${year}`;
    }
  };
  // Ẩn navbar khi ở trang đăng nhập hoặc trang đăng ký
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  const handleLogout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${apiUrl}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        alert(response.data.message);
      } else {
        alert(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="bg-gray-800 fixed top-0 left-0 w-full z-10 shadow-lg">
      <div className="flex items-center justify-between max-w-full h-16 mx-auto px-6">
        {/* Logo and Search Bar */}
        <div className="flex items-center flex-1">
          <h1 className="text-2xl font-bold text-white mr-5">
            <Link to="/" className="text-inherit no-underline">
              Kit<span className="text-white">Kat</span>
            </Link>
          </h1>
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search for friends, groups, pages"
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 bg-white text-gray-800"
            />
            <svg
              className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M14.35 14.35A6.5 6.5 0 0015 10a6.5 6.5 0 10-6.5 6.5 6.5 0 004.85-1.15z"
              />
            </svg>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center flex-1">
          <Link to="/" className="text-decoration-none mx-2">
            <Button className="flex items-center gap-2 text-white opacity-100 hover:bg-slate-600 ">
              <FiHome />
              Home
            </Button>
          </Link>
          <Link to="/friends" className="text-decoration-none mx-2">
            <Button className="flex items-center gap-2 text-white opacity-100 hover:bg-slate-600">
              <FiUsers />
              Friends
            </Button>
          </Link>
          <Link to="/create-post" className="text-decoration-none mx-2">
            <Button className="flex items-center gap-2 text-white opacity-100 hover:bg-slate-600">
              <FiPlusSquare />
              Create a Post
            </Button>
          </Link>
          <Link to="/video" className="text-decoration-none mx-2">
            <Button className="flex items-center gap-2 text-white opacity-100 hover:bg-slate-600">
              <FiVideo />
              Video
            </Button>
          </Link>
          <Link to="/group" className="text-decoration-none mx-2">
            <Button className="flex items-center gap-2 text-white opacity-100 hover:bg-slate-600">
              <FiGitPullRequest />
              Group
            </Button>
          </Link>
        </div>

        {/* Avatar and Menu */}
        <div className="flex items-center justify-end flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-4 cursor-pointer">
                <FiMenu className="text-white" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col gap-2">
              <Link to="/create" className="text-decoration-none">
                <div className="flex items-center gap-2 cursor-pointer py-2 text-black">
                  <FiPlusSquare />
                  <span>Tạo</span>
                </div>
              </Link>
              <Link to="/post" className="text-decoration-none">
                <div className="flex items-center gap-2 cursor-pointer py-2 text-black">
                  <FiGitPullRequest />
                  <span>Đăng</span>
                </div>
              </Link>
              <Link to="/news" className="text-decoration-none">
                <div className="flex items-center gap-2 cursor-pointer py-2 text-black">
                  <FiUsers />
                  <span>Tin</span>
                </div>
              </Link>
              <Link to="/reels" className="text-decoration-none">
                <div className="flex items-center gap-2 cursor-pointer py-2 text-black">
                  <FiVideo />
                  <span>Thước phim</span>
                </div>
              </Link>
              <Link to="/life-events" className="text-decoration-none">
                <div className="flex items-center gap-2 cursor-pointer py-2 text-black">
                  <FiHome />
                  <span>Sự kiện trong đời</span>
                </div>
              </Link>
              <Link to="/pages" className="text-decoration-none">
                <div className="flex items-center gap-2 cursor-pointer py-2 text-black">
                  <FiUsers />
                  <span>Trang</span>
                </div>
              </Link>
              <Link to="/ads" className="text-decoration-none">
                <div className="flex items-center gap-2 cursor-pointer py-2 text-black">
                  <FiPlusSquare />
                  <span>Quảng cáo</span>
                </div>
              </Link>
              <Link to="/groups" className="text-decoration-none">
                <div className="flex items-center gap-2 cursor-pointer py-2 text-black">
                  <FiGitPullRequest />
                  <span>Nhóm</span>
                </div>
              </Link>
              <Link to="/events" className="text-decoration-none">
                <div className="flex items-center gap-2 cursor-pointer py-2 text-black">
                  <FiUsers />
                  <span>Sự kiện</span>
                </div>
              </Link>
              <Link to="/marketplace" className="text-decoration-none">
                <div className="flex items-center gap-2 cursor-pointer py-2 text-black">
                  <FiHome />
                  <span>Bài niêm yết trên Marketplace</span>
                </div>
              </Link>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                  className="flex items-center gap-2 text-white ml-4"
                  onClick={toggleChats}
              >
                <MessageCircle />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="messenger-container">
              {/* Header */}
              <div className="messenger-header flex items-center justify-between p-3 border-b">
                <div className="messenger-title font-semibold text-lg">
                  Messenger
                </div>
                <div className="flex items-center gap-2">
                  <Button className="rounded-button flex items-center gap-2 text-white opacity-100 hover:bg-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Button>
                  <Button className="rounded-button flex items-center gap-2 text-white opacity-100 hover:bg-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Button>
                  <Button className="rounded-button flex items-center gap-2 text-white opacity-100 hover:bg-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Button>
                  <Button className="rounded-button rounded-full gap-2 text-white opacity-100 hover:bg-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14m7-7H5" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="messenger-search p-3 border-b">
                <input
                  type="text"
                  placeholder="Search Messenger"
                  className="w-full p-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div
                className="messenger-content overflow-y-auto"
                style={{ height: "calc(100% - 150px)" }}
              >
                {chats.map((chat, index) => (
                  <div
                    key={index}
                  >
                    <Link to={`/chats/${chat._id}`} className="messenger-item flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={userChatDatas[chat.participants[1]]?.avatar || ""} alt={userChatDatas[chat.participants[1]]?.name || ""} />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        {userChatDatas[chat.participants[1]]?.name || "User Name"}
                      </span>
                      <span className="text-gray-500 text-sm truncate">
                        Message content
                      </span>
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="messenger-footer">
                <Link to = {"/chats"}>
                  <Button className="footer-button ">See All in Messenger</Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="flex items-center gap-2 text-white ml-4"
                onClick={toggleNotifications}
              >
                <Bell />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="notification-container">
              <div className="notification-header flex items-center justify-between p-3 border-b">
                <div className="notification-title font-semibold text-lg">
                  Notifications
                </div>
                <Button className="p-1 text-gray-200 hover:bg-gray-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </div>

              <div className="notification-filters flex justify-between p-3 border-b">
                <Button className="filter-button">Unread</Button>
                <Button className="filter-button">All</Button>
              </div>

              <div className="notification-content">
                {notifications &&
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className="notification-item flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="notification-avatar w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={notification.author.avatar}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                        <div>{handleDateTime(notification.createdAt)}</div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between pr-5">
                          <span className="font-semibold">
                            {notification.author.name}
                          </span>
                          <div>{handleDateTime(notification.createdAt)}</div>
                        </div>

                        <span className="text-gray-500 text-sm">
                          {notification.content}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="notification-footer">
                <Button className="text-blue-500 hover:text-blue-700">
                  See Previous Notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer ml-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>TT</AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-4 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col gap-2">
              <Link to="/profile" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black">
                  <User2 />
                  <span>View Profile</span>
                </div>
              </Link>
              <Link to="/settings" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black">
                  <Settings />
                  <span>Settings</span>
                </div>
              </Link>
              <Link to="/support" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black">
                  <HelpCircle />
                  <span>Support</span>
                </div>
              </Link>
              <Link to="/login" className="text-decoration-none">
                <div
                  className="flex items-center gap-2 py-2 text-black"
                  onClick={handleLogout}
                >
                  <LogOut />
                  <span>Logout</span>
                </div>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
