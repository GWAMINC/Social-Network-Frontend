import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const tabs = [
  { name: "Relationship" },
  { name: "Social links" },
  { name: "Home town" },
  { name: "Education" },
  { name: "Work" },
];

const ProfileContent = ({ user, currentUserId }) => {
  const [profile, setProfile] = useState({
    personalWebsite: [],
    relationship: [],
    city: "",
    address: "",
    education: "",
    job: "",
  });
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [links, setLinks] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newRelationship, setNewRelationship] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [showRelationshipForm, setShowRelationshipForm] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        personalWebsite: user?.profile?.PersonalWebsite || [],
        relationship: user?.profile?.relationship || [],
        city: user?.profile?.city || "",
        address: user?.profile?.address || "",
        education: user?.profile?.education || "",
        job: user?.profile?.job || "",
      });
      setLinks(user?.profile?.PersonalWebsite || []);
      setRelationships(user?.profile?.relationship || []);
    }
  }, [user]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const addLink = (e) => {
    e.preventDefault();
    if (newLink && newLink.trim()) {
      const updatedLinks = [...links, newLink];
      setLinks(updatedLinks);
      setProfile((prev) => ({ ...prev, personalWebsite: updatedLinks }));
      setHasChanges(true);
      setNewLink("");
      setShowLinkForm(false);
    }
  };

  const addRelationship = (e) => {
    e.preventDefault();
    if (newRelationship && newRelationship.trim()) {
      const updatedRelationships = [...relationships, newRelationship];
      setRelationships(updatedRelationships);
      setProfile((prev) => ({ ...prev, relationship: updatedRelationships }));
      setHasChanges(true);
      setNewRelationship("");
      setShowRelationshipForm(false);
    }
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    setProfile((prev) => ({ ...prev, personalWebsite: updatedLinks }));
    setHasChanges(true);
  };

  const removeRelationship = (index) => {
    const updatedRelationship = relationships.filter((_, i) => i !== index);
    setRelationships(updatedRelationship);
    setProfile((prev) => ({ ...prev, relationship: updatedRelationship }));
    setHasChanges(true);
  };

  const startEditRelationship = (index) => {
    setEditIndex(index);
    setEditValue(relationships[index]);
  };

  const saveEditRelationship = (index) => {
    const updatedRelationships = [...relationships];
    updatedRelationships[index] = editValue;
    setProfile((prev) => ({ ...prev, relationship: updatedRelationships }));
    setHasChanges(true);
    setEditIndex(null);
  };

  const startEditLink = (index) => {
    setEditIndex(index);
    setEditValue(links[index]);
  };

  const saveEditLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks[index] = editValue;
    setLinks(updatedLinks);
    setProfile((prev) => ({ ...prev, personalWebsite: updatedLinks }));
    setHasChanges(true);
    setEditIndex(null);
  };

  const saveProfileChanges = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/user/profile/update`, profile, {
        withCredentials: true,
      });
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="profile-content p-4">
      <div className="mb-4">
        {currentUserId === user?._id && hasChanges && (
          <button
            onClick={saveProfileChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Lưu thay đổi
          </button>
        )}
      </div>
      <div className="tabs">
        {tabs.map((tab) => (
          <Button
            key={tab.name}
            className={`tab-button w-1/5 text-foreground ${
              activeTab === tab.name ? "active" : ""
            }`}
            variant="secondary"
            onClick={() => handleTabClick(tab.name)}
          >
            {tab.name}
          </Button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === "Relationship" && (
          <div>
            <p className="font-semibold">Relationship:</p>
            {relationships.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-300 flex justify-between items-center py-2"
              >
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="bg-transparent border-0 outline-none text-inherit flex-1 p-2"
                    />
                    <div>
                      <button
                        onClick={() => saveEditRelationship(index)}
                        className="text-blue-500 mx-1"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        className="text-red-500 mx-1"
                      >
                        Hủy
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="flex-1">{item}</p>
                    <div>
                      {currentUserId === user?._id && (
                        <button
                          onClick={() => startEditRelationship(index)}
                          className="text-blue-500 mx-1"
                        >
                          Sửa
                        </button>
                      )}
                      {currentUserId === user?._id && (
                        <button
                          onClick={() => removeRelationship(index)}
                          className="text-red-500 mx-1"
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
            {currentUserId === user?._id && (
              <button
                onClick={() => setShowRelationshipForm(true)}
                className="text-blue-500 mt-2"
              >
                Thêm liên kết
              </button>
            )}
          </div>
        )}
        {activeTab === "Social links" && (
          <div>
            <p className="font-semibold">Social Links:</p>
            {links.map((link, index) => (
              <div
                key={index}
                className="border-b border-gray-300 flex justify-between items-center py-2"
              >
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="bg-transparent border-0 outline-none text-inherit flex-1 p-2"
                    />
                    <div>
                      <button
                        onClick={() => saveEditLink(index)}
                        className="text-blue-500 mx-1"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        className="text-red-500 mx-1"
                      >
                        Hủy
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="flex-1">{link}</p>
                    <div>
                      {currentUserId === user?._id && (
                        <button
                          onClick={() => startEditLink(index)}
                          className="text-blue-500 mx-1"
                        >
                          Sửa
                        </button>
                      )}
                      {currentUserId === user?._id && (
                        <button
                          onClick={() => removeLink(index)}
                          className="text-red-500 mx-1"
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
            {currentUserId === user?._id && (
              <button
                onClick={() => setShowLinkForm(true)}
                className="text-blue-500 mt-2"
              >
                Thêm liên kết
              </button>
            )}
          </div>
        )}
        {activeTab === "Home town" && (
          <div>
            <p className="font-semibold">City:</p>
            {currentUserId === user?._id ? (
              <input
                type="text"
                value={profile.city}
                onChange={(e) => {
                  setProfile((prev) => ({ ...prev, city: e.target.value }));
                  setHasChanges(true);
                }}
                className="bg-transparent border-0 outline-none text-inherit p-2 mb-2"
                placeholder="Nhập thành phố"
              />
            ) : (
              <p>{profile.city}</p>
            )}

            <p className="font-semibold">Address:</p>
            {currentUserId === user?._id ? (
              <input
                type="text"
                value={profile.address}
                onChange={(e) => {
                  setProfile((prev) => ({ ...prev, address: e.target.value }));
                  setHasChanges(true);
                }}
                className="bg-transparent border-0 outline-none text-inherit p-2"
                placeholder="Nhập địa chỉ"
              />
            ) : (
              <p>{profile.address}</p>
            )}
          </div>
        )}
        {activeTab === "Education" && (
          <div>
            <p className="font-semibold">School/University:</p>
            {currentUserId === user?._id ?<input
              type="text"
              value={profile.education}
              onChange={(e) => {
                setProfile((prev) => ({
                  ...prev,
                  education: e.target.value,
                }));
                setHasChanges(true);
              }}
              className="bg-transparent border-0 outline-none text-inherit p-2 mb-2"
              placeholder="Nhập trường/đại học"
            />:<p>{profile.education}</p>}
            
          </div>
        )}
        {activeTab === "Work" && (
          <div>
            <p className="font-semibold">Job:</p>
            {currentUserId === user?._id ?<input
              type="text"
              value={profile.job}
              onChange={(e) => {
                setProfile((prev) => ({ ...prev, job: e.target.value }));
                setHasChanges(true);
              }}
              className="bg-transparent border-0 outline-none text-inherit p-2 mb-2"
              placeholder="Nhập công việc"
            />:<p>{profile.job}</p>}
            
          </div>
        )}
      </div>

      {/* Fixed forms for adding new links and relationships */}
      {showLinkForm && (
        <form
          onSubmit={addLink}
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
        >
          <div className="p-4 bg-white shadow-md rounded-lg max-w-sm mx-auto">
            <h3 className="text-lg secondary text-black font-semibold mb-3">
              Thêm liên kết
            </h3>
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="border p-2 rounded w-full text-slate-800"
              placeholder="Nhập liên kết mới"
              required
            />
            <button
              type="submit"
              className="mt-3 w-full px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
            <div
              onClick={() => setShowLinkForm(false)}
              className="mt-3 text-center text-blue-500 cursor-pointer hover:underline text-sm"
            >
              Close
            </div>
          </div>
        </form>
      )}

      {showRelationshipForm && (
        <form
          onSubmit={addRelationship}
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50"
        >
          <div className="p-4 bg-white shadow-md rounded-lg max-w-sm mx-auto">
            <h3 className="text-lg text-black  font-semibold mb-3">
              Thêm mối quan hệ
            </h3>
            <input
              type="text"
              value={newRelationship}
              onChange={(e) => setNewRelationship(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Nhập mối quan hệ mới"
              required
            />
            <button
              type="submit"
              className="mt-3 w-full px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
            <div
              onClick={() => setShowRelationshipForm(false)}
              className="mt-3 text-center text-blue-500 cursor-pointer hover:underline text-sm"
            >
              Close
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileContent;
