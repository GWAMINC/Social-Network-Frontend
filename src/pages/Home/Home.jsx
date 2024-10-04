import { useState, useEffect } from "react";
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

  const numOfPostsPerPage = 5;
  const isLoadedFirstTime = posts.length === 0;

  const apiUrl = import.meta.env.VITE_API_URL;
  // Fetch posts when page loads the first time or page number changes
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

  // Increase page number when user reaches the bottom of the page
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

  // Show scroll to top button
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
            <h2 className="text-2xl font-semibold text-foreground">
              Your Pages
            </h2>
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
          <AddPost
            onPostCreated={async (post) =>
              setPosts([await toPostData(post), ...posts])
            }
            currentUser={currentUser}
          />

          <div className="space-y-8 md:space-y-0 md:flex md:gap-8">
            {/* Active Friends */}
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
