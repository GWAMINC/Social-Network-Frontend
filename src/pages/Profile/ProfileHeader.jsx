import React, { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileHeader = ({ user, currentUserId }) => {
  const [profile, setProfile] = useState(user);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null); // State for image preview
  const avatarUrl = profile?.profile?.profilePhoto;
  const userName = profile?.name;
  const firstLetter = userName?.charAt(0).toUpperCase();
  const navigate = useNavigate();
  const editOptionsRef = useRef(null);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  useEffect(() => {
    if (avatar) {
      const file = avatar[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [avatar]);

  const changeAvatar = async (event) => {
    event.preventDefault();

    if (!avatar) {
      console.error("No avatar selected.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", avatar[0]);

    try {
      const response = await axios.post(
        "http://localhost:9090/api/user/changeAvatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setProfile((prevProfile) => ({
        ...prevProfile,
        profile: response.data.profile,
      }));
      setShowEditOptions(false);
      setIsVisible(false);
    } catch (error) {
      console.error("Failed to change avatar:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editOptionsRef.current &&
        !editOptionsRef.current.contains(event.target)
      ) {
        setShowEditOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditCoverPhotoClick = () => {};

  const handleAvatarClick = () => {
    if (currentUserId === profile._id) {
      setShowEditOptions(!showEditOptions);
    }
  };

  return (
    <div className="relative pt-11">
      <div className="relative">
        <img
          src="https://cdn.pixabay.com/photo/2021/07/02/19/09/lavenders-6382337_1280.jpg"
          alt="Cover"
          className="w-full h-48 object-cover"
        />
        <button
          className="flex items-center justify-center gap-2 absolute top-2 right-2 px-2 py-1 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800"
          onClick={handleEditCoverPhotoClick}
        >
          <FaEdit /> Edit cover photo
        </button>
      </div>

      <div className="flex items-center justify-center -mt-16 mb-2">
        <Avatar
          className="relative w-28 h-28 border-4 border-white rounded-full"
          onClick={handleAvatarClick}
        >
          {avatarUrl ? (
            <AvatarImage
              src={avatarUrl}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <AvatarFallback className="text-2xl text-gray-600 bg-gray-200 w-full h-full flex items-center justify-center rounded-full">
              {firstLetter}
            </AvatarFallback>
          )}
        </Avatar>

        {showEditOptions && (
          <div
            className="absolute top-24 right-1/2 bg-white shadow-md rounded-md border border-gray-200 p-2 space-y-1"
            ref={editOptionsRef}
          >
            <button
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
              onClick={() => navigate("/profile/edit")}
            >
              <FaEdit /> <span>Edit profile</span>
            </button>
            <button
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
              onClick={() => setIsVisible(true)}
            >
              <FaEdit /> <span>Change avatar</span>
            </button>
          </div>
        )}
      </div>

      {isVisible && currentUserId === profile?._id && (
        <form
          onSubmit={changeAvatar}
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
        >
          <div className="p-4 bg-white shadow-md rounded-lg max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-3">Change Avatar</h3>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
              />
            )}
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files)}
              className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            <button
              type="submit"
              className="mt-3 w-full px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
            <div
              onClick={() => setIsVisible(false)}
              className="mt-3 text-center text-blue-500 cursor-pointer hover:underline text-sm"
            >
              Close
            </div>
          </div>
        </form>
      )}

      <div className="text-center mt-2">
        <h1 className="text-xl font-bold">{userName}</h1>
        <p className="mt-1 text-gray-600">{profile?.profile?.bio}</p>
      </div>

      <div className="flex justify-center space-x-2 mt-2">
        <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">
          Add Friend
        </button>
        <button className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm">
          Message
        </button>
        <button className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm">
          More
        </button>
      </div>
      <div className="my-2 border-t border-gray-300"></div>
    </div>
  );
};

export default ProfileHeader;
