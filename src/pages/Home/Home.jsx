import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import AddPost from "../AddPost";
import Post from "../Post/Post";
import ActiveFr from "../ActiveFr/ActiveFr";
import axios from "axios"; 
import { toPostData } from "@/lib/utils";

const Home = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [chatNames, setChatNames] = useState([]); // Chứa danh sách tên được chọn
  const [suggestions, setSuggestions] = useState([]);
  const chatRef = useRef(null); // Reference to the chat input box

  const numOfPostsPerPage = 5;
  const isLoadedFirstTime = posts.length === 0;

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let ignore = false;

    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user/profile`, {
          withCredentials: true,
        });

        if (!ignore) setCurrentUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    const getPosts = async () => {
      try {
        setIsLoadingPosts(true);

        const res = await axios.get(
          `${apiUrl}/post/getAllPost?page=${page}&limit=${numOfPostsPerPage}`,
          { withCredentials: true }
        );

        if (!ignore) {
          setIsLoadingPosts(false);
          setMaxPage(res.data.pages);
          setPosts((prevPosts) => [...prevPosts, ...res.data.posts]);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchCurrentUser();
    getPosts();

    return () => {
      ignore = true;
    };
  }, [apiUrl, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.documentElement.scrollHeight - window.innerHeight <=
          Math.ceil(window.scrollY) &&
        !isLoadedFirstTime
      ) {
        setPage((page) => Math.min(page + 1, maxPage));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadedFirstTime, maxPage]);

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

  const handleChatToggle = () => {
    setIsChatVisible((prev) => !prev);
    setChatNames([]); // Reset chat names when toggling
    setSuggestions([]); // Reset suggestions when toggling chat
  };

  // Close chat if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsChatVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update suggestions based on input
  useEffect(() => {
    const availableNames = ["Alice", "Bob", "Charlie", "David"]; // Example names
    if (chatNames.length) {
      setSuggestions(availableNames.filter(name =>
        !chatNames.includes(name) && name.toLowerCase().includes(chatNames[chatNames.length - 1].toLowerCase())
      ));
    } else {
      setSuggestions(availableNames);
    }
  }, [chatNames]);

  const handleNameSelect = (name) => {
    if (!chatNames.includes(name)) {
      setChatNames((prev) => [...prev, name]);
    }
  };

  const handleGroupChatCreation = () => {
    // Thực hiện hành động để tạo nhóm chat
    console.log(`Creating group chat with: ${chatNames.join(", ")}`);
    setChatNames([]); // Xóa danh sách tên đã chọn sau khi tạo nhóm
    setSuggestions([]);
    setIsChatVisible(false);
  };

  return (
    <div className="w-full flex flex-col relative">
      <div className="flex-grow pt-3 px-4">
        <header className="text-center py-16">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to Kit<span className="text-foreground-lighter">Kat</span>
          </h1>
          <p className="text-lg text-foreground-lighter mt-4">Àn nhoong</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-background-lighter shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground">Your Pages</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground-lighter">Page 1</span>
                <button className="text-foreground-lighter hover:text-foreground">View</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-lighter">Page 2</span>
                <button className="text-foreground-lighter hover:text-foreground">View</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-lighter">Page 3</span>
                <button className="text-foreground-lighter hover:text-foreground">View</button>
              </div>
            </div>
          </div>

          <AddPost
            onPostCreated={async (post) => setPosts([await toPostData(post), ...posts])}
            currentUser={currentUser}
          />

          <div className="space-y-8 md:space-y-0 md:flex md:gap-8">
            <ActiveFr />
          </div>
        </section>

        <section className="mt-8 relative">
          {posts.map((post) => (
            <div key={post.postInfo._id}>
              <Post data={post} />
            </div>
          ))}

          {isLoadingPosts && (
            <div className="right-0 left-0 absolute flex items-center justify-center text-foreground-lighter select-none">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <span className="ml-3 text-xl">Loading...</span>
            </div>
          )}
        </section>

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
          className="fixed bottom-6 right-16 rounded-full shadow-md transition-colors flex items-center justify-center text-2xl"
          aria-label="Scroll to top"
        >
          ↑
        </Button>
      )}

      {/* Message Button */}
      <Button
        onClick={handleChatToggle}
        className="fixed bottom-24 right-6 rounded-full bg-blue-500 text-white shadow-md transition-transform duration-300 hover:scale-105"
        aria-label="Message"
      >
        💬
      </Button>

      {/* Chat Input Box */}
      {isChatVisible && (
        <div ref={chatRef} className="fixed bottom-32 right-6 bg-white shadow-lg rounded-lg p-4 transition-transform duration-300">
          <h3 className="font-bold">New message:</h3>
          <div className="mt-2">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">To:</label>
            <input
              type="text"
              id="to"
              placeholder="Type a name..."
              value={chatNames[chatNames.length - 1] || ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                setChatNames((prev) => {
                  const newNames = [...prev];
                  if (newNames.length === 0 || inputValue === "") {
                    newNames.push(inputValue);
                  } else {
                    newNames[newNames.length - 1] = inputValue;
                  }
                  return newNames;
                });
              }}
              className="border border-gray-300 rounded-md p-2 mt-1 w-full"
            />

            {suggestions.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-md max-h-40 overflow-auto">
                {suggestions.map((name) => (
                  <li key={name} className="px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleNameSelect(name)}>
                    {name}
                  </li>
                ))}
                <li className="px-2 py-1 text-gray-500">Discover</li>
              </ul>
            )}

            <div className="mt-4">
              {chatNames.length > 1 && (
                <Button
                  onClick={handleGroupChatCreation}
                  className="bg-green-500 text-white w-full"
                >
                  Create group chat
                </Button>
              )}
              <Button
                onClick={() => {
                  const chatName = chatNames.join(", ");
                  console.log(`Sending message to: ${chatName}`);
                  setChatNames([]); // Clear input after sending
                  setSuggestions([]); // Clear suggestions
                }}
                className="mt-2 bg-blue-500 text-white w-full"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
