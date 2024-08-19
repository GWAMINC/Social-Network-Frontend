import React from "react";


const Comment = ({ comment }) => {
    return (
        <div className="comments-section">
            <h3>Comment</h3>
            {comment.length > 0 ? (
                comment.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p><strong>{comment.author}</strong>: {comment.text}</p>
                        <p className="comment-meta">Posted on: {new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <p>No comment yet. Be the first to comment!</p>
            )}
        </div>
    );
};

export default Comment;
