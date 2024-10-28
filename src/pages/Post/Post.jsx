import React, { useState, useRef, useEffect } from "react";
import {
  FaHeart,
  FaHeartBroken,
  FaComment,
  FaShare,
  FaBookmark,
  FaEllipsisV,
  FaSmile,
} from "react-icons/fa";
import Data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./Post.css";
import ShareModal from "../ShareModal/ShareModal";
import UpdateModal from "./UpdateModal";
import axios from "axios";
import Cookies from "js-cookie";
import Comment from "../Comment/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { toPostData } from "@/lib/utils";

const Post = ({ data }) => {
  console.log(data);
  const ownerId = data.postInfo.userId;
  const currentUserId = localStorage.getItem("token");
  const [isVisible, setIsVisible] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [dislikeFireworks, setDislikeFireworks] = useState([]);
  const [liked, setLiked] = useState(data.postInfo.isLiked.includes(data.user));
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [disliked, setDisliked] = useState(
    data.postInfo.isDisliked.includes(data.user)
  );
  const [content, setContent] = useState(data.postInfo.content);
  const [access, setAccess] = useState(data.postInfo.access);
  const [dislikeCount, setDislikeCount] = useState(data.dislikeCount);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commenting, setCommenting] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(
    data.postInfo.isBookmarkedBy.includes(data.user)
  );

  const groupAvatarUrl = data.group?.profile.profilePhoto[0];
  const groupName = data.group?.name;
  const avatarUrl = data.userInfo.profile.profilePhoto;
  const userName = data.userInfo.name;
  const cmtRef = useRef(null);
  const firstLetter = userName?.charAt(0).toUpperCase();
  const postRef = useRef(null);
  const menuRef = useRef(null);
  const pickerRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLikeClick = (e) => {
    e.preventDefault();
    likePost(data.postInfo._id);
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
    }
    if (postRef.current) {
      const { left, top, width, height } =
        postRef.current.getBoundingClientRect();
      const randomX = Math.random() * width;
      const randomY = Math.random() * height;

      const newFirework = {
        left: `${randomX}px`,
        top: `${randomY}px`,
        id: Date.now(),
      };

      setFireworks((prev) => [...prev, newFirework]);

      setTimeout(() => {
        setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
      }, 1000);
    }
  };

  const handleCommentChange = (e) => {
    setCommenting(true);
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const postId = data.postInfo._id;

    const payload = {
      postId: postId,
      content: comment,
    };

    console.log(postId, comment);

    try {
      console.log(payload);
      const response = await axios.post(
        "http://localhost:9090/api/comment/createComment",
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Comment created:", response.data);
      setComment("");
      setCommenting(false);
      setSuccess("Comment created!");
      setShowPicker(false);
      setShowComments(true);
      fetchComments();

      const event = new CustomEvent("CommentCreated");
      window.dispatchEvent(event);
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
      setSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchComments = async () => {
    try {
      const postId = data.postInfo._id;
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(
        `${apiUrl}/comment/getAllComment/${postId}`,
        { withCredentials: true }
      );
      console.log(response.data.comments);
      await setComments(response.data.comments.reverse());
      setShowComments(true);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleDislikeClick = (e) => {
    dislikePost(data.postInfo._id);
    setDisliked(!disliked);
    setDislikeCount(disliked ? dislikeCount - 1 : dislikeCount + 1);

    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    }
    if (postRef.current) {
      const { left, top, width, height } =
        postRef.current.getBoundingClientRect();
      const randomX = Math.random() * width;
      const randomY = Math.random() * height;

      const newDislikeFirework = {
        left: `${randomX}px`,
        top: `${randomY}px`,
        id: Date.now(),
      };

      setDislikeFireworks((prev) => [...prev, newDislikeFirework]);

      setTimeout(() => {
        setDislikeFireworks((prev) =>
          prev.filter((fw) => fw.id !== newDislikeFirework.id)
        );
      }, 1000);
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCommentClick = () => {
    setIsLoading(true);

    if (!showComments || !commenting) {
      setCommenting(true);
      fetchComments(); // Fetch comments when button is clicked
      setIsLoading(false);
    } else {
      setCommenting(false);
      setShowComments(false); // Hide comments if already shown
    }
    if (isLoading) {
      return <div> Loading... </div>;
    }
  };

  const handleEmojiClick = (emoji) => {
    setComment((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleShareClick = () => {
    setShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setShareModalOpen(false);
  };

  const handleSavePostClick = () => {
    setIsBookmarked(!isBookmarked);
    try {
      const postId = data.postInfo._id;
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!isBookmarked) {
        axios.post(
          `${apiUrl}/bookmark/addBookmark`,
          { postId },
          { withCredentials: true }
        );
      } else {
        axios.post(
          `${apiUrl}/bookmark/deleteBookmark`,
          { postId },
          { withCredentials: true }
        );
      }
    } catch (error) {
      console.error("Failed to bookmark post:", error);
    }
  };

  const handleNotInterestedClick = () => {
    try {
      axios.post(
        `${apiUrl}/post/notInterested`,
        { postId: data.postInfo._id },
        { withCredentials: true }
      );
      setIsVisible(false);
    } catch (error) {
      console.error("Failed to mark post as not interested:", error);
    }
  };

  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = async (updatedData) => {
    setContent(updatedData.content);
    setAccess(updatedData.access);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        axios.post(
          `${apiUrl}/post/deletePost`,
          { postId: data.postInfo._id },
          { withCredentials: true }
        );
        console.log("Deleted post");
        setIsVisible(false);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
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

  const likePost = async (postId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.post(
        `${apiUrl}/post/likePost`,
        { postId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const dislikePost = async (postId) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.post(
        `${apiUrl}/post/dislikePost`,
        { postId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to dislike post:", error);
    }
  };
  const navigate = useNavigate();
  const fetchProfile = async (userId) => {
    try {
      console.log(userId);
      const res = await axios.post(
        "http://localhost:9090/api/user/getProfileById",
        { userId },
        { withCredentials: true }
      );
      const userData = res.data;
      navigate("/profile", { state: { userData } });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        postRef.current &&
        !postRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
      if (!showEmojiPicker || !event.target.closest(".emoji-picker")) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) setContent(data.postInfo.content);

    return () => {
      ignore = true;
    };
  }, [data.postInfo._id]);

  if (!isVisible) {
    return null;
  }
  return (
    <div
      ref={postRef}
      className="post-container p-4 bg-background-lighter shadow-md rounded-lg max-w-xl mx-auto mb-6 relative"
    >
      <button
        className="absolute top-2 right-2 p-2 text-foreground-lighter hover:text-foreground transition-colors"
        onClick={handleMenuToggle}
      >
        <FaEllipsisV />
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-10 right-2 bg-dropdown text-foreground-lighter shadow-md rounded-lg z-10 overflow-hidden"
        >
          {ownerId === currentUserId ? (
            <ul>
              <li
                className="p-2 hover:bg-dropdown-hover cursor-pointer"
                onClick={handleNotInterestedClick}
              >
                Not Interested
              </li>
              <li
                className="p-2 hover:bg-dropdown-hover cursor-pointer"
                onClick={handleUpdateClick}
              >
                Update
              </li>
              <li
                className="p-2 hover:bg-dropdown-hover cursor-pointer"
                onClick={handleDeleteClick}
              >
                Delete
              </li>
            </ul>
          ) : (
            <ul>
              <li
                className="p-2 hover:bg-dropdown-hover cursor-pointer"
                onClick={handleNotInterestedClick}
              >
                Not Interested
              </li>
            </ul>
          )}
        </div>
      )}

      <div className="flex flex-col items-start gap-3">
        {/* Post header */}
        <div className="flex items-center gap-3">
          {/* Avatar and group avatar */}
          {data.group ? (
            <div className="w-11 h-11 relative">
              {groupAvatarUrl ? (
                <img
                  src={groupAvatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                />
              ) : (
                <div className="text-2xl text-gray-600 bg-gray-200 w-full h-full rounded-lg flex items-center justify-center select-none">
                  {groupName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="w-7 h-7 rounded-full overflow-hidden absolute -bottom-1 -right-1 ring ring-background-lighter">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full cursor-pointer"
                    onClick={() => fetchProfile(data.postInfo.userId)}
                  />
                ) : (
                  <div className="text-sm text-gray-600 bg-gray-200 w-full h-full flex items-center justify-center rounded-full">
                    {firstLetter}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              onClick={() => fetchProfile(data.postInfo.userId)}
              className="cursor-pointer w-11 h-11"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="text-2xl text-gray-600 bg-gray-200 w-full h-full flex items-center justify-center rounded-full select-none">
                  {firstLetter}
                </div>
              )}
            </div>
          )}

          {/* Group name, username, day posted */}
          {data.group ? (
            <div>
              <div className="text-lg font-semibold text-foreground cursor-pointer">
                {groupName}
              </div>

              <div className="flex gap-2 text-sm text-foreground-lighter">
                <span
                  onClick={() => fetchProfile(data.postInfo.userId)}
                  className="cursor-pointer hover:underline"
                >
                  {data.userInfo.name}
                </span>
                <span>·</span>
                <span>{handleDateTime(data.postInfo.createdAt)}</span>
              </div>
            </div>
          ) : (
            <div>
              <div
                className="text-lg font-semibold text-foreground"
                onClick={() => fetchProfile(data.postInfo.userId)}
                style={{ cursor: "pointer" }}
              >
                {data.userInfo.name}
              </div>

              <p className="text-sm text-foreground-lighter">
                {handleDateTime(data.postInfo.createdAt)}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow rounded-lg shadow-md">
          <p className="mt-1 text-lg text-foreground">{content}</p>

          {data.postInfo.images.length > 0 && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.postInfo.images.map((image, index) => (
                <img
                  key={`${data.postInfo._id}_${index}`}
                  src={image}
                  alt="Post Media"
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>
          )}
          {data.postInfo.videos.map((video, index) => (
            <video
              key={index}
              controls
              className="w-1/2 rounded-lg mb-4"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 fireworks-container">
        {fireworks.map((firework) => (
          <div
            key={firework.id}
            className="firework"
            style={{ left: firework.left, top: firework.top }}
          />
        ))}
      </div>

      <div className="absolute inset-0 fireworkss-container">
        {dislikeFireworks.map((firework) => (
          <div
            key={firework.id}
            className="fireworkk"
            style={{ left: firework.left, top: firework.top }}
          />
        ))}
      </div>
      <div className="mt-3 border-t border-border pt-3">
        <div className="flex gap-4 text-sm">
          <button
            className={`flex items-center gap-2 transition-colors duration-300 transform ${
              liked ? "text-red-500" : "text-[#B48FD9]"
            } hover:text-[#BFB26F] relative`}
            onClick={handleLikeClick}
          >
            <FaHeart className="w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
            <span>
              {liked ? "Đã Thích" : "Thích"} {likeCount}
            </span>
          </button>

          <button
            className={`flex items-center gap-2 transition-colors duration-300 transform ${
              disliked ? "text-gray-500" : "text-[#B48FD9]"
            } hover:text-[#BFB26F] relative`}
            onClick={handleDislikeClick}
          >
            <FaHeartBroken className="dislike-icon w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
            <span>
              {disliked ? "Không Thích" : "Không Thích"} {dislikeCount}
            </span>
          </button>

          <button
            className="flex items-center gap-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors"
            onClick={handleCommentClick}
          >
            <FaComment className="w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
            {commenting}
            {showComments}
            <span>Bình Luận</span>
          </button>

          <button
            className="flex items-center gap-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors"
            onClick={handleShareClick}
          >
            <FaShare className="w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
            <span>Chia Sẻ</span>
          </button>
          <button


              className={`save-post-button absolute bottom-0 right-0 mb-3 mr-3 text-[#B48FD9] hover:text-[#BFB26F] transition-colors flex items-center gap-2 ${isBookmarked ? "text-yellow-200" : "text-[#B48FD9]"}`}
              onClick={handleSavePostClick}

          >
            <FaBookmark className="w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
          </button>
        </div>
        <div ref={cmtRef} className="comments-section relative">
          {commenting && (
            <div className="p-5 flex items-center gap-2 bg-background-darker shadow-md rounded-lg max-w-xl mx-auto mb-7 relative">
              <input
                className="flex-grow p-2 bg-input text-foreground focus:outline-none rounded-lg text-sm"
                placeholder="Viết bình luận..."
                value={comment}
                onChange={handleCommentChange}
              />
              <button
                className="p-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FaSmile />
              </button>
              <button
                className="p-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors"
                onClick={handleCommentSubmit}
              >
                Đăng
              </button>
              {showEmojiPicker && (
                <div className="emoji-picker absolute bottom-16 left-4">
                  <Picker data={Data} onEmojiSelect={handleEmojiClick} />
                </div>
              )}
            </div>
          )}

          {showComments &&
            (comments.length > 0 ? (
              <section className="comments-section p-5 bg-gray-900 shadow-md rounded-lg max-w-xl mx-auto mb-7 relative">
                {comments.map((comments, index) => (
                  <div key={index} className="comments-section relative">
                    <Comment cmtdata={comments} fetchComments={fetchComments} />
                  </div>
                ))}
              </section>
            ) : (
              <div>No Comment Found</div>
            ))}
        </div>
      </div>


      <UpdateModal
        data={data.postInfo}
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onUpdate={handleUpdate}
      />

      <ShareModal isOpen={shareModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export function PostWrapper() {
  const { postId } = useParams();
  const [postData, setPostData] = useState();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let ignore = false;

    const fetchPostData = async () => {
      try {
        const postRes = await axios.post(
          `${apiUrl}/post/getPostById`,
          { postId },
          { withCredentials: true }
        );

        if (!ignore)
          setPostData(await toPostData(postRes.data.post));
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchPostData();

    return () => {
      ignore = true;
    };
  }, [apiUrl, postId]);

  return (
    <div className="h-screen pt-24 overflow-auto ">
      {postData && <Post data={postData} />}
    </div>
  );
}

export default Post;
