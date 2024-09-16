import React, { useState } from 'react';
import './ProfileContent.css';
import Post from '../Post/Post';

const tabs = [
    { name: 'Relationship', content: <div>Relationship Content</div> },
    { name: 'Social links', content: <div>Social links Content</div> },
    { name: 'Home town', content: <div>Home town Content</div> },
    { name: 'Education', content: <div>Education Content</div> },
    { name: 'Work', content: <div>Work Content</div> }
];

const ProfileContent = ({profile}) => {
    const [activeTab, setActiveTab] = useState(tabs[0].name);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const currentContent = tabs.find(tab => tab.name === activeTab)?.content;

    return (
        <div className="profile-content">
            <div className="tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.name}
                        className={`tab-button ${activeTab === tab.name ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.name)}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {currentContent}
            </div>
        </div>
    );
};

export default ProfileContent;
