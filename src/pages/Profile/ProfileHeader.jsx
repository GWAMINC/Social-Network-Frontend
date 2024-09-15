import React from 'react';
import './ProfileHeader.css';
import { FaEdit, FaEllipsisV } from 'react-icons/fa';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../EditProfile';

const ProfileHeader = ({ profile }) => {
    const avatarUrl = profile?.profile?.profilePhoto;
    const userName = profile?.name;
    const firstLetter = userName?.charAt(0).toUpperCase();
    const navigate = useNavigate(); // Use useNavigate hook

    const handleEditCoverPhotoClick = () => {
        navigate('/profile/edit');
    };

    return (
        <div className="profile-header">
            <div className="cover-photo">
                <img 
                    src="https://cdn.pixabay.com/photo/2021/07/02/19/09/lavenders-6382337_1280.jpg" 
                    alt="Cover" 
                /> 
                <button className="edit-cover-photo" onClick={handleEditCoverPhotoClick}>
                    <FaEdit /> Edit cover photo
                </button>
               
            </div>
            <div className="profile-picture bg-slate-400">
                <Avatar>
                    {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt="Profile" />
                    ) : (
                        <AvatarFallback className='text-3xl'>{firstLetter}</AvatarFallback>
                    )}
                </Avatar>
            </div>
            <div className="user-info">
                <h1>{userName}</h1>
                <p>{profile?.profile?.bio}</p>
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
