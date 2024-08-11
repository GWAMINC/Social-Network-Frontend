import React from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button.jsx";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar.jsx";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FiBell, FiMessageSquare } from "react-icons/fi";
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post( `${apiUrl}/user/logout`,{}, {
        withCredentials: true, 
      });
      if (response.status === 200) {
        alert(response.data.message);
        navigate('/login');
      } else {
        alert(response.data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="bg-[#1E3A8A] fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        <div className="flex items-center flex-grow">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold text-white absolute top-0 left-3 mt-2 ml-6">
              <Link to="/">
                Kit<span className="text-[#B48FD9]">Kat</span>
              </Link>
            </h1>
          </div>

          <div className="flex-shrink mx-12">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for friends, groups, pages"
                className="w-80 px-4 py-2 pl-10 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B48FD9] transition-transform duration-300 ease-in-out group-hover:scale-100"
              />
              <svg
                className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out group-hover:scale-105"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M14.35 14.35A6.5 6.5 0 0015 10a6.5 6.5 0 10-6.5 6.5 6.5 6.5 0 004.85-1.15z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-6">
            <Link
              to="/messages"
              className="relative text-white hover:text-gray-200 transition-colors flex items-center gap-2 p-2 rounded-md"
            >
              <FiMessageSquare className="w-6 h-6 transition-transform transform hover:scale-110" />
              <span className="hidden md:inline">Messages</span>
              {/* Optional: Messages Badge */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-medium text-white bg-blue-500 rounded-full">
                5
              </span>
            </Link>
            <Link
              to="/notifications"
              className="relative text-white hover:text-gray-200 transition-colors flex items-center gap-2 p-2 rounded-md"
            >
              <FiBell className="w-6 h-6 transition-transform transform hover:scale-110" />
              <span className="hidden md:inline">Notifications</span>
              {/* Optional: Notification Badge */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-medium text-white bg-red-500 rounded-full">
                3
              </span>
            </Link>
          </div>

          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link to="/">
                <Button variant="outline">Home</Button>
              </Link>
            </li>
            <li>
              <Link to="/profile/update">
                <Button variant="outline">Profile Update</Button>
              </Link>
            </li>
            <li>
              <Link to="/addPost">
                <Button variant="outline">Create a new Post</Button>
              </Link>
            </li>
          </ul>

          <div className="absolute top-0 right-12 mt-3 ml-6">
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="space-y-4">
                  <div className="flex gap-2 items-center">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Admin</h4>
                      <p className="text-sm text-gray-500">Testing text</p>
                      <div className="flex gap-2 mt-2">
                        <Link to="/login">
                          <Button variant="outline">Sign in</Button>
                        </Link>
                        <Link to="/register">
                          <Button variant="outline">Register</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-600">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Link to="/profile">
                        <Button
                          variant="link"
                          className="text-[#B48FD9] hover:text-[#BFB26F]"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button
                        variant="link"
                        className="text-[#B48FD9] hover:text-[#BFB26F]"
                        onClick={handleLogout} // Gọi hàm đăng xuất khi nhấn nút
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
