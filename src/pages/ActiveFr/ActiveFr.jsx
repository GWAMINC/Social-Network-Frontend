import { useState, useRef, useEffect } from "react";
import { AiOutlineSearch, AiOutlineMore } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import "./ActiveFr.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ActiveFr = () => {
  const navigate = useNavigate();

  const [searchVisible, setSearchVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [statusActive, setStatusActive] = useState(true);
  const settingsRef = useRef(null);
  const searchRef = useRef(null);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

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

  const handleUserClick = async (id) => {
    try {
      const res = await axios.post(
        `${apiUrl}/user/getProfileById`,
        { userId: id },
        { withCredentials: true }
      );
      const userData = res.data;
      navigate("/profile", { state: { userData } });
    } catch (error) {
      console.log("Error fetching user data: ", error);
    }
  };

  return (
    <div className="p-6 bg-background-lighter shadow-lg rounded-lg flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Active Friends
        </h2>
        <div className="relative" ref={settingsRef}>
          <button
            onClick={toggleSettings}
            className="text-foreground-lighter w-10 h-10 flex items-center justify-center text-2xl"
          >
            <AiOutlineMore />
          </button>
          {settingsVisible && (
            <div className="absolute right-0 mt-2 bg-input text-foreground-lighter shadow-lg rounded-lg p-2 w-48">
              <button className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded-md">
                List Blocked
              </button>
              <div className="flex items-center justify-between mt-2">
                <span>Activity Status</span>
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
        <button
          onClick={toggleSearch}
          className="text-foreground-lighter w-6 h-6 mr-2"
        >
          <AiOutlineSearch />
        </button>
        <input
          type="text"
          placeholder="Search Contacts..."
          className={`search-input bg-input text-foreground ${
            searchVisible ? "visible" : ""
          }`}
        />
      </div>

      <div className="active-friends-list mt-4 space-y-4">
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

              <a
                onClick={() => handleUserClick(friend._id)}
                className="text-foreground cursor-pointer hover:underline"
              >
                {friend.name} is online
              </a>
            </div>

            <Button
              variant="secondary"
              onClick={() => deleteFriend(friend._id)}
            >
              Delete Friend
            </Button>
          </div>
        ))}
      </div>

      <div className="active-friends-list mt-4 pt-4 space-y-4 border-t border-border">
        {users.map((user, index) => (
          <div key={index} className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <img
                src={`https://github.com/${user.name}.png`}
                alt="Friend Avatar"
                className="w-8 h-8 rounded-full"
              />
              <a
                onClick={() => handleUserClick(user._id)}
                className="text-foreground cursor-pointer hover:underline"
              >
                {user.name}
              </a>
            </div>

            <Button onClick={() => addFriend(user._id)}>Add Friend</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFr;
