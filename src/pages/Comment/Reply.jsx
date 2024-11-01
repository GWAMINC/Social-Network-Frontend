import React, {useState,useRef,useEffect} from 'react';
import {FaEllipsisV, FaSmile} from "react-icons/fa";
import button from "bootstrap/js/src/button.js";
import axios from "axios";

const Reply = ({ repdata ,getReplies}) => {
    const [showToogle, setShowToogle] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [showReplies, setShowReplies] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [showRepBtn, setShowRepBtn] = useState(true);
    const [replying, setReplying] = useState(false);
    const [displayedReplies, setDisplayedReplies] = useState([]); // lưu danh sách các phản hồi hiển thị



    const [replies, setReplies] = useState("");//ham phan hoi rep
    const [reply, setReply] = useState(repdata.replyInfo.content);//ham cua upd rep


    const apiUrl = import.meta.env.VITE_API_URL;

    const handleToogleClick = () => {
        if (!showToogle) {
            setShowToogle(true);
        }
        else setShowToogle(false);

    }
    const handleDeleteClick = ()=>{
        setShowDeleteModal(true);
    }

    const confirmDelete = async (e)=>{
        e.preventDefault();
        console.log("deleting ",repdata.replyInfo._id);
        try {
            const response = await axios.post(`${apiUrl}/comment/deleteComment/${repdata.replyInfo._id}`, {
                headers:{"Content-Type":"application/json"}, withCredentials: true
            });
            console.log("Reply Deleted",response.data);
            const updatedReplies = displayedReplies.filter(reply => reply.replyInfo._id !== repdata.replyInfo._id);
            setDisplayedReplies(updatedReplies);

            setSuccess(true);
            setShowDeleteModal(false);




        }
        catch(error){
            console.log(error);
        }
    }

    const cancelDelete = ()=>{
        setShowDeleteModal(false);
    }

    const handleUpdClick = async ()=>{

        if (!updating){
            setUpdating(true);
            setShowReplies(false);
            setShowToogle(false);
            setReplying(false);
        }
        else {
            setUpdating(false);
            setShowReplies(true);
        }
    }

    const handleUpdateChange = async (e) => {
        setReply(e.target.value);
    }

    const handleUpdSubm = async (e) => {
        e.preventDefault();
        console.log(repdata.replyInfo._id);
        setSubmitting(true);
        setError(null);
        const formData = new FormData();
        formData.append("commentId", repdata.replyInfo._id);
        formData.append("content",reply);
        try {
            const response = await axios.post(`${apiUrl}/comment/updateComment/${repdata.replyInfo._id}`,
                formData,
                {headers:{"Content-Type":"application/json"}, withCredentials: true});

            console.log("Comment updated",response.data);
            repdata.replyInfo.content = reply;
            setSubmitting(false);
            setUpdating(false);
            setShowReplies(true);

            setSuccess(true);


        }
        catch(error){
            console.log(error);
            setError("Error updating reply");
        }
        finally {
            setUpdating(false);
        }
    }
    useEffect(() => {
        if (success) {
            // Thực hiện các hành động bổ sung nếu cần
            setSuccess(false);
        }
    }, [success]);

    const handleCancelUpd = ()=>{
        setUpdating(false);
        setShowReplies(true);
    }

    const handleRepClick = async ()=>{

        if (!replying){
            setReplying(true);
        }
        else setReplying(false);
    }

    const handleRepChange = async (e) => {
        setReplies(e.target.value);
    }

    const handleRepSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        const formData = new FormData();
        formData.append("postId", repdata.replyInfo.postId);
        formData.append("content",replies);
        formData.append("parentCommentId",repdata.replyInfo._id);
        try {
            console.log("postid ",repdata.replyInfo.postId,"ctn ",replies,"pid ", repdata.replyInfo._id);
            const response = await axios.post(`${apiUrl}/comment/createComment`,formData,{
                headers:{"Content-Type":"application/json"}, withCredentials: true
            });
            console.log("Reply created",response.data);
            setReplies((prevReplies) => [...prevReplies, response.data]);
            getReplies(repdata.replyInfo.parentCommentId);

            setSubmitting(false);
            setReplying(false);
            setSuccess(true);


        }
        catch(error){
            console.log(error);
        }

    }

    return (
        <div className="replies-section">
            {showDeleteModal&& (
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

            <div className="reply-details relative text-white"
            >


                {showReplies &&(
                    <div>
                        <button
                            className="reply-toogle absolute top-2 right-2 p-2 text-foreground-lighter hover:text-foreground transition-colors"
                            onClick={() => handleToogleClick(repdata.replyInfo._id)}>
                            <FaEllipsisV/>

                        </button>
                        <p>id {repdata.replyInfo._id}</p>
                        <p><strong>{repdata.replyInfo.author}</strong></p>
                        <p>{repdata.replyInfo.content}</p>
                        <small className="text-gray-400">{new Date(repdata.replyInfo.createdAt).toLocaleString()}
                        </small>
                    </div>
                )}


                {showToogle && (
                    <div
                        className="reply-menu absolute top-2 right-10 bg-gray-800 text-white shadow-lg rounded-lg p-2 mt-2"
                        key={repdata.replyInfo._id}
                    >
                    <ul className="space-y-1">
                            <li className="hover:bg-gray-700 px-3 py-1 rounded transition-colors"
                            onClick={handleUpdClick}>
                                Update Comment
                            </li>
                            <li
                                className="hover:bg-red-700 px-3 py-1 rounded transition-colors cursor-pointer"
                                onClick={handleDeleteClick}
                            >
                                Delete Comment
                            </li>
                        </ul>
                    </div>

                )}
                {updating && (
                    <div className="reply-edit flex items-center gap-2 rounded-lg max-w-xl mx-auto mb-7 relative">
                        <input
                            className="reply-upd-input flex-grow p-2 bg-input text-foreground focus:outline-none rounded-lg text-sm"
                            placeholder=""
                            value={reply}
                            onChange={handleUpdateChange}
                        />
                        <li
                        onClick={handleCancelUpd}>
                            Cancel
                        </li>

                        <button
                            className="reply-upd-submit text-blue-400 p-2  hover:text-[#BFB26F] "
                            onClick={handleUpdSubm}
                        >
                            Submit
                        </button>

                    </div>
                )}

            </div>
            {showRepBtn && (
                <button className="text-white"
                key={repdata.replyInfo._id}
                onClick={handleRepClick}>
                    Reply
                </button>
            )}
            {replying &&(
                <div
                    className="reply p-5 flex items-center gap-2 bg-background-darker shadow-md rounded-lg max-w-xl mx-auto mb-7 relative">
                    <input
                        className="flex-grow p-2 bg-input text-foreground focus:outline-none rounded-lg text-sm"
                        placeholder="Viết phản hồi..."
                        value={replies}
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
    );
};

export default Reply;
