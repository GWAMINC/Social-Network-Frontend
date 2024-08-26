import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import ProfileContent from './ProfileContent';
import './Profile.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('Posts');

    return (
        <div className="profile">
            <ProfileHeader />
            <ProfileContent activeTab={activeTab} />
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

export default Profile;
