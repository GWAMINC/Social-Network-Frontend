import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button.jsx";
import { PopoverContent } from "@radix-ui/react-popover";
import { ThemeContext } from "@/App";
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
  Moon,
  Sun,
  House,
  Users,
  SquarePlus,
  Video,
  Group,
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

const Navbar = ({currentUser}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav>
      <NotificationPopover currentUser = {currentUser} />
    </nav>
  );
};

const handleViewProfile = () => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    navigate(`/profile/${userId}`);
  }
};

const NotificationPopover = ({currentUser}) => {
  const location = useLocation();
  const userData = location.state?.userData;
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const [chats, setChats] = useState([]);
  const [userChatDatas, setUserChatDatas] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [groupSearchResults, setGroupSearchResults] = useState([]);
  const [postSearchResults, setPostSearchResults] = useState([]);

  const [theme, setTheme] = useContext(ThemeContext);
  const [profile, setProfile] = useState();
  const avatarUrl = profile?.profile?.profilePhoto;
  const firstLetter = profile?.name?.charAt(0).toUpperCase();
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/user/profile`, {
          withCredentials: true,
        });
        if (userData) {
          setProfile(userData.user);
        } else {
          setProfile(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    if (userData) {
      setProfile(userData.user);
    } else {
      fetchProfile();
    }
  }, [userData]);

  // Effect for search bar
  useEffect(() => {
    let ignore = false;

    async function searchUsers(query) {
      try {
        const res = await axios.get(
          `http://localhost:9090/api/user/getUsersByName/${query}`,
          { withCredentials: true }
        );
        setUserSearchResults(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function searchGroups(query) {
      try {
        const res = await axios.get(
          `http://localhost:9090/api/group/getGroupsByName/${query}`,
          { withCredentials: true }
        );
        setGroupSearchResults(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function searchPosts(query) {
      try {
        const res = await axios.get(
          `http://localhost:9090/api/post/getPostsByContent/${query}`,
          { withCredentials: true }
        );
        const posts = res.data;

        const result = await Promise.all(
          posts.map(async (post) => {
            const res = await axios.post(
              `http://localhost:9090/api/user/getProfileById`,
              { userId: post.userId },
              { withCredentials: true }
            );

            return { ...post, user: res.data.user };
          })
        );

        setPostSearchResults(result);
      } catch (error) {
        console.log(error);
      }
    }

    if (!ignore && searchQuery) {
      searchUsers(searchQuery);
      searchGroups(searchQuery);
      searchPosts(searchQuery);
    }

    return () => {
      ignore = true;
    };
  }, [searchQuery]);

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
        const otherUserId = chat.participants.find((id) => id !== userId);
        const response = await fetchUser(otherUserId);
        userDatas[otherUserId] = response;
      }
      setUserChatDatas(userDatas);
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
    setUserDatas();
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
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password"
  ) {
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
    { name: "Home", icon: House, linkTo: "/" },
    {
      name: "Friends",
      icon: Users,
      linkTo: "/friends",
      dis: "translate-x-[100%]",
    },
    {
      name: "Create a post",
      icon: SquarePlus,
      linkTo: "/create-post",
      dis: "translate-x-[200%]",
    },
    { name: "Video", icon: Video, linkTo: "/video", dis: "translate-x-[300%]" },
    {
      name: "Groups",
      icon: Group,
      linkTo: "/groups",
      dis: "translate-x-[400%]",
    },
  ];

  const pathIsInNavbar = (() => {
    let flag = false;
    for (const btn of navButtons) {
      if (btn.linkTo === location.pathname) {
        flag = true;
        break;
      }
    }
    return flag;
  })();

  const menuButtons = [
    { name: "Tạo", icon: FiPlusSquare, linkTo: "/create" },
    { name: "Đăng", icon: FiGitPullRequest, linkTo: "/create" },
    { name: "Tin", icon: FiUsers, linkTo: "/news" },
    { name: "Thước phim", icon: FiVideo, linkTo: "/reels" },
    { name: "Sự kiện trong đời", icon: FiHome, linkTo: "/life-events" },
    { name: "Trang", icon: FiUsers, linkTo: "/pages" },
    { name: "Quảng cáo", icon: FiPlusSquare, linkTo: "/ads" },
    { name: "Sự kiện", icon: FiUsers, linkTo: "/events" },
    {
      name: "Bài niêm yết trên Marketplace",
      icon: FiHome,
      linkTo: "/marketplace",
    },
  ];

  const accountMenuButtons = [
    { name: "View profile", icon: User2, linkTo: "/profile" },
    { name: "Settings", icon: Settings, linkTo: "/settings" },
    { name: "Support", icon: HelpCircle, linkTo: "/support" },
    { name: "Logout", icon: LogOut, linkTo: "/login", onClick: handleLogout },
  ];

  return (
    <div className="fixed top-0 left-0 z-10 w-full shadow-lg bg-background-lighter">
      <div className="flex items-center justify-between h-16 max-w-full px-6 mx-auto">
        {/* Logo and search bar */}
        <div className="flex items-center flex-1">
          {/* Logo */}
          <h1
            className={`${
              isSearchFocused ? "hidden" : ""
            } mr-5 text-2xl font-bold text-foreground`}
          >
            <Link to="/" className="no-underline text-inherit">
              Kit<span className="text-foreground-lighter">Kat</span>
            </Link>
          </h1>

          {/* Search bar */}
          <div className="relative w-full mr-10">
            <input
              type="text"
              placeholder="Search for friends, groups, pages"
              className="w-full px-4 py-2 pl-10 rounded-lg text-foreground bg-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />

            <svg
              className="absolute w-5 h-5 transform -translate-y-1/2 text-foreground-lighter top-1/2 left-3"
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

            {/* Search results */}
            <div
              className={`${
                isSearchFocused && searchQuery ? "" : "hidden"
              } absolute w-full max-h-[calc(100vh-_5rem)] overflow-y-auto mt-2 rounded-lg shadow-md top-full bg-background-lighter divide-y divide-border`}
            >
              {userSearchResults.length === 0 &&
              groupSearchResults.length === 0 &&
              postSearchResults.length === 0 ? (
                <div className="p-4 font-bold select-none text-foreground-lighter">
                  Không có kết quả
                </div>
              ) : (
                <>
                  {/* User search results */}
                  <div hidden={userSearchResults.length === 0}>
                    <h3 className="px-4 py-2 font-bold select-none text-foreground-lighter">
                      Mọi người
                    </h3>

                    <ul>
                      {userSearchResults.map((user) => {
                        return (
                          <li
                            key={user._id}
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-dropdown-hover"
                          >
                            <div className="w-10 mr-2">
                              <img
                                src={user.profile.profilePhoto}
                                className="rounded-full"
                              />
                            </div>
                            <p className="select-none text-foreground">
                              {user.name}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Group search results */}
                  <div hidden={groupSearchResults.length === 0}>
                    <h3 className="px-4 py-2 font-bold select-none text-foreground-lighter">
                      Nhóm
                    </h3>

                    <ul>
                      {groupSearchResults.map((group) => {
                        return (
                          <li
                            key={group._id}
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-dropdown-hover"
                          >
                            <div className="w-10 mr-2">
                              <img
                                src={group.profile.profilePhoto}
                                className="rounded-full"
                              />
                            </div>
                            <p className="select-none text-foreground">
                              {group.name}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Post search results */}
                  <div hidden={postSearchResults.length === 0}>
                    <h3 className="px-4 py-2 font-bold select-none text-foreground-lighter">
                      Bài viết
                    </h3>

                    <ul>
                      {postSearchResults.map((post) => {
                        return (
                          <li
                            key={post._id}
                            className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-dropdown-hover"
                          >
                            <div>
                              <p className="text-foreground line-clamp-3">
                                {post.content}
                              </p>

                              <div className="flex items-center mt-1">
                                <div className="w-5 mr-1">
                                  <img
                                    src={post.user.profile.profilePhoto}
                                    className="rounded-full"
                                  />
                                </div>

                                <span className="text-xs text-foreground-lighter">
                                  {post.user.name}
                                </span>
                              </div>
                            </div>

                            <div
                              className={`${
                                post.images.length === 0 ? "hidden" : ""
                              } w-28`}
                            >
                              <img
                                className="rounded-md"
                                src={post.images[0]}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="relative flex items-center justify-around flex-1 h-full">
          {navButtons.map((btn, index) => (
            <Link key={btn.name} to={btn.linkTo}>
              <button
                onClick={() => setActiveNav(index)}
                className={`${
                  activeNav === index && pathIsInNavbar
                    ? "text-primary"
                    : "text-secondary-foreground"
                } transition-colors gap-2 px-9 py-3 rounded-md opacity-100 hover:bg-secondary-hover`}
              >
                <btn.icon />
              </button>
            </Link>
          ))}

          {pathIsInNavbar && (
            <div
              className={`${navButtons[activeNav].dis} absolute bottom-0 left-0 w-1/5 h-1 transition-transform rounded-t-full bg-primary`}
            ></div>
          )}
        </div>

        {/* Avatar and Menu */}
        <div className="flex items-center justify-end flex-1">
          {/* Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-4 cursor-pointer">
                <FiMenu className="text-foreground" />
              </div>
            </PopoverTrigger>

            <PopoverContent className="flex flex-col gap-2 overflow-hidden rounded-lg shadow-sm shadow-black text-foreground-lighter focus:outline-none bg-dropdown w-72">
              {menuButtons.map((btn) => (
                <Link
                  key={btn.name}
                  to={btn.linkTo}
                  className="hover:bg-dropdown-hover"
                >
                  <div className="flex items-center gap-2 px-3 py-2 cursor-pointer">
                    <btn.icon />
                    <span>{btn.name}</span>
                  </div>
                </Link>
              ))}
            </PopoverContent>
          </Popover>

          {/* Theme */}
          <Button
            variant="secondary"
            className="flex items-center gap-2 ml-4"
            onClick={() => {
              const nextTheme = theme === "dark" ? "light" : "dark";
              localStorage.theme = nextTheme;
              setTheme(nextTheme);
            }}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </Button>

          {/* Messages */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="flex items-center gap-2 ml-4"
                onClick={toggleChats}
                variant="secondary"
              >
                <MessageCircle />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="shadow-md shadow-black messenger-container bg-background-lighter">
              {/* Messages Header */}
              <div className="flex items-center justify-between p-3 border-b border-border messenger-header">
                <div className="text-lg font-semibold text-foreground messenger-title">
                  Messenger
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 opacity-100"
                  >
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
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 opacity-100"
                  >
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
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 opacity-100"
                  >
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
                  <Button
                    variant="secondary"
                    className="gap-2 rounded-full opacity-100"
                  >
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

              {/* Messages search */}
              <div className="p-3 border-b messenger-search border-border">
                <input
                  type="text"
                  placeholder="Search Messenger"
                  className="w-full px-4 py-2 border-none rounded-full bg-input text-foreground focus:outline-none"
                />
              </div>

              {/* Messages */}
              <div
                className="overflow-y-auto messenger-content"
                style={{ height: "calc(100% - 150px)" }}
              >
                {chats.map((chat, index) => (
                  <div key={index}>
                    <Link
                      to={`/chats/${chat._id}`}
                      className="flex items-center gap-3 px-3 py-2 cursor-pointer messenger-item hover:bg-gray-100"
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={
                            userChatDatas[chat.participants[1]]?.avatar || ""
                          }
                          alt={userChatDatas[chat.participants[1]]?.name || ""}
                        />
                        <AvatarFallback>Avatar</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          {userChatDatas[chat.participants[1]]?.name ||
                            "User Name"}
                        </span>
                        <span className="text-sm truncate text-foreground-lighter">
                          Message content
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="border-t messenger-footer border-border bg-background">
                <Link to={"/chats"}>
                  <Button>See All in Messenger</Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                className="flex items-center gap-2 ml-4"
                onClick={toggleNotifications}
              >
                <Bell />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="shadow-md notification-container bg-background-lighter shadow-black">
              <div className="flex items-center justify-between p-3 border-b border-border notification-header">
                <div className="text-lg font-semibold text-foreground notification-title">
                  Notifications
                </div>
                <Button variant="secondary" className="p-1 rounded-full">
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

              <div className="flex justify-between p-3 border-b border-border notification-filters">
                <Button variant="secondary">Unread</Button>
                <Button variant="secondary">All</Button>
              </div>

              <div className="notification-content">
                {notifications &&
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className="flex items-center gap-3 p-3 cursor-pointer notification-item hover:bg-dropdown-hover"
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
                          <span className="font-semibold text-foreground">
                            {notification.author.name}
                          </span>
                          <div className="text-foreground-lighter">
                            {handleDateTime(notification.createdAt)}
                          </div>
                        </div>

                        <span className="text-sm text-foreground-lighter">
                          {notification.content}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="border-t notification-footer bg-background border-border">
                <Button>See Previous Notifications</Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Account */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 ml-4 cursor-pointer">
                <Avatar className="w-10 h-10">
                  {avatarUrl ? (
                      <img
                          src={avatarUrl}
                          alt="Avatar"
                          className="w-full h-full object-cover rounded-full"
                      />
                  ) : (
                      <div className="text-2xl text-gray-600 bg-gray-200 w-full h-full flex items-center justify-center rounded-full">
                        {firstLetter}
                      </div>
                  )}
                </Avatar>
              </div>
            </PopoverTrigger>

            <PopoverContent className="flex flex-col gap-2 overflow-hidden rounded-lg shadow-md focus:outline-none text-foreground bg-background-lighter shadow-black w-52">
              {accountMenuButtons.map((btn) => (
                <Link key={btn.name} to={btn.linkTo}>
                  <div
                    className="flex items-center gap-2 px-4 py-2 hover:bg-dropdown-hover"
                    onClick={btn.onClick}
                  >
                    <btn.icon />
                    <span>{btn.name}</span>
                  </div>
                </Link>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
