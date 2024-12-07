import React, { useState, useEffect } from "react";
import "./ShareModal.css"; // Create this CSS file for modal styling
import axios from "axios";
import { Listbox } from "@headlessui/react";

const ShareModal = ({ isOpen, onClose, sharedPostId }) => {
  const [group, setGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [content, setContent] = useState("");
  const [access, setAccess] = useState("public");
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false); // To control the group modal visibility
  const accessOptions = ["public", "private"];
  const [error, setError] = useState(""); // Error state

  // Close modal if `isOpen` is false
  if (!isOpen) return null;

  const formData = new FormData();
  formData.append("content", content);
  formData.append("access", access);
  formData.append("sharedpost", sharedPostId);

  // Handle sharing the post
  const handleShare = async (group) => {
    if (group) formData.append("groupId", group);
    try {
      const response = await axios.post(
        "http://localhost:9090/api/post/createPost",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Share thành công!");
      setContent("");
      setAccess("public");
      onClose();
      setError(""); // Clear error on success
    } catch (error) {
      console.log(error);
      setError("There was an error while sharing the post. Please try again."); // Set a generic error message
    }
  };

  // Fetch groups
  const fetchGroup = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9090/api/Group/getGroupByUser",
        { withCredentials: true }
      );
      setGroup(res.data);
      setError(""); // Clear error if groups are fetched successfully
    } catch (error) {
      console.log(error);
      setError("Failed to load groups. Please try again later.");
    }
  };

  // Toggle the visibility of the group modal
  const handleGroupModalToggle = () => {
    fetchGroup(); // Fetch groups when the modal opens
    setIsGroupModalOpen(!isGroupModalOpen); // Toggle the visibility
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h3 className="text-foreground">Share this post</h3>

        {/* Error message display */}
        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-100 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="flex-1">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-foreground-lighter"
          >
            Content
          </label>
          <textarea
            id="content"
            className="block w-full p-2 mt-1 rounded-md shadow-sm bg-input text-foreground focus:outline-none sm:text-sm"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="w-1/3">
          <label
            htmlFor="access"
            className="block text-sm font-medium text-foreground-lighter"
          >
            Access
          </label>
          <Listbox value={access} onChange={setAccess}>
            <div className="relative mt-1">
              <Listbox.Button className="cursor-pointer relative w-full py-2 pl-3 pr-10 text-left hover:text-foreground hover:bg-dropdown-hover bg-dropdown text-foreground-lighter rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <span className="block truncate">{access}</span>
              </Listbox.Button>
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-input text-foreground-lighter rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {accessOptions.map((option, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ selected }) =>
                      `${
                        selected ? "bg-dropdown-selected" : "bg-dropdown"
                      } hover:bg-dropdown-hover cursor-pointer select-none relative py-2 pl-10 pr-4`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {option}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        <div className="flex justify-between items-center p-4 rounded-md w-full">
          <div className="text-foreground cursor-pointer px-2 py-1">
            Share with Friend
          </div>
          <div className="text-foreground cursor-pointer px-2 py-1" onClick={handleGroupModalToggle}>
            Share in Groups
          </div>
          <div
            className="text-foreground font-bold cursor-pointer hover:underline px-2 py-1"
            onClick={() => handleShare()}
          >
            Share in Feed
          </div>
        </div>
      </div>

      {/* Group Modal */}
      {isGroupModalOpen && (
        <div className="group-modal-overlay" onClick={() => setIsGroupModalOpen(false)}>
          <div className="group-modal-content " onClick={(e) => e.stopPropagation()}>
            <button className="group-modal-close" onClick={() => setIsGroupModalOpen(false)}>
              &times;
            </button>
            <h3 className="text-foreground">Select Group</h3>
            <div className="group-list">
              {group.length === 0 ? (
                <p>No groups available</p>
              ) : (
                group.map((groupItem) => (
                  <div
                    key={groupItem.id}
                    className="group-item cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                    onClick={() => handleShare(groupItem._id)}
                  >
                    {groupItem.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareModal;
