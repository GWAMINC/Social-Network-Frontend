import React, { useEffect, useState } from "react";
import "./ProfileTabs.css";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import Post from "../Post";
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};
const ProfileTabs = ({ profile }) => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [relationshipStatus, setRelationshipStatus] = useState("Single");
  const [posts, setPosts] = useState();
  const userId = profile?._id;
  const tabs = ["Posts", "About", "Friends", "Follow", "Photos", "More"];
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.post(
        "http://localhost:9090/api/post/getPostCurrentUser",
        { userId },
        { withCredentials: true }
      );
      setPosts(res.data.reverse());
    };
    fetchPost();
  }, [userId]);
  return (
    <div>
      <div className="profile-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Nội dung tương ứng với từng tab */}
      <div className="tab-content">
        {activeTab === "Posts" && (
          <div>
            {posts && posts.map((post) => <Post data={post} key={post._id} />)}
          </div>
        )}
        {activeTab === "About" && (
          <div>
            <div>
              <h3>Birthday: </h3>
              <div>{formatDate(profile.profile.birthDate)}</div>
            </div>
            <div>
              <h3>Relationship Status</h3>
              <div className="relationship-options">
                <button
                  className={relationshipStatus === "Single" ? "active" : ""}
                  onClick={() => setRelationshipStatus("Single")}
                >
                  Single
                </button>
                <button
                  className={
                    relationshipStatus === "In relationship" ? "active" : ""
                  }
                  onClick={() => setRelationshipStatus("In relationship")}
                >
                  In relationship
                </button>
                <button
                  className={relationshipStatus === "Vague" ? "active" : ""}
                  onClick={() => setRelationshipStatus("Vague")}
                >
                  Vague
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Friends" && (
          <div className="p-4">
            {profile?.isFriend.map((friend) => (
              <div
                key={friend._id}
                className="flex items-center p-2 border-b border-gray-200"
              >
                <Avatar className="w-12 h-12">
                  {friend?.profile?.profilePhoto ? (
                    <AvatarImage
                      src={friend?.profile?.profilePhoto}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="w-full h-full flex items-center justify-center text-white bg-slate-500 rounded-full text-lg font-bold">
                      {friend.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="ml-4 text-lg font-medium text-gray-800">
                  {friend.name}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "Follow" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h1 className="text-lg font-bold mb-2">Đang theo dõi</h1>
              <div>
                {profile?.following.map((follower) => (
                  <div
                    key={follower._id}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Avatar>
                      {follower?.profile?.profilePhoto ? (
                        <AvatarImage
                          src={follower?.profile?.profilePhoto}
                          alt="Avatar"
                          className="rounded-full w-8 h-8"
                        />
                      ) : (
                        <AvatarFallback className="rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600">
                          {follower.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>{follower.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold mb-2">Được theo dõi</h1>
              <div>
                {profile?.isFollowed.map((follower) => (
                  <div
                    key={follower._id}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Avatar>
                      {follower?.profile?.profilePhoto ? (
                        <AvatarImage
                          src={follower?.profile?.profilePhoto}
                          alt="Avatar"
                          className="rounded-full w-8 h-8"
                        />
                      ) : (
                        <AvatarFallback className="rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600">
                          {follower.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>{follower.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Photos" && (
          <div className="grid">
            {posts &&
              posts
                .filter((post) => post.postInfo.images.length > 0)
                .flatMap((post) =>
                  post.postInfo.images.map((image, index) => (
                    <div key={`${post._id}-${index}`} className="grid-item">
                      <img src={image} alt="photo" />
                    </div>
                  ))
                )}
          </div>
        )}

        {activeTab === "More" && <div>More content here.</div>}
      </div>
    </div>
  );
};

export default ProfileTabs;
