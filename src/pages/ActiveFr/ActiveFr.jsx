import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineMore } from 'react-icons/ai';
import './ActiveFr.css';

const ActiveFr = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [statusActive, setStatusActive] = useState(true);
  const settingsRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsVisible(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };

  const toggleStatus = () => {
    setStatusActive(!statusActive);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#B48FD9]">Active Friends</h2>
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
                <span className="text-gray-700">Trạng thái hoạt động</span>
                <div
                  onClick={toggleStatus}
                  className={`relative w-16 h-8 flex items-center cursor-pointer rounded-full transition-colors ${statusActive ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  <div
                    className={`absolute w-8 h-8 bg-white rounded-full transition-transform ${statusActive ? 'translate-x-8' : 'translate-x-0'}`}
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
          className={`search-input ${searchVisible ? 'visible' : ''}`}
        />
      </div>
      <div className="active-friends-list mt-4 space-y-4">
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/shadcn.png"
            alt="Friend Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-600">John Doe is online</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/shadcn.png"
            alt="Friend Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-600">Jane Smith is online</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/shadcn.png"
            alt="Friend Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-600">Jane Smith is online</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/shadcn.png"
            alt="Friend Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-600">Jane Smith is online</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/shadcn.png"
            alt="Friend Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-600">Jane Smith is online</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/shadcn.png"
            alt="Friend Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-600">Jane Smith is online</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/shadcn.png"
            alt="Friend Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-600">Jane Smith is online</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/shadcn.png"
            alt="Friend Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-600">Jane Smith is online</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/shadcn.png"
            alt="Friend Avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-600">Alex Johnson is online</p>
        </div>
        {/* Thêm nhiều bạn bè ở đây để kiểm tra thanh cuộn */}
      </div>
    </div>
  );
};

export default ActiveFr;