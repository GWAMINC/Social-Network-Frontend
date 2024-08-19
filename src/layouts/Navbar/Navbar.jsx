import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button.jsx";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar.jsx";
import { LogOut, User2, Settings, HelpCircle } from "lucide-react";
import {
  FiHome,
  FiUsers,
  FiPlusSquare,
  FiVideo,
  FiGitPullRequest,
  FiMenu,
} from "react-icons/fi";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        alert(response.data.message);
        navigate("/login");
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
