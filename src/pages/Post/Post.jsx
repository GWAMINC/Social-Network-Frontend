import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaHeartBroken, FaComment, FaShare, FaBookmark, FaEllipsisV, FaSmile } from "react-icons/fa";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import './Post.css';
import ShareModal from '../ShareModal/ShareModal'; 

const Post = ({ user, content, media }) => {
  const [fireworks, setFireworks] = useState([]);
  const [dislikeFireworks, setDislikeFireworks] = useState([]); 
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false); 
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
      const { left, top, width, height } = postRef.current.getBoundingClientRect();
      const randomX = Math.random() * width;
      const randomY = Math.random() * height;

      const newFirework = {
        left: `${randomX}px`,
        top: `${randomY}px`,
        id: Date.now()
      };

      setFireworks((prev) => [...prev, newFirework]);

      setTimeout(() => {
        setFireworks((prev) => prev.filter(fw => fw.id !== newFirework.id));
      }, 1000);
    }
  };

  
  const handleDislikeClick = (e) => {
    setDisliked(!disliked);

    if (postRef.current) {
      const { left, top, width, height } = postRef.current.getBoundingClientRect();
      const randomX = Math.random() * width;
      const randomY = Math.random() * height;

      const newDislikeFirework = {
        left: `${randomX}px`,
        top: `${randomY}px`,
        id: Date.now()
      };

      setDislikeFireworks((prev) => [...prev, newDislikeFirework]);

      setTimeout(() => {
        setDislikeFireworks((prev) => prev.filter(fw => fw.id !== newDislikeFirework.id));
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
    setComment(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleShareClick = () => {
    setShareModalOpen(true); 
  };

  const handleCloseModal = () => {
    setShareModalOpen(false); 
  };

  const handleSavePostClick = () => {
    console.log("Post saved!");
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
      if (
        !showEmojiPicker ||
        !event.target.closest('.emoji-picker')
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  return (
    <div
      ref={postRef}
      className="post-container p-4 bg-white shadow-md rounded-lg max-w-xl mx-auto mb-6 relative"
    >
      <button
        className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900 transition-colors"
        onClick={handleMenuToggle}
      >
        <FaEllipsisV />
      </button>

      {menuOpen && (
        <div 
          ref={menuRef} 
          className="absolute top-10 right-2 bg-white border border-gray-300 shadow-md rounded-lg z-10"
        >
          <ul>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Interested</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Not Interested</li>
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
          <div className="text-lg font-semibold text-[#B48FD9]">
            {user?.name || "John Doe"}
          </div>
          <p className="text-gray-600 mt-1 text-sm">
            {content || "This is a sample status update. Feel free to add your thoughts here!"}
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
        {fireworks.map(firework => (
          <div
            key={firework.id}
            className="firework"
            style={{ left: firework.left, top: firework.top }}
          />
        ))}
      </div>
      
      
      <div className="absolute inset-0 fireworkss-container">
        {dislikeFireworks.map(firework => (
          <div
            key={firework.id}
            className="fireworkk"
            style={{ left: firework.left, top: firework.top }}
          />
        ))}
      </div>

      <div className="mt-3 border-t border-gray-200 pt-3">
        <div className="flex gap-4 text-sm">
          <button
            className={`flex items-center gap-2 transition-colors duration-300 transform ${liked ? "text-red-500" : "text-[#B48FD9]"} hover:text-[#BFB26F] relative`}
            onClick={handleLikeClick}
          >
            <FaHeart className="w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
            <span>{liked ? "Đã Thích" : "Thích"}</span>
          </button>

          <button
            className={`flex items-center gap-2 transition-colors duration-300 transform ${disliked ? "text-gray-500" : "text-[#B48FD9]"} hover:text-[#BFB26F] relative`}
            onClick={handleDislikeClick} 
          >
            <FaHeartBroken className="dislike-icon w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
            <span>{disliked ? "Không Thích" : "Không Thích"}</span>
          </button>

          <button
            className="flex items-center gap-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors"
            onClick={handleCommentClick}
          >
            <FaComment className="w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
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
            className="save-post-button absolute bottom-0 right-0 mb-3 mr-3 text-[#B48FD9] hover:text-[#BFB26F] transition-colors flex items-center gap-2"
            onClick={handleSavePostClick}
          >
            <FaBookmark className="w-4 h-4 transition-transform duration-300 transform hover:scale-125" />
          </button>

        </div>
        

        {commenting && (
          <div className="mt-3 flex items-center gap-2">
            <input
              className="flex-grow p-2 border border-gray-300 rounded-lg text-sm"
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
                <Picker data={data} onEmojiSelect={handleEmojiClick} />
              </div>
            )}
          </div>
        )}
      </div>

      <ShareModal isOpen={shareModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Post;
