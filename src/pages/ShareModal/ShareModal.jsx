import React from 'react';
import './ShareModal.css'; // Create this CSS file for modal styling

const ShareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h3 className="modal-title">Share this post</h3>
        <ul className="share-options">
          <li className="share-option">Share with Friends</li>
          <li className="share-option">Share in Groups</li>
          <li className="share-option">Share in Feed</li>
        </ul>
      </div>
    </div>
  );
};

export default ShareModal;
