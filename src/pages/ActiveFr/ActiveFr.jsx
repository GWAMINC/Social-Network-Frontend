import React, { useState, useRef, useEffect } from "react";
import { AiOutlineSearch, AiOutlineMore } from "react-icons/ai";
import "./ActiveFr.css";
import axios from "axios";

const ActiveFr = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [statusActive, setStatusActive] = useState(true);
  const settingsRef = useRef(null);
  const searchRef = useRef(null);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsVisible(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.post(
          "http://localhost:9090/api/user/getfriend",
          {},
          { withCredentials: true }
        );
        const friendsData = res.data;
        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.post(
          "http://localhost:9090/api/user/getallusers",
          {},
          { withCredentials: true }
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, [friends]); // Update users whenever friends list changes

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };

  const toggleStatus = () => {
    setStatusActive(!statusActive);
  };

  const addFriend = async (friendId) => {
    try {
      await axios.post(
        "http://localhost:9090/api/user/addfriend",
        { friendId },
        { withCredentials: true }
      );
      const res = await axios.post(
        "http://localhost:9090/api/user/getfriend",
        {},
        { withCredentials: true }
      );
      
      setFriends(res.data);
      alert("Added friend successfully");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  const deleteFriend = async (unFriendId) => {
    try {
      await axios.post(
        "http://localhost:9090/api/user/unfriend",
        { unFriendId },
        { withCredentials: true }
      );
      const res = await axios.post(
        "http://localhost:9090/api/user/getfriend",
        {},
        { withCredentials: true }
      );
      setFriends(res.data);
      alert("Deleted friend successfully");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#B48FD9]">
          Active Friends
        </h2>
        <div className="relative" ref={settingsRef}>
          <button
            onClick={toggleSettings}
            className="text-[#B48FD9] w-10 h-10 flex items-center justify-center text-xl"
          >
            <AiOutlineMore />
          </button>
          {settingsVisible && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-48">
              <button className="block w-full text-gray-700 text-left hover:bg-gray-100 px-2 py-1 rounded-md">
                List Blocked
              </button>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-700">Activity Status</span>
                <div
                  onClick={toggleStatus}
                  className={`relative w-16 h-8 flex items-center cursor-pointer rounded-full transition-colors ${
                    statusActive ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <div
                    className={`absolute w-8 h-8 bg-white rounded-full transition-transform ${
                      statusActive ? "translate-x-8" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex items-center mb-4" ref={searchRef}>
        <button onClick={toggleSearch} className="text-[#B48FD9] w-6 h-6 mr-2">
          <AiOutlineSearch />
        </button>
        <input
          type="text"
          placeholder="Search Contacts..."
          className={`search-input ${searchVisible ? "visible" : ""}`}
        />
      </div>

      <div className="active-friends-list mt-4 space-y-4 border-4 border-black-500">
        {friends.map((friend) => (
          <div
            key={friend._id}
            className="flex items-center gap-2 justify-between"
          >
            <div className="flex items-center gap-2">
              <img
                src={`https://github.com/${friend.name}.png`}
                alt="Friend Avatar"
                className="w-8 h-8 rounded-full"
              />
              <p className="text-gray-600">{friend.name} is online</p>
            </div>

            <button onClick={() => deleteFriend(friend._id)}>
              Delete Friend
            </button>
          </div>
        ))}
      </div>

      <div className="active-friends-list mt-4 space-y-4 border-4 border-black-500">
        {users.map((user, index) => (
          <div key={index} className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <img
                src={`https://github.com/${user.name}.png`}
                alt="Friend Avatar"
                className="w-8 h-8 rounded-full"
              />
              <p className="text-gray-600">{user.name}</p>
            </div>

            <button onClick={() => addFriend(user._id)}>Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFr;
