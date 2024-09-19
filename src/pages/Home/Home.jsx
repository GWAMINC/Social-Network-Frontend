import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch posts on page load and post created
  useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(
            `${apiUrl}/user/profile`,
            { withCredentials: true }
            );
            await setCurrentUser(response.data.user);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    }
    const getPosts = async () => {
      try {
        const response = await axios.get(
            `${apiUrl}/post/getAllPost`,
            {withCredentials: true});
        // console.log(response.data);
        await setPosts(response.data.posts.reverse());
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchCurrentUser();
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
    <div className="w-full flex flex-col">
      <Navbar currentUser = {currentUser}/>
      <div className="flex-grow pt-3 px-4">
        <header className="text-center py-16">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to Kit<span className="text-foreground-lighter">Kat</span>
          </h1>
          <p className="text-lg text-foreground-lighter mt-4">Àn nhoong</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Pages */}
          <div className="p-6  bg-background-lighter shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground">Your Pages</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground-lighter">Page 1</span>
                <button className="text-foreground-lighter hover:text-foreground">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-lighter">Page 2</span>
                <button className="text-foreground-lighter hover:text-foreground">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-lighter">Page 3</span>
                <button className="text-foreground-lighter hover:text-foreground">
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Create a Post */}
          <AddPost currentUser = {currentUser}/>

          <div className="space-y-8 md:space-y-0 md:flex md:gap-8">
            {/* Active Friends */}
            <ActiveFr /> 
          </div>
        </section>

        {posts.length > 0 && (
        <section className="mt-8">
          <div className="bg-transparent">
            {/* <h2 className="text-2xl font-semibold text-foreground">Posts</h2> */}
              {posts.map(post =>(
                  <div key = {post.postInfo._id}>
                <Post data = {post} />
                  </div>
            ))}
          </div>
        </section>
        )}

        <footer className="text-center mt-16 py-6 border-t border-border">
          <p className="text-foreground-lighter">
            &copy; 2024 KitKat. All rights reserved.
          </p>
        </footer>
      </div>
      {/* Scroll to Top Button */}
      {isButtonVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full shadow-md transition-colors flex items-center justify-center text-2xl"
          aria-label="Scroll to top"
        >
          ↑
        </Button>
      )}
    </div>
  );
};

export default Home;
