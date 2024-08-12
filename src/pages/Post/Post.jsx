import React, { useState, useRef, useEffect } from "react";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaEllipsisV,
  FaSmile,
} from "react-icons/fa";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./Post.css";
import ShareModal from "../ShareModal/ShareModal";

const Post = ({ user, content, media }) => {
  const [fireworks, setFireworks] = useState([]);
  const [liked, setLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const postRef = useRef(null);
  const menuRef = useRef(null);

  const handleLikeClick = (e) => {
    setLiked(!liked);

    if (postRef.current) {
      const { left, top, width, height } =
        postRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

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

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCommentClick = () => {
    setCommenting(!commenting);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log("Comment submitted:", comment);
    setComment("");
    setCommenting(false);
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

  return (
    <div
      ref={postRef}
      className="post-container p-4 bg-gray-700 shadow-md rounded-lg max-w-xl mx-auto mb-6 relative"
    >
      <button
        className="absolute top-2 right-2 p-2 text-gray-300 hover:text-gray-100 transition-colors"
        onClick={handleMenuToggle}
      >
        <FaEllipsisV />
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-10 right-2 bg-gray-800 border border-gray-600 shadow-md rounded-lg z-10"
        >
          <ul>
            <li className="p-2 hover:bg-gray-700 cursor-pointer text-gray-300">
              Interested
            </li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer text-gray-300">
              Not Interested
            </li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer text-gray-300">
              Save Post
            </li>
          </ul>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="w-11 h-11">
          <img
            src="https://github.com/shadcn.png"
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="text-lg font-semibold text-white">
            {user?.name || "John Doe"}
          </div>
          <p className="text-gray-300 mt-1 text-sm">
            {content ||
              "This is a sample status update. Feel free to add your thoughts here!"}
          </p>
          <div className="mt-3">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Post Media"
              className="w-full h-auto rounded-lg"
            />
          </div>
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
      <div className="mt-3 border-t border-gray-600 pt-3">
        <div className="flex gap-4 text-sm">
          <button
            className={`flex items-center gap-2 transition-colors duration-300 transform ${
              liked ? "text-red-500" : "text-gray-300"
            } hover:bg-gray-500 transition-colors relative`}
            onClick={handleLikeClick}
          >
            <FaHeart className="w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
            <span>{liked ? "Đã Thích" : "Thích"}</span>
          </button>
          <button
            className="flex items-center gap-2 text-gray-300 hover:bg-gray-500 transition-colors"
            onClick={handleCommentClick}
          >
            <FaComment className="w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
            <span>Bình Luận</span>
          </button>
          <button
            className="flex items-center gap-2 text-gray-300 hover:bg-gray-500 transition-colors"
            onClick={handleShareClick}
          >
            <FaShare className="w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
            <span>Chia Sẻ</span>
          </button>
        </div>

        <ShareModal isOpen={shareModalOpen} onClose={handleCloseModal} />

        <div
          className={`comment-input-container ${
            commenting ? "commenting" : ""
          } mt-3 border-t border-gray-600 pt-3`}
        >
          {commenting && (
            <>
              <div className="flex items-center">
                <button
                  className="text-gray-300 hover:bg-gray-500 p-2"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <FaSmile className="w-4 h-4" />
                </button>
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    <Picker data={data} onSelect={handleEmojiClick} />
                  </div>
                )}
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Bình luận ở đây..."
                  className="w-full p-2 border rounded-lg comment-input ml-2 bg-gray-700 text-white border-gray-600"
                />
                <button
                  onClick={handleCommentSubmit}
                  className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-400 transition-colors ml-2"
                >
                  Đăng
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
