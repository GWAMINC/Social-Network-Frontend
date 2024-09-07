import React, { useState } from "react";
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
import { GrGroup } from "react-icons/gr";
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

  const navButtons = [
    { name: "Home", icon: FiHome, linkTo: "/" },
    { name: "Friends", icon: FiUsers, linkTo: "/friends" },
    { name: "Create a post", icon: FiPlusSquare, linkTo: "/create-post" },
    { name: "Video", icon: FiVideo, linkTo: "/video" },
    { name: "Groups", icon: GrGroup, linkTo: "/groups" },
  ];

  return (
    <div className="fixed top-0 left-0 z-10 w-full bg-gray-800 shadow-lg">
      <div className="flex items-center justify-between h-16 max-w-full px-6 mx-auto">
        {/* Logo and Search Bar */}
        <div className="flex items-center flex-1">
          <h1 className="mr-5 text-2xl font-bold text-white">
            <Link to="/" className="no-underline text-inherit">
              Kit<span className="text-white">Kat</span>
            </Link>
          </h1>
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search for friends, groups, pages"
              className="w-full px-4 py-2 pl-10 text-gray-800 bg-white border border-gray-300 rounded-lg"
            />
            <svg
              className="absolute w-5 h-5 text-gray-600 transform -translate-y-1/2 top-1/2 left-3"
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
        <div className="flex items-center justify-evenly flex-1">
          {navButtons.map((btn) => {
            return (
              <Link
                key={btn.name}
                to={btn.linkTo}
                className="text-decoration-none"
              >
                <Button className="text-xl flex items-center gap-2 text-white opacity-100 hover:bg-slate-600">
                  {btn.icon()}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Avatar and Menu */}
        <div className="flex items-center justify-end flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-4 cursor-pointer">
                <FiMenu className="text-white" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-72">
              <Link to="/create" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black cursor-pointer">
                  <FiPlusSquare />
                  <span>Tạo</span>
                </div>
              </Link>
              <Link to="/post" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black cursor-pointer">
                  <FiGitPullRequest />
                  <span>Đăng</span>
                </div>
              </Link>
              <Link to="/news" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black cursor-pointer">
                  <FiUsers />
                  <span>Tin</span>
                </div>
              </Link>
              <Link to="/reels" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black cursor-pointer">
                  <FiVideo />
                  <span>Thước phim</span>
                </div>
              </Link>
              <Link to="/life-events" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black cursor-pointer">
                  <FiHome />
                  <span>Sự kiện trong đời</span>
                </div>
              </Link>
              <Link to="/pages" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black cursor-pointer">
                  <FiUsers />
                  <span>Trang</span>
                </div>
              </Link>
              <Link to="/ads" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black cursor-pointer">
                  <FiPlusSquare />
                  <span>Quảng cáo</span>
                </div>
              </Link>
              <Link to="/groups" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black cursor-pointer">
                  <FiGitPullRequest />
                  <span>Nhóm</span>
                </div>
              </Link>
              <Link to="/events" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black cursor-pointer">
                  <FiUsers />
                  <span>Sự kiện</span>
                </div>
              </Link>
              <Link to="/marketplace" className="text-decoration-none">
                <div className="flex items-center gap-2 py-2 text-black cursor-pointer">
                  <FiHome />
                  <span>Bài niêm yết trên Marketplace</span>
                </div>
              </Link>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex items-center gap-2 ml-4 text-white">
                <MessageCircle />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="messenger-container">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b messenger-header">
                <div className="text-lg font-semibold messenger-title">
                  Messenger
                </div>
                <div className="flex items-center gap-2">
                  <Button className="flex items-center gap-2 text-white opacity-100 rounded-button hover:bg-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
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
                  <Button className="flex items-center gap-2 text-white opacity-100 rounded-button hover:bg-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
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
                  <Button className="flex items-center gap-2 text-white opacity-100 rounded-button hover:bg-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
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
                  <Button className="gap-2 text-white rounded-full opacity-100 rounded-button hover:bg-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
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
              <div className="p-3 border-b messenger-search">
                <input
                  type="text"
                  placeholder="Search Messenger"
                  className="w-full p-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div
                className="overflow-y-auto messenger-content"
                style={{ height: "calc(100% - 150px)" }}
              >
                {[
                  {
                    name: "Người A",
                    message: "Tôi",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người B",
                    message: "Yêu",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người C",
                    message: "Việt Nam",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người D",
                    message: "Vãi",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người E",
                    message: "Cả",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người F",
                    message: "Nho!",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người A",
                    message: "Tôi",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người B",
                    message: "Yêu",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người C",
                    message: "Việt Nam",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người D",
                    message: "Vãi",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người E",
                    message: "Cả",
                    avatar: "https://github.com/shadcn.png",
                  },
                  {
                    name: "Người F",
                    message: "Nho!",
                    avatar: "https://github.com/shadcn.png",
                  },
                ].map((chat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer messenger-item hover:bg-gray-100"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-black">
                        {chat.name}
                      </span>
                      <span className="text-sm text-gray-500 truncate">
                        {chat.message}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="messenger-footer">
                <Button className="footer-button ">See All in Messenger</Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="flex items-center gap-2 ml-4 text-white"
                onClick={toggleNotifications}
              >
                <Bell />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="notification-container">
              <div className="flex items-center justify-between p-3 border-b notification-header">
                <div className="text-lg font-semibold notification-title">
                  Notifications
                </div>
                <Button className="p-1 text-gray-200 rounded-full hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
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

              <div className="flex justify-between p-3 border-b notification-filters">
                <Button className="filter-button">Unread</Button>
                <Button className="filter-button">All</Button>
              </div>

              <div className="notification-content">
                {notifications &&
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className="flex items-center gap-3 p-3 cursor-pointer notification-item hover:bg-gray-100"
                    >
                      <div className="w-10 h-10 overflow-hidden rounded-full notification-avatar">
                        <img
                          src={notification.author.avatar}
                          alt="Avatar"
                          className="object-cover w-full h-full"
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

                        <span className="text-sm text-gray-500">
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
              <div className="flex items-center gap-2 ml-4 cursor-pointer">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>TT</AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-52">
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
