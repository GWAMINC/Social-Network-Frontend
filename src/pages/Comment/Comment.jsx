// Comment.jsx
import React, {useEffect, useState} from 'react';
import './Comment.css'; // Import the CSS file



const Comment = ({ comments }) => {


    return (
        <div className="comments-section">

            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                        <p><strong>{comment.author}</strong> </p>
                        <p>{comment.content}</p>
                        <small>{new Date(comment.createdAt).toLocaleString()}</small>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default Comment;
