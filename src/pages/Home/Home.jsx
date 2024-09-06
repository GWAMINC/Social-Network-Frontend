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
import AddPost from "../AddPost";
import Post from "../Post/Post";
import ActiveFr from "../ActiveFr/ActiveFr";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch posts on page load and post created
  useEffect(() => {
    const getPosts = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(
            `${apiUrl}/post/getAllPost`,
            {withCredentials: true});
        // console.log(response.data);
        await setPosts(response.data.posts.reverse());
        console.log(response.data.posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    getPosts();
    window.addEventListener("postCreated", getPosts);
    return () => window.removeEventListener("postCreated", getPosts);
  }, []);

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
    setIsButtonVisible(false); 
  };

  return (
    <div className="bg-gray-900 w-full flex flex-col">
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
              <button
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                onClick={() => navigate("/groups")} 
              >
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

          <AddPost />

          <div className="space-y-8 md:space-y-0 md:flex md:gap-8">

            {/* Active Friends */}

            <ActiveFr /> 

          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

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
        {posts.length > 0 && (
        <section className="mt-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-[#B48FD9]">Posts</h2>
              {posts.map(post =>(
                  <div key = {post.postInfo._id}>
                <Post data = {post} />
                  </div>
            ))}
          </div>
        </section>
        )}

        <footer className="text-center mt-16 py-6 border-t border-gray-300">
          <p className="text-gray-300">
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
