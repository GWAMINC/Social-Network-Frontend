import React from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button.jsx";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar.jsx";
import { LogOut, User2, Settings, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiPlusSquare,
  FiVideo,
  FiGitPullRequest,
  FiMenu,
} from "react-icons/fi";

const Navbar = () => {
  return (
    <div
      style={{
        backgroundColor: "#1E3A8A",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 10,
        boxShadow: "0 4px 2px -2px gray",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "100%",
          height: "64px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Logo and Search Bar */}
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
              marginRight: "20px",
            }}
          >
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Kit<span style={{ color: "#B48FD9" }}>Kat</span>
            </Link>
          </h1>
          <div style={{ position: "relative", width: "300px" }}>
            <input
              type="text"
              placeholder="Search for friends, groups, pages"
              style={{
                width: "100%",
                padding: "8px 16px 8px 40px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                color: "#333",
              }}
            />
            <svg
              style={{
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                color: "#666",
              }}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Link to="/" style={{ textDecoration: "none", margin: "0 10px" }}>
            <Button
              variant="outline"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "black",
                opacity: 1,
                backgroundColor: "white",
              }}
            >
              <FiHome />
              Home
            </Button>
          </Link>
          <Link
            to="/friends"
            style={{ textDecoration: "none", margin: "0 10px" }}
          >
            <Button
              variant="outline"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "black",
                opacity: 1,
                backgroundColor: "white",
              }}
            >
              <FiUsers />
              Friends
            </Button>
          </Link>
          <Link
            to="/create-post"
            style={{ textDecoration: "none", margin: "0 10px" }}
          >
            <Button
              variant="outline"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "black",
                opacity: 1,
                backgroundColor: "white",
              }}
            >
              <FiPlusSquare />
              Create a Post
            </Button>
          </Link>
          <Link
            to="/video"
            style={{ textDecoration: "none", margin: "0 10px" }}
          >
            <Button
              variant="outline"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "black",
                opacity: 1,
                backgroundColor: "white",
              }}
            >
              <FiVideo />
              Video
            </Button>
          </Link>
          <Link
            to="/group"
            style={{ textDecoration: "none", margin: "0 10px" }}
          >
            <Button
              variant="outline"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "black",
                opacity: 1,
                backgroundColor: "white",
              }}
            >
              <FiGitPullRequest />
              Group
            </Button>
          </Link>
        </div>

        {/* Avatar and Menu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <Popover>
            <PopoverTrigger asChild>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <FiMenu style={{ color: "white", cursor: "pointer" }} />
              </div>
            </PopoverTrigger>
            <PopoverContent
              style={{
                width: "300px",
                padding: "16px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Link to="/create" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <FiPlusSquare />
                  <span style={{ color: "black" }}>Tạo</span>
                </div>
              </Link>
              <Link to="/post" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <FiGitPullRequest />
                  <span style={{ color: "black" }}>Đăng</span>
                </div>
              </Link>
              <Link to="/news" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <FiUsers />
                  <span style={{ color: "black" }}>Tin</span>
                </div>
              </Link>
              <Link to="/reels" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <FiVideo />
                  <span style={{ color: "black" }}>Thước phim</span>
                </div>
              </Link>
              <Link to="/life-events" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <FiHome />
                  <span style={{ color: "black" }}>Sự kiện trong đời</span>
                </div>
              </Link>
              <Link to="/pages" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <FiUsers />
                  <span style={{ color: "black" }}>Trang</span>
                </div>
              </Link>
              <Link to="/ads" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <FiPlusSquare />
                  <span style={{ color: "black" }}>Quảng cáo</span>
                </div>
              </Link>
              <Link to="/groups" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <FiGitPullRequest />
                  <span style={{ color: "black" }}>Nhóm</span>
                </div>
              </Link>
              <Link to="/events" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <FiUsers />
                  <span style={{ color: "black" }}>Sự kiện</span>
                </div>
              </Link>
              <Link to="/marketplace" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <FiHome />
                  <span style={{ color: "black" }}>
                    Bài niêm yết trên Marketplace
                  </span>
                </div>
              </Link>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  marginLeft: "16px",
                }}
              >
                <Avatar style={{ width: "40px", height: "40px" }}>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>TT</AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>
            <PopoverContent
              style={{
                width: "200px",
                padding: "16px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  {/* <Link to="/login">
                    <Button variant="outline">Sign in</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline">Register</Button>
                  </Link> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <User2 />
                  View Profile
                </div>
              </Link>
              <Link to="/settings" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <Settings />
                  Settings
                </div>
              </Link>
              <Link to="/support" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <HelpCircle />
                  Support
                </div>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "8px 0",
                    color: "black",
                  }}
                >
                  <LogOut />
                  Logout
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
