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
                    <div key={index} className="comment-item bg-comment">
                        <p className='text-foreground'><strong>{comment.author}</strong> </p>
                        <p className='text-foreground'>{comment.content}</p>
                        <small className='text-foreground-lighter'>{new Date(comment.createdAt).toLocaleString()}</small>
                    </div>
                ))
            ) : (
                <p className='text-foreground-lighter'>No comments yet.</p>
            )}
        </div>
    );
};

export default Comment;
