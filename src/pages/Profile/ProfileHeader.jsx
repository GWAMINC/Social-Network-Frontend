import React from 'react';
import './ProfileHeader.css';
import { FaEdit, FaEllipsisV  } from 'react-icons/fa'; 

const ProfileHeader = () => {
    return (
        <div className="profile-header">
            <div className="cover-photo">
                <img src="https://cdn.pixabay.com/photo/2021/07/02/19/09/lavenders-6382337_1280.jpg" alt="Cover" /> 
                <button className="edit-cover-photo">
                    <FaEdit /> Edit cover photo
                </button>
            </div>
            <div className="profile-picture">
                <img src="https://github.com/shadcn.png" alt="Profile" /> 
            </div>
            <div className="user-info">
                <h1>Ma Da</h1>
                <p>LOL</p>
            </div>
            <div className="profile-actions">
                <button>Add Friend</button>
                <button>Message</button>
                <button>More</button>
            </div>
            <div className="divider"></div>
                <button className="options-button">
                    <FaEllipsisV />
                </button>
            </div>
    );
};

export default ProfileHeader;

