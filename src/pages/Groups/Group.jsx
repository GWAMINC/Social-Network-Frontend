import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/layouts/Navbar";
import { FaCog, FaSearch, FaNewspaper, FaLightbulb, FaUsers, FaPlusCircle } from "react-icons/fa";
import "./Group.css";

const Groups = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hàm để điều hướng và cập nhật URL
  const handleNavigation = (content) => {
    navigate(`/groups/${content}`);
  };

  // Xác định nội dung chính dựa trên URL
  const getMainContent = () => {
    const path = location.pathname.split('/').pop(); // Lấy phần cuối của URL
    switch (path) {
      case 'feed':
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
      case 'suggestions':
        return (
          <div>
            <h1 className="text-4xl font-bold mb-4">Suggestions</h1>
            {/* Nội dung gợi ý sẽ được hiển thị ở đây */}
          </div>
        );
      case 'joins':
        return (
          <div>
            <h1 className="text-4xl font-bold mb-4">Your Joined Groups</h1>
            {/* Nội dung nhóm đã tham gia sẽ được hiển thị ở đây */}
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="flex-shrink-0">
        <Navbar />
      </header>
      <main className="flex-grow flex pt-16">
        {/* Sidebar for tasks */}
        <aside className="w-1/4 bg-gray-800 p-4 flex flex-col space-y-4">
          <h2 className="text-4xl font-bold mb-4">Groups</h2>
          <button className="setting-button mb-4 self-end">
            <FaCog className="text-xl" />
          </button>

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
          <div className="create-group">
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
              <ul className="groups-joined-list">
                <li className="group-item">
                  <img
                    src="https://via.placeholder.com/40" 
                    alt="Group Avatar"
                    className="group-avatar"
                  />
                  <div className="group-info">
                    <span className="group-name">Ổ Quỷ 1</span>
                    <span className="group-description">Quỷ nhưng mà yêu nước</span>
                  </div>
                </li>
                <li className="group-item">
                  <img
                    src="https://via.placeholder.com/40" 
                    alt="Group Avatar"
                    className="group-avatar"
                  />
                  <div className="group-info">
                    <span className="group-name">Ổ Quỷ 1</span>
                    <span className="group-description">Quỷ nhưng mà yêu nước</span>
                  </div>
                </li>
                <li className="group-item">
                  <img
                    src="https://via.placeholder.com/40" 
                    alt="Group Avatar"
                    className="group-avatar"
                  />
                  <div className="group-info">
                    <span className="group-name">Ổ Quỷ 1</span>
                    <span className="group-description">Quỷ nhưng mà yêu nước</span>
                  </div>
                </li>
                <li className="group-item">
                  <img
                    src="https://via.placeholder.com/40" 
                    alt="Group Avatar"
                    className="group-avatar"
                  />
                  <div className="group-info">
                    <span className="group-name">Ổ Quỷ 1</span>
                    <span className="group-description">Quỷ nhưng mà yêu nước</span>
                  </div>
                </li>
                <li className="group-item">
                  <img
                    src="https://via.placeholder.com/40" 
                    alt="Group Avatar"
                    className="group-avatar"
                  />
                  <div className="group-info">
                    <span className="group-name">Ổ Quỷ 1</span>
                    <span className="group-description">Quỷ nhưng mà yêu nước</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-grow p-6">
          {getMainContent()}
        </section>
      </main>
    </div>
  );
};

export default Groups;
