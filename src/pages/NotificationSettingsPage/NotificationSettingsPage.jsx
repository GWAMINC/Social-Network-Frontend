import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faUserShield,
  faGlobe,
  faHeart,
  faBell,
  faUniversalAccess,
  faLanguage,
  faFilm,
  faMoon,
  faLock,
  faUser,
  faUsers,
  faBullhorn,
  faNewspaper,
  faVideo,
  faUserFriends,
  faTag,
  faBan,
  faCreditCard,
  faDollarSign,
  faBriefcase,
  faChartLine,
  faDownload,
  faSyncAlt,
  faSignInAlt,
  faShieldAlt,
  faGavel,
} from '@fortawesome/free-solid-svg-icons';

const NotificationSettingsPage = () => {
  // State hooks for notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Function to handle saving settings
  const handleSaveSettings = () => {
    console.log('Settings saved:', {
      emailNotifications,
      pushNotifications,
      smsNotifications,
    });
    alert('Settings saved successfully!');
  };

  return (
    <div className="h-screen flex bg-background-light">
      {/* Sidebar */}
      <div className="w-1/4 bg-background-lighter text-white p-4 rounded-lg shadow-lg border border-gray-600">
        <h2 className="text-xl font-semibold">Settings & Privacy</h2>

        {/* Tools and Resources Section */}
        <div className="mt-4">
          <h3 className="font-medium">Tools and Resources</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
              Privacy Checkup
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faUserShield} className="mr-2" />
              Supervision
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              Default audience settings
            </li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Preferences Section */}
        <div className="mt-4">
          <h3 className="font-medium">Preferences</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Reaction preferences
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Notification
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faUniversalAccess} className="mr-2" />
              Accessibility
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faLanguage} className="mr-2" />
              Language and region
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faFilm} className="mr-2" />
              Media
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faMoon} className="mr-2" />
              Dark mode
            </li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Audience and Visibility Section */}
        <div className="mt-4">
          <h3 className="font-medium">Audience and Visibility</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Profile locking
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile details
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              How people can find and contact you
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
              Post
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
              Stories
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faFilm} className="mr-2" />
              Reels
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
              Followers and public content
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              Profile and tagging
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faBan} className="mr-2" />
              Blocking
            </li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Payments Section */}
        <div className="mt-4">
          <h3 className="font-medium">Payments</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
              Ads payments
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              Add cards
            </li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Your Activity Section */}
        <div className="mt-4">
          <h3 className="font-medium">Your Activity</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
              Activity log
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              Apps and websites
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
              Business integrations
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              WTF?
            </li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Your Information Section */}
        <div className="mt-4">
          <h3 className="font-medium">Your Information</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Access your information
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
              Download your information
            </li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">
              <FontAwesomeIcon icon={faGavel} className="mr-2" />
              Request your information
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold">Notification Settings</h1>
        <div className="mt-4">
          <h2 className="text-lg font-medium">Manage Your Notifications</h2>
          <div className="mt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="mr-2"
              />
              Email Notifications
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
                className="mr-2"
              />
              Push Notifications
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={smsNotifications}
                onChange={() => setSmsNotifications(!smsNotifications)}
                className="mr-2"
              />
              SMS Notifications
            </label>
          </div>
          <button
            onClick={handleSaveSettings}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
