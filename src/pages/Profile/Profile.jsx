import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileContent from "./ProfileContent";
import "./Profile.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const [activeTab, setActiveTab] = useState("Posts");
  const [profile, setProfile] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/user/profile`, {
          withCredentials: true,
        });
        setProfile(response.data.user);
        setCurrentUserId(response.data.user._id);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    if (userData) {
      setProfile(userData.user);
    } else {
      fetchProfile();
    }
  }, [userData]);
  return (
    <div className="profile">
      <ProfileHeader user={profile} currentUserId={currentUserId} />
      <ProfileContent activeTab={activeTab} user={profile} />
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
      />
    </div>
  );
};

export default Profile;
