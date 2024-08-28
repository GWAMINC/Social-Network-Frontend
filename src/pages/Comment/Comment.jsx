// Comment.jsx
import React, {useEffect, useRef, useState} from 'react';
import './Comment.css'; // Import the CSS file
import Post from "@/pages/Post/index.jsx";

import axios from "axios";



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
