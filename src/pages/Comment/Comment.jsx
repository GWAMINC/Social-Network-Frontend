// Comment.jsx
import React, {useEffect, useRef, useState} from 'react';
import './Comment.css'; // Import the CSS file

import { Button } from "@/components/ui/button";


import axios from "axios";
import {FaEllipsisV, FaSmile} from "react-icons/fa";
import Picker from "@emoji-mart/react";
import Data from "@emoji-mart/data";
import Post from "../Post/Post.jsx";



const Comment = ({ cmtdata, fetchComments }) => {
    const cmtRef = useRef(null);
    const cmtmenuRef = useRef(null);
    const [cmtMenuOpen, setcmtMenuOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [comment, setComment] = useState(cmtdata.content);
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [Error, setError] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [success, setSuccess] = useState(false);
    const [post, setPost] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const commentId=cmtdata.commentInfo._id;
    const [users, setUsers] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;



    const handlecmtToggle = async (commentId) => {
        console.log(commentId);
        setcmtMenuOpen(!cmtMenuOpen);
    };

    const handleUpdClick = ()=>{
        console.log(commentId);
        setcmtMenuOpen(false);

        if(!updating){
            setUpdating(true);
            console.log("updating....");
        }
        setComment(cmtdata.content);

    }

    const handleUpdateChange = async (e) => {

        setComment(e.target.value);
    }

    const handleUpdCmtSub = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append("commentId", commentId);
        formData.append("content", comment);
        try{
            console.log(formData+" "+commentId+" "+comment);
            const response = await axios.post(
                `${apiUrl}/comment/updateComment/${commentId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log("Comment updated",response.data);
            setUpdating(false);
            setComment("");
            setSuccess("Comment updated!");
            setcmtMenuOpen(false);
            fetchComments();
            setShowComments(true);


            const event = new CustomEvent("CommentUpdated");
            window.dispatchEvent(event);

        }
        catch(err){
            console.log("khum bic bug gi"+err);
            setError("Failed to update cmt");
            setSuccess(false);
        }
        finally {
            setUpdating(false);
        }
    }

    const handleDeleteClick = () => {
        setShowDeleteModal(true); // Hiển thị modal khi bấm "Delete"
    };

    const confirmDelete = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append("commentId", commentId);
        try{
            console.log(formData+" deleting "+commentId);
            const response = await axios.post(
                `${apiUrl}/comment/deleteComment/${commentId}`,
                formData,
                {
                    headers:{
                        "Content-Type": "application/json",
                    },
                    withCredentials:true,
                }
            )
            console.log("Comment deleted",response.data);
            setComment("");
            setSuccess(true);
            setcmtMenuOpen(false);
            fetchComments();
            setShowComments(true);

        }
        catch (err){
            console.log("Delete failed", err);
            setError("Delete failed");
            setSuccess(false);
        }

        setShowDeleteModal(false); // Ẩn modal sau khi xác nhận xóa
    };

    const cancelDelete = () => {
        setShowDeleteModal(false); // Ẩn modal nếu người dùng hủy
    };



    return (
        <div ref={cmtRef}
             className="comments-container bg-gray-900 shadow-md rounded-lg max-w-xl mx-auto mb-7 relative">
            <div className="comment-bg">
                {updating && (
                    <div className="comment-edit flex items-center gap-2 rounded-lg max-w-xl mx-auto mb-7 relative">
                        <input
                            className="comment-input flex-grow p-2 bg-input text-foreground focus:outline-none rounded-lg text-sm"
                            placeholder=""
                            value={comment}
                            onChange={handleUpdateChange}
                        />

                        <button
                            className="comment-submit p-2  hover:text-[#BFB26F] "
                            onClick={handleUpdCmtSub}
                        >
                            Submit
                        </button>

                    </div>
                )}
                {cmtMenuOpen && (
                    <div
                        ref={cmtmenuRef}
                        className="comment-menu absolute top-10 right-2  rounded-md bg-dropdown text-foreground-lighter shadow-md hover:text-foreground "
                    >
                        <ul>
                            <li className="p-2 hover:bg-dropdown-hover rounded cursor-pointer"
                                onClick={() => handleUpdClick()}>
                                {updating}
                                Update Comment
                            </li>
                            <li className="p-2 hover:bg-dropdown-hover rounded cursor-pointer"
                                onClick={()=> handleDeleteClick()}>

                                Delete Comment
                            </li>
                        </ul>

                    </div>
                )}


                <div
                    className="comments-details relative">
                    <div className ref={cmtmenuRef}>
                        <button
                            className="comment-toogle absolute top-2 right-2 p-2 text-foreground-lighter hover:text-foreground transition-colors"
                            onClick={() => handlecmtToggle(commentId)}>

                            <FaEllipsisV/>
                        </button>

                    </div>
                    <p className='comment-author'><strong>{cmtdata.userInfo}</strong></p>
                    <p className='comment-content'>{cmtdata.content}</p>
                    <small
                        className='comment-timestamp'>{new Date(cmtdata.commentInfo.createdAt).toLocaleString()}
                    </small>
                </div>

                {isLoading&&(
                    <div className="comment-loading">
                        <p>Loading...</p>
                    </div>
                )}


                {showDeleteModal && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h2>Are you sure you want to delete this comment?</h2>
                            <div className="modal-actions">
                                <button onClick={confirmDelete}>Delete</button>
                                <button onClick={cancelDelete}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}



            </div>
        </div>
    );
};

export default Comment;
