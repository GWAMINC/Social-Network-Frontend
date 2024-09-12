import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/layouts/Navbar";
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
  const [groupId, setGroupId] = useState(null);
  const [inforgroup, setInforgroup] = useState(null);
  // Hàm để điều hướng và cập nhật URL
  const handleNavigation = (content) => {
    navigate(`/groups/${content}`);
  };
  // Function to save groupId to localStorage
  const saveGroupIdToLocalStorage = (id) => {
    localStorage.setItem("groupId", id);
  };

  // Function to retrieve groupId from localStorage
  const getGroupIdFromLocalStorage = () => {
    return localStorage.getItem("groupId");
  };
  // Xác định nội dung chính dựa trên URL
  const getMainContent = () => {
    const path = location.pathname.split("/").pop(); // Lấy phần cuối của URL
    switch (path) {
      case "feed":
        return (
          <div>
            <h1 className="text-4xl font-bold mb-4">Your Feed</h1>
            {/* Nội dung bài post sẽ được hiển thị ở đây */}
            <div className="post-list">
              {/* Ví dụ nội dung bài post */}
              <div className="post-item">
                <h2 className="text-2xl font-bold">Post Title</h2>
                <p className="text-lg">This is a sample post content.</p>
              </div>
              {/* Thêm các bài post khác ở đây */}
            </div>
          </div>
        );
      case "suggestions":
        return (
          <div className="w-1/2">
            <h1 className="text-4xl font-bold mb-4">Suggestions</h1>
            <div className="groups-joined-list-container">
              {listgroup.map((group) => (
                <ul key={group._id} className="groups-joined-list">
                  <li className="group-item">
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
        );
      case "joins":
        return (
          <div className="w-1/2">
            <h1 className="text-4xl font-bold mb-4">Your Joined Groups</h1>
            <div className="groups-joined-list-container">
              {mygroup.map((group) => (
                <ul key={group._id} className="groups-joined-list">
                  <li
                    className="group-item"
                    onClick={() => {
                      setGroupId(group._id);
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
        );
      case "create-group":
        return (
          <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-6 text-center text-white">
              Create Group
            </h1>
            <form onSubmit={createGroup} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold text-white"
                >
                  Group Name:
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={group.name}
                  onChange={(e) => setGroup({ ...group, name: e.target.value })}
                  className="mt-1 block w-full p-3  border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-lg font-semibold text-white"
                >
                  Bio:
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  value={group.bio}
                  onChange={(e) => setGroup({ ...group, bio: e.target.value })}
                  className="mt-1 block w-full p-3  border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="profilePhoto"
                  className="block text-lg font-semibold text-white"
                >
                  Profile Photo:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setGroup({ ...group, profilePhoto: e.target.files })
                  }
                  className="mt-1 block w-full text-sm text-gray-300 file:border file:border-gray-600 file:bg-gray-900 file:text-white file:py-2 file:px-4 file:rounded-md hover:file:bg-gray-800"
                />
              </div>
              <div>
                <label
                  htmlFor="privacy"
                  className="block text-lg font-semibold text-white"
                >
                  Privacy:
                </label>
                <select
                  id="privacy"
                  value={group.privacy}
                  onChange={(e) =>
                    setGroup({ ...group, privacy: e.target.value })
                  }
                  className="mt-1 block w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Group
              </button>
            </form>
            {error && <p className="mt-4 text-red-400">{error}</p>}
            {success && <p className="mt-4 text-green-400">{success}</p>}
          </div>
        );
        case "group":
          if (!inforgroup) {
            return <div>Loading...</div>; // or some loading indicator
          }
        
          return (
            <div className="group-details w-1/2">
              <h2 className="text-2xl font-bold mb-4">{inforgroup.group.name}</h2>
              <div className="group-profile flex items-center mb-4">
                <img
                  src={inforgroup.group.profile.profilePhoto || "default-photo.jpg"}
                  alt="Group Avatar"
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div className="group-info">
                  <p className="mb-1">Bio: {inforgroup.group.profile.bio}</p>
                  <p className="mb-1">Privacy: {inforgroup.group.privacy}</p>
                  <p className="mb-1">
                    Created At: {new Date(inforgroup.group.createdAt).toLocaleString()}
                  </p>
                  <p className="mb-1">
                    Updated At: {new Date(inforgroup.group.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="group-admin mb-4">
                <h3 className="text-lg font-semibold mb-2">Admin:</h3>
                {inforgroup.group.admin &&
                  inforgroup.group.admin.length > 0 &&
                  inforgroup.group.admin.map((admin) => (
                    <div key={admin._id} className="flex items-center mb-2">
                      <img
                        src={admin.profile.profilePhoto || "default-photo.jpg"}
                        alt="Admin Avatar"
                        className="w-10 h-10 rounded-full object-cover mr-2"
                      />
                      <p>{admin.name}</p>
                    </div>
                  ))}
              </div>
              <div className="group-members">
                <h3 className="text-lg font-semibold mb-2">Members:</h3>
                {inforgroup.group.members &&
                  inforgroup.group.members.length > 0 &&
                  inforgroup.group.members.map((member) => (
                    <div key={member._id} className="flex items-center mb-2">
                      <img
                        src={member.profile.profilePhoto || "default-photo.jpg"}
                        alt="Member Avatar"
                        className="w-10 h-10 rounded-full object-cover mr-2"
                      />
                      <p>{member.name}</p>
                    </div>
                  ))}
              </div>
              <div className="group-posts mt-8 text-gray-800">
                <h3 className="text-lg font-semibold mb-2 text-gray-50">Posts:</h3>
                {inforgroup.data && inforgroup.data.length > 0 ? (
                  inforgroup.data.map((post) => (
                    <div key={post.postInfo._id} className="mb-4 p-4 border rounded">
                      <Post data={post} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-50">There are no posts in this group.</p>
                )}
              </div>
            </div>
          );
        
      default:
        return (
          <div>
            <h1 className="text-4xl font-bold mb-4">Groups</h1>
          </div>
        );
    }
  };

  const createGroup = async (e) => {
    e.preventDefault();

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
  }, [group]);
  useEffect(() => {
    // Check localStorage for groupId
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
          console.log(res.data);
          setInforgroup(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGroupById();
    }
  }, [groupId]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="flex-shrink-0">
        <Navbar />
      </header>
      <main className="flex-grow flex pt-16">
        {/* Sidebar for tasks */}
        <aside className="w-1/4 bg-gray-800 p-4 flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold mb-4">Groups</h2>
            <button className="setting-button mb-4 self-end">
              <FaCog className="text-xl" />
            </button>
          </div>

          {/* Search Group */}
          <div className="search-group mb-4">
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
            <h2 className="text-xl font-bold mb-4">Tasks</h2>
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
                      saveGroupIdToLocalStorage(group._id)
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
        <section className="w-full flex justify-center p-6">
          {getMainContent()}
        </section>
      </main>
    </div>
  );
};

export default Groups;
