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
} from '@fortawesome/free-solid-svg-icons';

const NotificationSettingsPage = () => {
  // State hooks for notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // State to manage selected sidebar item
  const [selectedItem, setSelectedItem] = useState('notificationSettings');

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
    <div className="flex h-screen mt-16">
      {/* Sidebar */}
      <div className="w-1/4 bg-background-lighter text-white p-4 rounded-lg shadow-lg border border-gray-600">
        <h2 className="text-xl font-semibold">Settings & Privacy</h2>

        <div className="mt-4">
          <h3 className="font-medium">Tools and Resources</h3>
          <ul className="mt-2">
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('privacyCheckup')}
            >
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
              Privacy Checkup
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('supervision')}
            >
              <FontAwesomeIcon icon={faUserShield} className="mr-2" />
              Supervision
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('defaultAudience')}
            >
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
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('reactionPreferences')}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Reaction preferences
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('notification')}
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Notification
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('accessibility')}
            >
              <FontAwesomeIcon icon={faUniversalAccess} className="mr-2" />
              Accessibility
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('language')}
            >
              <FontAwesomeIcon icon={faLanguage} className="mr-2" />
              Language and region
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('media')}
            >
              <FontAwesomeIcon icon={faFilm} className="mr-2" />
              Media
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('darkMode')}
            >
              <FontAwesomeIcon icon={faMoon} className="mr-2" />
              Dark mode
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">{selectedItem.replace(/([A-Z])/g, ' $1').trim()}</h1>
        <form>
          {/* Conditional rendering based on selected sidebar item */}
          {selectedItem === 'notificationSettings' && (
            <>
              {/* Email Notifications Checkbox */}
              <div className="mt-4">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                  className="mr-2"
                />
                <label htmlFor="emailNotifications" className="cursor-pointer">Email Notifications</label>
              </div>

              {/* Push Notifications Checkbox */}
              <div className="mt-4">
                <input
                  type="checkbox"
                  id="pushNotifications"
                  checked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                  className="mr-2"
                />
                <label htmlFor="pushNotifications" className="cursor-pointer">Push Notifications</label>
              </div>

              {/* SMS Notifications Checkbox */}
              <div className="mt-4">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  checked={smsNotifications}
                  onChange={() => setSmsNotifications(!smsNotifications)}
                  className="mr-2"
                />
                <label htmlFor="smsNotifications" className="cursor-pointer">SMS Notifications</label>
              </div>

              {/* Save Settings Button */}
              <button
                type="button"
                className="mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover"
                onClick={handleSaveSettings}
              >
                Save Settings
              </button>
            </>
          )}
          {selectedItem === 'privacyCheckup' && <p>Your privacy checkup content goes here.</p>}
          {selectedItem === 'supervision' && <p>Your supervision content goes here.</p>}
          {selectedItem === 'defaultAudience' && <p>Your default audience settings content goes here.</p>}
          {selectedItem === 'reactionPreferences' && <p>Your reaction preferences content goes here.</p>}
          {selectedItem === 'notification' && <p>Your notification preferences content goes here.</p>}
          {selectedItem === 'accessibility' && <p>Your accessibility settings content goes here.</p>}
          {selectedItem === 'language' && <p>Your language and region settings content goes here.</p>}
          {selectedItem === 'media' && <p>Your media settings content goes here.</p>}
          {selectedItem === 'darkMode' && <p>Your dark mode settings content goes here.</p>}
        </form>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
