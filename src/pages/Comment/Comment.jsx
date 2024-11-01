// Comment.jsx
import React, {useEffect, useRef, useState} from 'react';
import './Comment.css'; // Import the CSS file

import { Button } from "@/components/ui/button";


import axios from "axios";
import {FaEllipsisV, FaSmile} from "react-icons/fa";
import Picker from "@emoji-mart/react";
import Data from "@emoji-mart/data";
import Post from "../Post/Post.jsx";
import button from "bootstrap/js/src/button.js";
import Reply from "./Reply.jsx";



const Comment = ({ cmtdata, fetchComments}) => {
    const cmtRef = useRef(null);
    const cmtmenuRef = useRef(null);
    const [cmtMenuOpen, setcmtMenuOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [comment, setComment] = useState(cmtdata.commentInfo.content);
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [Error, setError] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [success, setSuccess] = useState(false);
    const [post, setPost] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reply, setReply] = useState("");//reply nay la cua ham tao phan hoi
    const [replies, setReplies] = useState([]);
    const [repCountBtn, setRepCountBtn] = useState(true);
    const [showReps,setShowReps] = useState(false);
    const [replying, setReplying] = useState(false);

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
        setComment(cmtdata.commentInfo.content);

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

    const handleShowReps = () =>{
        console.log(commentId);
        setShowReps(true);
        setIsLoading(true);
        setRepCountBtn(false);
        getReplies(commentId);
    }

    const getReplies = async (commentId) => {
        try {
            console.log("fetching replies", commentId);
            const response = await axios.get(`${apiUrl}/comment/getReplies/${commentId}`,
                {
                    headers:{
                        "Content-Type": "application/json",
                    },
                    withCredentials:true,
                });
            setReplies(response.data.replies); // Cập nhật replies vào state

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching replies:", error);
        }
    };

    // Gọi hàm getReplies khi click vào button
    useEffect(() => {
        if (commentId) {
            getReplies(commentId);
        }
    }, [commentId]);

    const handleRepClick = async () =>{
        if (!replying){
            setReplying(true);
        }
        else setReplying(false);
    }
    const handleRepChange = async (e) => {

        setReply(e.target.value);
    }
    const handleRepSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        const formData = new FormData();
        formData.append("postId", cmtdata.commentInfo.postId);
        formData.append("content", reply);
        formData.append("parentCommentId",commentId);
        try {
          console.log(formData+" "+commentId+" "+reply+" "+cmtdata.commentInfo.postId);
          const response = await axios.post(`${apiUrl}/comment/createComment`,
              formData,
              {headers:{ "Content-Type": "application/json" },
              withCredentials:true});
          console.log("Reply Created",response.data);
          setSubmitting(false);
          setReplying(false);
          setReply("");
          setSuccess(true);
          setShowReps(true);
          getReplies(commentId);
        }
        catch(err){
            console.log("Error replying:", err);
        }
    }


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


                <div
                    className="comments-details relative">
                    <div className ref={cmtmenuRef}>
                        <button
                            className="comment-toogle absolute top-2 right-2 p-2 text-foreground-lighter hover:text-foreground transition-colors"
                            onClick={() => handlecmtToggle(commentId)}>

                            <FaEllipsisV/>
                        </button>

                    </div>
                    <p className="text-white">{cmtdata.commentInfo._id}</p>
                    <p className='comment-author'><strong>{cmtdata.commentInfo.author}</strong></p>
                    <p className='comment-content'>{cmtdata.commentInfo.content}</p>
                    <small
                        className='comment-timestamp'>{new Date(cmtdata.commentInfo.createdAt).toLocaleString()}
                    </small>
                </div>


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
            <div>
                <button className="text-gray-300"
                onClick={handleRepClick}>
                    Reply
                </button>
                {replying &&(
                    <div
                        className="reply p-5 flex items-center gap-2 bg-background-darker shadow-md rounded-lg max-w-xl mx-auto mb-7 relative">
                        <input
                            className="flex-grow p-2 bg-input text-foreground focus:outline-none rounded-lg text-sm"
                            placeholder="Viết phản hồi..."
                            value={reply}
                            onChange={handleRepChange}
                        />

                        <button
                            className="p-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors"
                            onClick={handleRepSubmit}
                        >
                            Đăng
                        </button>
                    </div>
                )}
            </div>
            {repCountBtn && cmtdata.replies.length > 0 && (
                <div>
                    <button className="text-blue-400" onClick={handleShowReps}>
                        Show replies
                        {showReps}
                    </button>

                </div>
            )}

            {showReps && replies && replies.length > 0 && (
                <div className="replies-container">
                    {replies.map((reply) => (
                        <div key={reply.replyInfo._id}>
                            {/* Render reply cha */}
                            <Reply
                                repdata={reply}
                                getReplies={getReplies}
                                // Gán ID cha
                            />

                            {/* Kiểm tra và render replies con nếu có */}
                            {showReps && reply.replies.length > 0 && (
                                <div className="nested-replies">
                                    {reply.replies.map((nestedReply) => (
                                        <Reply
                                            key={nestedReply.replyInfo._id}
                                            repdata={nestedReply}
                                            getReplies={getReplies}
                                            // Gán ID cha cho replies con
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
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
                            onClick={() => handleDeleteClick()}>

                            Delete Comment
                        </li>
                    </ul>

                </div>
            )}


            {isLoading && (
                <div className="comment-loading text-white">
                    <p>Loading...</p>
                </div>
            )}

        </div>
    );
};

export default Comment;
