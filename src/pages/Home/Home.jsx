import React from "react";
import Navbar from "@/layouts/Navbar";
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlineSmile,
  AiOutlineUser,
  AiOutlineGroup,
  AiOutlineComment,
} from "react-icons/ai";
import AddPost from "../AddPost";
import Post from "../Post/Post"; 
import ActiveFr from "../ActiveFr/ActiveFr"; // Import ActiveFr

const Home = () => {
  return (
    <div className="bg-[#F7F7F7] w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-3 px-4">
        <header className="text-center py-16">
          <h1 className="text-4xl font-bold text-[#B48FD9]">
            Welcome to <span className="text-[#BFB26F]">KitKat</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4">Àn nhoong</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="mt-4 space-y-4">
              {/* Latest Posts moved inside Shortcuts */}
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-[#B48FD9]">
                  Latest Posts
                </h2>
                <p className="text-gray-600 mt-4">
                  Check out the latest posts from your friends and stay updated
                  with what's happening.
                </p>
              </div>
              <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                Home
              </button>
              <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                Friends
              </button>
              <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                Groups
              </button>
              <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                Favourites
              </button>
              <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                Saved
              </button>
            </div>
          </div>

          {/* Create a Post */}
          <AddPost />
          {/* Latest Activity and Active Friends */}
          <div className="space-y-8 md:space-y-0 md:flex md:gap-8">
            {/* Latest Activity */}
            <div className="p-6 bg-white shadow-lg rounded-lg flex-1">
              <h2 className="text-2xl font-semibold text-[#B48FD9]">
                Latest Activity
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <AiOutlineUser className="w-6 h-6 text-[#B48FD9]" />
                  <p className="text-gray-600">
                    You have a new friend request from John Doe.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <AiOutlineGroup className="w-6 h-6 text-[#B48FD9]" />
                  <p className="text-gray-600">
                    Group invitation from the 'Developers' group.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <AiOutlineComment className="w-6 h-6 text-[#B48FD9]" />
                  <p className="text-gray-600">
                    New comment on your post by Jane Smith.
                  </p>
                </div>
              </div>
            </div>

            {/* Active Friends */}
            <ActiveFr /> {/* Replace the inline Active Friends section */}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Groups Section */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-[#B48FD9]">
              Your Groups
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Group 1</span>
                <button className="text-[#B48FD9] hover:text-[#BFB26F]">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Group 2</span>
                <button className="text-[#B48FD9] hover:text-[#BFB26F]">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Group 3</span>
                <button className="text-[#B48FD9] hover:text-[#BFB26F]">
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Pages Section */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-[#B48FD9]">
              Your Pages
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Page 1</span>
                <button className="text-[#B48FD9] hover:text-[#BFB26F]">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Page 2</span>
                <button className="text-[#B48FD9] hover:text-[#BFB26F]">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Page 3</span>
                <button className="text-[#B48FD9] hover:text-[#BFB26F]">
                  View
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-[#B48FD9]">Posts</h2>
            <Post /> 
            <Post /> 
          </div>
        </section>

        <footer className="text-center mt-16 py-6 border-t border-gray-300">
          <p className="text-gray-600">
            &copy; 2024 KitKat. All rights reserved.

          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
