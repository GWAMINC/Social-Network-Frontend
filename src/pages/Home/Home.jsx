import React, { useState, useEffect } from "react";
import Navbar from "@/layouts/Navbar";
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlineSmile,
  AiOutlineUser,
  AiOutlineGroup,
  AiOutlineComment,
} from "react-icons/ai";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";

const Home = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsButtonVisible(false); // Hide button after scrolling up
  };
  return (
    <div className="bg-gray-900 w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-3 px-4">
        <header className="text-center py-16">
          <h1 className="text-4xl font-bold text-white">
            Welcome to <span className="text-white">KitKat</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4">Àn nhoong</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
            <div className="mt-4 space-y-4">
              {/* Latest Posts moved inside Shortcuts */}
              <div className="p-6 bg-gray-700 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-white">
                  Latest Posts
                </h2>
                <p className="text-gray-100 mt-4">
                  Check out the latest posts from your friends and stay updated
                  with what's happening.
                </p>
              </div>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors">
                Home
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors">
                Friends
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors">
                Groups
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors">
                Favourites
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors">
                Saved
              </button>
            </div>
          </div>

          {/* Create a Post */}
          <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-white">Create a Post</h2>
            <div className="flex items-start gap-4 mt-4">
              <div className="w-12 h-12">
                <img
                  src="https://github.com/shadcn.png"
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <textarea
                placeholder="What's on your mind?"
                className="w-full px-4 py-2 border border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-300"
                rows="3"
              ></textarea>
            </div>
            <div className="mt-4 border-t border-gray-600 pt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <button className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-2">
                    <AiOutlineCamera className="w-6 h-6" />
                    <span className="hidden md:inline">Photo</span>
                  </button>
                  <button className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-2">
                    <AiOutlineVideoCamera className="w-6 h-6" />
                    <span className="hidden md:inline">Video</span>
                  </button>
                  <button className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-2">
                    <AiOutlineSmile className="w-6 h-6" />
                    <span className="hidden md:inline">Feeling</span>
                  </button>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors">
                New Post
              </button>
            </div>
          </div>
          {/* Latest Activity and Active Friends */}
          <div className="space-y-8 md:space-y-0 md:flex md:gap-8">
            {/* Latest Activity */}
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg flex-1">
              <h2 className="text-2xl font-semibold text-white">
                Latest Activity
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <AiOutlineUser className="w-6 h-6 text-gray-400" />
                  <p className="text-gray-300">
                    You have a new friend request from John Doe.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <AiOutlineGroup className="w-6 h-6 text-gray-400" />
                  <p className="text-gray-300">
                    Group invitation from the 'Developers' group.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <AiOutlineComment className="w-6 h-6 text-gray-400" />
                  <p className="text-gray-300">
                    New comment on your post by Jane Smith.
                  </p>
                </div>
              </div>
            </div>

            {/* Active Friends */}
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg flex-1">
              <h2 className="text-2xl font-semibold text-white">
                Active Friends
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Friend Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-gray-300">John Doe is online</p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Friend Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-gray-300">Jane Smith is online</p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Friend Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-gray-300">Alex Johnson is online</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Posts */}
        <section className="mt-8">
          <div className="space-y-8">
            {/* Post Example */}
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-white">
                    John Doe
                  </div>
                  <p className="text-gray-100 mt-2">
                    This is a sample status update. Feel free to add your
                    thoughts here!
                  </p>
                  <div className="mt-4">
                    <img
                      src="https://via.placeholder.com/600x400"
                      alt="Post Media"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-600 pt-4">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <FaThumbsUp className="w-5 h-5" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <FaComment className="w-5 h-5" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <FaShare className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Another Post Example */}
            <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-white">
                    Jane Smith
                  </div>
                  <p className="text-gray-100 mt-2">
                    Had a great day at the beach! 🌴🏖️
                  </p>
                  <div className="mt-4">
                    <img
                      src="https://via.placeholder.com/600x400"
                      alt="Post Media"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <FaThumbsUp className="w-5 h-5" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <FaComment className="w-5 h-5" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <FaShare className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Groups Section */}
          <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-white">Your Groups</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Group 1</span>
                <button className="text-[#a3a3a3] hover:text-white">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Group 2</span>
                <button className="text-[#a3a3a3] hover:text-white">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Group 3</span>
                <button className="text-[#a3a3a3] hover:text-white">
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Pages Section */}
          <div className="p-6  bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-white">Your Pages</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Page 1</span>
                <button className="text-[#a3a3a3] hover:text-white">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Page 2</span>
                <button className="text-[#a3a3a3] hover:text-white">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Page 3</span>
                <button className="text-[#a3a3a3] hover:text-white">
                  View
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center mt-16 py-6 border-t border-gray-300">
          <p className="text-gray-900">
            &copy; 2024 KitKat. All rights reserved.
          </p>
        </footer>
      </div>
      {/* Scroll to Top Button */}
      {isButtonVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition-colors flex items-center justify-center text-2xl"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Home;
