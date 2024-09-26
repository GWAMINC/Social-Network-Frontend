import React, {useState} from 'react';
import './UpdateModal.css';
import axios from "axios"; // Create this CSS file for modal styling
const UpdateModal = ({ data, isOpen, onClose, onUpdate }) => {
    if (!isOpen) return null;
    const apiUrl = import.meta.env.VITE_API_URL;
    const [updateData, setUpdateData] = useState({content: data.content, access: data.access});
    const handleInputChange = (event) => {
        setUpdateData({
            ...updateData,
            [event.target.name]: event.target.value,
        });
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                `${apiUrl}/post/updatePost`,
                {  postId : data._id,
                        content : updateData.content,
                        access : updateData.access,
                        },
                    { withCredentials: true }
                );
            onUpdate(updateData); // Call the onUpdate function with the updated data
            onClose(); // Close the modal
        } catch (error) {
            console.error("Failed to update data:", error);
        }
    };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h3 className="modal-title">Update Post</h3>
                <div className="modal-body">
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <textarea
                                id="content"
                                name="content"
                                value={updateData.content || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="access">Access:</label>
                            <select
                                id="access"
                                name="access"
                                value={updateData.access || ''}
                                onChange={handleInputChange}
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <button className="update-button" type="submit">Update</button>
                    </form>
            </div>
        </div>
    </div>
    );
};


export default UpdateModal;