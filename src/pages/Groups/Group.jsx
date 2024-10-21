import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import {
  FaCog,
  FaSearch,
  FaNewspaper,
  FaLightbulb,
  FaUsers,
  FaPlusCircle,
} from "react-icons/fa";
import "./Group.css";
import axios from "axios";
import Post from "../Post";
import { GroupIdContext } from "@/layouts/DefaultLayout/DefaultLayout";

const Groups = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [group, setGroup] = useState({
    name: "",
    bio: "",
    profilePhoto: null,
    privacy: "public",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [listgroup, setListgroup] = useState([]);
  const [mygroup, setMygroup] = useState([]);
  const [inforgroup, setInforgroup] = useState(null);
  const [activeTab, setActiveTab] = useState("discussion");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState("");
  const [isAddAdmin, setIsAddAdmin] = useState("");
  const [isLeaveGroup, setIsLeaveGroup] = useState("");
  const [isDeleteGroup, setIsDeleteGroup] = useState("");
  const [isUpdateGroup, setIsUpdateGroup] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setShowOptions(true);
  };

  const handleOptionClick = (action) => {
    setShowOptions(false);
    if (action === "viewProfile") {
      // Logic để xem hồ sơ
      console.log(`View profile of ${selectedMember.name}`);
    } else if (action === "remove") {
      handleRemoveMember(inforgroup.group._id, selectedMember._id);
    } else if (action === "add admin") {
      handleAddAdmin(inforgroup.group._id, selectedMember._id);
    }
  };

  const [groupId, setGroupId] = useContext(GroupIdContext);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const handleJoin = async (groupId) => {
    try {
      const response = await axios.post(
        "http://localhost:9090/api/Group/joinGroup",
        { groupId },
        { withCredentials: true }
      );
      setGroupId(groupId);
      saveGroupIdToLocalStorage(groupId);
      setTimeout(() => {
        handleNavigation("group");
      }, 200);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error joining group:", error);
      alert(error.response?.data?.message || "Failed to join group");
    }
  };
  const handleRemoveMember = async (groupId, memberId) => {
    try {
      const response = await axios.post(
        "http://localhost:9090/api/Group/removeMember",
        { groupId, memberId },
        { withCredentials: true }
      );
      setIsRemoveMember("success");
      alert(response?.data?.message);
    } catch (error) {
      console.error("Error joining group:", error);
      alert(error.response?.data?.message || "Failed to join group");
    }
  };
  const handleAddAdmin = async (groupId, memberId) => {
    try {
      const response = await axios.post(
        "http://localhost:9090/api/Group/addAdmin",
        { groupId, memberId },
        { withCredentials: true }
      );
      setIsAddAdmin("success");
      alert(response?.data?.message);
    } catch (error) {
      console.error("Error add admin group:", error);
      alert(error.response?.data?.message || "Failed to add admin group");
    }
  };
  const handleLeaveGroup = async (groupId) => {
    try {
      const response = await axios.post(
        "http://localhost:9090/api/Group/leaveGroup",
        { groupId },
        { withCredentials: true }
      );
      setIsLeaveGroup("succes");
      handleNavigation("");

      alert(response?.data?.message);
    } catch (error) {
      console.error("Error Leave Group:", error);
      alert(error.response?.data?.message || "Failed to leave group");
    }
  };
  const handleDeleteGroup = async (groupId) => {
    try {
      const response = await axios.post(
        "http://localhost:9090/api/Group/deleteGroup",
        { groupId },
        { withCredentials: true }
      );
      setIsDeleteGroup("succes");
      handleNavigation("");

      alert(response?.data?.message);
    } catch (error) {
      console.error("Error Delete Group:", error);
      alert(error.response?.data?.message || "Failed to delete group");
    }
  };

  useEffect(() => {
    const tabPanes = document.querySelectorAll(".tab-pane");
    tabPanes.forEach((pane) => {
      pane.style.display = "none";
    });
    const activePane = document.getElementById(activeTab);
    if (activePane) {
      activePane.style.display = "block";
    }
  }, [activeTab]);

  const handleNavigation = (content) => {
    navigate(`/groups/${content}`);
    console.log(group);
  };
  const saveGroupIdToLocalStorage = (id) => {
    localStorage.setItem("groupId", id);
  };
  const getGroupIdFromLocalStorage = () => {
    return localStorage.getItem("groupId");
  };
  const getMainContent = () => {
    const path = location.pathname.split("/").pop(); // Lấy phần cuối của URL
    switch (path) {
      case "feed":
        return (
          <div>
            <h1 className="mb-4 text-4xl font-bold">Your Feed</h1>
            <div className="post-list">
              <div className="post-item">
                <h2 className="text-2xl font-bold">Post Title</h2>
                <p className="text-lg">This is a sample post content.</p>
              </div>
            </div>
          </div>
        );
      case "suggestions":
        return (
          <div className="suggestions-container w-full max-w-screen-lg mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Suggestions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {listgroup.map((group) => {
                const isMember = mygroup.some(
                  (myGroup) => myGroup._id === group._id
                );
                return (
                  <div
                    key={group._id}
                    className="group-card bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col"
                  >
                    <button
                      onClick={() => handleExclude(group._id)}
                      className="absolute top-2 right-2 bg-gray-200 rounded-full p-2 text-gray-600 hover:bg-gray-300 transition-colors duration-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    <img
                      src={group.profile.profilePhoto}
                      alt="Group Avatar"
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3
                        className={`text-xl font-semibold mb-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {group.name}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {group.profile.bio}
                      </p>
                      {isMember ? (
                        <button
                          className="w-full px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors duration-300"
                          onClick={() => {
                            setGroupId(group._id);
                            saveGroupIdToLocalStorage(group._id);
                            setTimeout(() => {
                              handleNavigation("group");
                            }, 200);
                          }}
                        >
                          View Group
                        </button>
                      ) : (
                        <button
                          onClick={() => handleJoin(group._id)}
                          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                          Join Group
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "joins":
        return (
          <div className="w-full max-w-screen-lg mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold mb-4">
              All groups you've joined ({mygroup.length})
            </h1>
            <div className="joined-groups-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mygroup.map((group) => (
                <div
                  key={group._id}
                  className="joined-group-card bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={group.profile.profilePhoto}
                    alt="Group Avatar"
                    className="joined-group-avatar w-full h-32 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3
                      className={`joined-group-name text-xl font-semibold mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-800"
                      }`}
                    >
                      {group.name}
                    </h3>
                    <p className="joined-group-description text-gray-600 mb-4 flex-grow">
                      {group.profile.bio}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <button
                        onClick={() => {
                          setGroupId(group._id);
                          saveGroupIdToLocalStorage(group._id);
                          setTimeout(() => {
                            handleNavigation("group");
                          }, 200);
                        }}
                        className="joined-group-view-button px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      >
                        View Group
                      </button>
                      <button className="joined-group-custom-button px-4 py-2 bg-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300">
                        Tùy chỉnh
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "create-group":
        return (
          <div className="flex flex-col items-center justify-center w-full max-w-md p-6 mx-auto rounded-lg shadow-lg bg-background-lighter">
            <h1 className="mb-6 text-4xl font-bold text-center text-foreground">
              Create Group
            </h1>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold text-foreground"
                >
                  Group Name:
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={group.name}
                  onChange={(e) => setGroup({ ...group, name: e.target.value })}
                  className="block w-full p-3 mt-1 border rounded-md text-foreground bg-input border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-lg font-semibold text-foreground"
                >
                  Bio:
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  value={group.bio}
                  onChange={(e) => setGroup({ ...group, bio: e.target.value })}
                  className="block w-full p-3 mt-1 border rounded-md text-foreground bg-input border-border focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="profilePhoto"
                  className="block text-lg font-semibold text-foreground"
                >
                  Profile Photo:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGroup({ ...group, profilePhoto: e.target.files })
                  }
                  className="block w-full mt-1 text-sm text-foreground-lighter file:border file:border-border file:bg-secondary file:text-secondary-foreground file:py-2 file:px-4 file:rounded-md hover:file:bg-secondary-hover"
                />
              </div>
              <div>
                <label
                  htmlFor="privacy"
                  className="block text-lg font-semibold text-foreground"
                >
                  Privacy:
                </label>
                <select
                  id="privacy"
                  value={group.privacy}
                  onChange={(e) =>
                    setGroup({ ...group, privacy: e.target.value })
                  }
                  className="block w-full p-3 mt-1 text-foreground bg-dropdown border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div
                className="w-full py-3 rounded-md focus:outline-none"
                onClick={() => createGroup()}
              >
                Create Group
              </div>
            </form>

            {error && <p className="mt-4 text-red-400">{error}</p>}
            {success && <p className="mt-4 text-green-400">{success}</p>}
          </div>
        );
      case "update-group":
        return (
          <div className="flex flex-col items-center justify-center w-full max-w-md p-6 mx-auto rounded-lg shadow-lg bg-background-lighter">
            <h1 className="mb-6 text-4xl font-bold text-center text-foreground">
              Update Group
            </h1>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold text-foreground"
                >
                  Group Name:
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={group.name}
                  onChange={(e) => setGroup({ ...group, name: e.target.value })}
                  className="block w-full p-3 mt-1 border rounded-md text-foreground bg-input border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-lg font-semibold text-foreground"
                >
                  Bio:
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  value={group.bio}
                  onChange={(e) => setGroup({ ...group, bio: e.target.value })}
                  className="block w-full p-3 mt-1 border rounded-md text-foreground bg-input border-border focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="profilePhoto"
                  className="block text-lg font-semibold text-foreground"
                >
                  Profile Photo:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGroup({ ...group, profilePhoto: e.target.files })
                  }
                  className="block w-full mt-1 text-sm text-foreground-lighter file:border file:border-border file:bg-secondary file:text-secondary-foreground file:py-2 file:px-4 file:rounded-md hover:file:bg-secondary-hover"
                />
              </div>
              <div>
                <label
                  htmlFor="privacy"
                  className="block text-lg font-semibold text-foreground"
                >
                  Privacy:
                </label>
                <select
                  id="privacy"
                  value={group.privacy}
                  onChange={(e) =>
                    setGroup({ ...group, privacy: e.target.value })
                  }
                  className="block w-full p-3 mt-1 text-foreground bg-dropdown border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div
                className="w-full py-3 rounded-md focus:outline-none"
                onClick={() => handleupdateGroup()}
              >
                Update Group
              </div>
            </form>
          </div>
        );

      case "group":
        if (!inforgroup) {
          return <div>Loading...</div>; // or some loading indicator
        }

        return (
          <div className="container">
            <div className="header">
              <div className="group-cover-edit">
                <img
                  src={
                    inforgroup.group.profile.coverPhoto || "default-cover.jpg"
                  }
                  alt="Group Cover"
                  className="group-cover"
                />
                <button
                  className="edit-button-cover"
                  onClick={() => handleNavigation("update-group")}
                >
                  {" "}
                  Edit
                </button>
                <div className="group-cover-info">
                  <div className="group-avatar-edit">
                    <img
                      src={
                        inforgroup.group.profile.profilePhoto ||
                        "default-photo.jpg"
                      }
                      alt="Group Avatar"
                      className="group-avatar1"
                    />
                  </div>
                  <div className="group-name-members">
                    <div className="group-name-buttons">
                      <h2>{inforgroup.group.name}</h2>
                      <div className="button-container">
                        <button className="group-button">Invite</button>
                        <button className="group-button">Share</button>
                      </div>
                    </div>
                    <div className="group-meta">
                      <span>
                        {inforgroup.group.privacy === "private"
                          ? "Private Group"
                          : "Public Group"}
                      </span>
                      <span>
                        {" "}
                        · {inforgroup.group.members.length}{" "}
                        {inforgroup.group.members.length > 1
                          ? "members"
                          : "member"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="tabs">
                <button
                  className={`tab-button1 ${
                    activeTab === "discussion" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("discussion")}
                >
                  Discussion
                </button>
                <button
                  className={`tab-button1 ${
                    activeTab === "member" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("member")}
                >
                  Member
                </button>
                <button
                  className={`tab-button1 ${
                    activeTab === "events" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("events")}
                >
                  Events
                </button>
                <button
                  className={`tab-button1 ${
                    activeTab === "medias" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("medias")}
                >
                  Medias
                </button>
                <button
                  className={`tab-button1 ${
                    activeTab === "files" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("files")}
                >
                  Files
                </button>
                <button
                  className="leave-group-button"
                  onClick={() => handleLeaveGroup(inforgroup.group._id)}
                >
                  Leave Group
                </button>
                <button
                  className="delete-group-button"
                  onClick={() => handleDeleteGroup(inforgroup.group._id)}
                >
                  Delete Group
                </button>
              </div>

              <div className="tab-content">
                <div
                  id="discussion"
                  className="tab-pane"
                  style={{
                    display: activeTab === "discussion" ? "block" : "none",
                  }}
                >
                  <p>Discussion content goes here.</p>
                </div>
                <div
                  id="member"
                  className="tab-pane"
                  style={{ display: activeTab === "member" ? "block" : "none" }}
                >
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Find a member"
                      className="search-input"
                    />
                  </div>
                  <div className="roles">
                    <div
                      className={`role-section ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300"
                          : "bg-white text-gray-800"
                      } p-4 rounded-md mb-4`}
                    >
                      <h4
                        className={`font-semibold ${
                          isDarkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        Admins & Moderators
                      </h4>
                      <input
                        type="text"
                        placeholder="Search Admins & Moderators"
                        className="search1"
                      />
                      <div className="role-list">
                        {inforgroup.group.admin &&
                          inforgroup.group.admin.length > 0 &&
                          inforgroup.group.admin.map((admin) => (
                            <div
                              key={admin._id}
                              className={`role-item flex items-center p-2 ${
                                isDarkMode
                                  ? "hover:bg-gray-700"
                                  : "hover:bg-gray-200"
                              }`}
                            >
                              <img
                                src={
                                  admin.profile.profilePhoto ||
                                  "default-photo.jpg"
                                }
                                alt="Admin Avatar"
                                className="role-avatar rounded-full mr-2"
                              />
                              <p>{admin.name}</p>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div
                      className={`role-section ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300"
                          : "bg-white text-gray-800"
                      } p-4 rounded-md mb-4`}
                    >
                      <h4
                        className={`font-semibold ${
                          isDarkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        Members
                      </h4>
                      <input
                        type="text"
                        placeholder="Search Members"
                        className="search1 mb-4 p-2 border rounded-md"
                      />
                      <div className="role-list">
                        {inforgroup.group.members &&
                          inforgroup.group.members.length > 0 &&
                          inforgroup.group.members.map((member) => (
                            <div
                              key={member._id}
                              className={`role-item flex items-center p-2 ${
                                isDarkMode
                                  ? "hover:bg-gray-700"
                                  : "hover:bg-gray-200"
                              } ${
                                selectedMember?._id === member._id
                                  ? isDarkMode
                                    ? "bg-gray-600"
                                    : "bg-gray-300"
                                  : ""
                              } cursor-pointer`}
                              onClick={() => handleMemberClick(member)}
                            >
                              <img
                                src={
                                  member.profile.profilePhoto ||
                                  "default-photo.jpg"
                                }
                                alt="Member Avatar"
                                className="role-avatar rounded-full mr-2 w-8 h-8"
                              />
                              <p>{member.name}</p>
                            </div>
                          ))}
                        {selectedMember && (
                          <div className="selected-member-info mt-4">
                            <h5
                              className={`font-semibold ${
                                isDarkMode ? "text-gray-200" : "text-gray-800"
                              }`}
                            >
                              Selected Member:
                            </h5>
                            <div
                              className={`role-item flex items-center p-2 ${
                                isDarkMode ? "bg-gray-600" : "bg-gray-300"
                              } rounded-md`}
                            >
                              <img
                                src={
                                  selectedMember.profile.profilePhoto ||
                                  "default-photo.jpg"
                                }
                                alt="Selected Member Avatar"
                                className="role-avatar rounded-full mr-2 w-8 h-8"
                              />
                              <p>{selectedMember.name}</p>
                            </div>
                          </div>
                        )}
                        {showOptions && selectedMember && (
                          <div className="options-menu mt-2">
                            <button
                              onClick={() => handleOptionClick("viewProfile")}
                              className="text-blue-500 hover:underline"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => handleOptionClick("remove")}
                              className="text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => handleOptionClick("add admin")}
                              className="text-green-500 hover:underline"
                            >
                              Add Admin
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="events"
                  className="tab-pane"
                  style={{ display: activeTab === "events" ? "block" : "none" }}
                >
                  <p>Events content goes here.</p>
                </div>
                <div
                  id="medias"
                  className="tab-pane"
                  style={{ display: activeTab === "medias" ? "block" : "none" }}
                >
                  <p>Medias content goes here.</p>
                </div>
                <div
                  id="files"
                  className="tab-pane"
                  style={{ display: activeTab === "files" ? "block" : "none" }}
                >
                  <p>Files content goes here.</p>
                </div>
              </div>
            </div>

            <div className="posts">
              <div className="group-posts">
                <h3>Posts:</h3>
                {inforgroup.data && inforgroup.data.length > 0 ? (
                  inforgroup.data.map((post) => (
                    <div key={post.postInfo._id} className="post-item">
                      <Post data={post} />
                    </div>
                  ))
                ) : (
                  <p>There are no posts in this group.</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h1 className="mb-4 text-4xl font-bold">Groups</h1>
          </div>
        );
    }
  };

  const createGroup = async () => {
    const formData = new FormData();
    formData.append("name", group.name);
    formData.append("bio", group.bio);
    formData.append("privacy", group.privacy);

    // Append each file to FormData
    if (group.profilePhoto) {
      for (let i = 0; i < group.profilePhoto.length; i++) {
        formData.append("profilePhoto", group.profilePhoto[i]);
      }
    }

    try {
      const res = await axios.post(
        "http://localhost:9090/api/Group/createGroup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setSuccess(res.data.message);
      setGroup({ name: "", bio: "", profilePhoto: null, privacy: "public" });
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };
  const handleupdateGroup = async () => {
    const formData = new FormData();
    formData.append("groupId", inforgroup.group._id);
    formData.append("name", group.name);
    formData.append("bio", group.bio);
    formData.append("privacy", group.privacy);
    if (group.profilePhoto) {
      for (let i = 0; i < group.profilePhoto.length; i++) {
        formData.append("profilePhoto", group.profilePhoto[i]);
      }
    }
    try {
      const res = await axios.post(
        "http://localhost:9090/api/Group/updateGroup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setIsUpdateGroup(res?.data?.message);

      alert(res?.data?.message);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchListGroup = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9090/api/Group/getGroup",
          { withCredentials: true }
        );
        setListgroup(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchMyGroup = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9090/api/Group/getGroupByUser",
          { withCredentials: true }
        );
        setMygroup(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListGroup();
    fetchMyGroup();
  }, [group, groupId, isLeaveGroup, isDeleteGroup, isUpdateGroup]);
  useEffect(() => {
    const storedGroupId = getGroupIdFromLocalStorage();
    if (storedGroupId) {
      setGroupId(storedGroupId);
    }
  }, []);
  useEffect(() => {
    if (groupId) {
      const fetchGroupById = async () => {
        try {
          const res = await axios.post(
            "http://localhost:9090/api/Group/getGroupById",
            { groupId },
            { withCredentials: true }
          );
          setInforgroup(res.data);
          setGroup({
            ...group,
            name: res.data.group.name,
            bio: res.data.group.profile.bio,
            profilePhoto: res.data.group.profile.profilePhoto,
            privacy: res.data.group.privacy,
          });

          setShowOptions(false);
          setSelectedMember(null);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGroupById();
    }
  }, [groupId, isRemoveMember, isAddAdmin, isUpdateGroup]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex flex-grow pt-16">
        {/* Sidebar for tasks */}
        <aside className="flex flex-col w-1/4 p-4 space-y-2 bg-background-lighter">
          <div className="flex items-center justify-between">
            <h2 className="mb-4 text-4xl font-bold">Groups</h2>
            <button className="self-end mb-4 setting-button">
              <FaCog className="text-xl" />
            </button>
          </div>

          {/* Search Group */}
          <div className="mb-4 search-group">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Group"
              className="search-input"
            />
          </div>

          <div className="divider"></div>

          {/* Task List */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Tasks</h2>
            <ul className="task-list">
              <li>
                <a
                  href="#"
                  className="task-item"
                  onClick={() => handleNavigation("feed")}
                >
                  <FaNewspaper className="task-icon" />
                  <span>Your feed</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="task-item"
                  onClick={() => handleNavigation("suggestions")}
                >
                  <FaLightbulb className="task-icon" />
                  <span>Suggestions</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="task-item"
                  onClick={() => handleNavigation("joins")}
                >
                  <FaUsers className="task-icon" />
                  <span>Your joined groups</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Create Group Button */}
          <div
            className="create-group"
            onClick={() => handleNavigation("create-group")}
          >
            <FaPlusCircle className="create-group-icon" />
            <span>Create Group</span>
          </div>

          {/* Divider Line */}
          <div className="divider"></div>

          {/* Groups You've Joined */}
          <div className="groups-joined">
            <div className="groups-joined-header">
              <h3>Groups you've joined</h3>
              <span className="see-all-button">See all</span>
            </div>
            <div className="groups-joined-list-container">
              {mygroup.map((group) => (
                <ul key={group._id} className="groups-joined-list">
                  <li
                    className="group-item"
                    onClick={() => {
                      setGroupId(group._id);
                      saveGroupIdToLocalStorage(group._id);
                      setTimeout(() => {
                        handleNavigation("group");
                      }, 200);
                    }}
                  >
                    <img
                      src={group.profile.profilePhoto}
                      alt="Group Avatar"
                      className="group-avatar"
                    />
                    <div className="group-info">
                      <span className="group-name">{group.name}</span>
                      <span className="group-description">
                        {group.profile.bio}
                      </span>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex justify-center w-full p-6">
          {getMainContent()}
        </section>
      </main>
    </div>
  );
};

export default Groups;
