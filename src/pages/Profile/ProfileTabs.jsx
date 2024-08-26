import React, { useState } from 'react';
import './ProfileTabs.css';

const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState('Posts');
    const [relationshipStatus, setRelationshipStatus] = useState('Single');

    const tabs = ['Posts', 'About', 'Friends', 'Photos', 'More'];

    return (
        <div>
            <div className="profile-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={activeTab === tab ? 'active' : ''}
                        onClick={() => setActiveTab(tab)}
                        aria-selected={activeTab === tab}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Nội dung tương ứng với từng tab */}
            <div className="tab-content">
                {activeTab === 'Posts' && <div>Your posts will be displayed here.</div>}
                {activeTab === 'About' && (
                    <div>
                        <h3>Relationship Status</h3>
                        <div className="relationship-options">
                            <button
                                className={relationshipStatus === 'Single' ? 'active' : ''}
                                onClick={() => setRelationshipStatus('Single')}
                            >
                                Single
                            </button>
                            <button
                                className={relationshipStatus === 'In relationship' ? 'active' : ''}
                                onClick={() => setRelationshipStatus('In relationship')}
                            >
                                In relationship
                            </button>
                            <button
                                className={relationshipStatus === 'Vague' ? 'active' : ''}
                                onClick={() => setRelationshipStatus('Vague')}
                            >
                                Vague
                            </button>
                        </div>
                    </div>
                )}
                {activeTab === 'Friends' && <div>Your friends list will be displayed here.</div>}
                {activeTab === 'Photos' && <div>Your photos will be displayed here.</div>}
                {activeTab === 'More' && <div>More content here.</div>}
            </div>
        </div>
    );
};

export default ProfileTabs;
