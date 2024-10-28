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
      <div className="w-1/6 bg-background-lighter text-white p-4 rounded-lg shadow-lg border border-gray-600">
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

        <div className="mt-4">
          <h3 className="font-medium">Audience and Visibility</h3>
          <ul className="mt-2">
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('profileLocking')}
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Profile locking
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('profileDetails')}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile details
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('findContact')}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              How people can find and contact you
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('postVisibility')}
            >
              <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
              Post
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('storyVisibility')}
            >
              <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
              Stories
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('reelVisibility')}
            >
              <FontAwesomeIcon icon={faFilm} className="mr-2" />
              Reels
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('followersContent')}
            >
              <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
              Followers and public content
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('profileTagging')}
            >
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              Profile and tagging
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('blocking')}
            >
              <FontAwesomeIcon icon={faBan} className="mr-2" />
              Blocking
            </li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>
        <div className="mt-4">
          <h3 className="font-medium">Payments</h3>
          <ul className="mt-2">
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('adsPayments')}
            >
              <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
              Ads payments
            </li>
            <li
              className="mb-2 text-gray-300 cursor-pointer hover:underline"
              onClick={() => setSelectedItem('addCards')}
            >
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
              <li
                className="mb-2 text-gray-300 cursor-pointer hover:underline"
                onClick={() => setSelectedItem('activityLog')}
              >
                <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                Activity log
              </li>
              <li
                className="mb-2 text-gray-300 cursor-pointer hover:underline"
                onClick={() => setSelectedItem('appsAndWebsites')}
              >
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                Apps and websites
              </li>
              <li
                className="mb-2 text-gray-300 cursor-pointer hover:underline"
                onClick={() => setSelectedItem('businessIntegrations')}
              >
                <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                Business integrations
              </li>
              <li
                className="mb-2 text-gray-300 cursor-pointer hover:underline"
                onClick={() => setSelectedItem('wtf')}
              >
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
              <li
                className="mb-2 text-gray-300 cursor-pointer hover:underline"
                onClick={() => setSelectedItem('accessYourInformation')}
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Access your information
              </li>
              <li
                className="mb-2 text-gray-300 cursor-pointer hover:underline"
                onClick={() => setSelectedItem('downloadYourInformation')}
              >
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Download your information
              </li>
              <li
                className="mb-2 text-gray-300 cursor-pointer hover:underline"
                onClick={() => setSelectedItem('requestYourInformation')}
              >
                <FontAwesomeIcon icon={faGavel} className="mr-2" />
                Request your information
              </li>
            </ul>
            <hr className="my-2 border-gray-600" />
          </div>

          <div className="mt-4">
            <h3 className="font-medium">Community Standards and Legal Policies</h3>
            <ul className="mt-2">
              <li
                className="mb-2 text-gray-300 cursor-pointer hover:underline"
                onClick={() => setSelectedItem('standardOption1')}
              >
                Standard Option 1
              </li>
              <li
                className="mb-2 text-gray-300 cursor-pointer hover:underline"
                onClick={() => setSelectedItem('standardOption2')}
              >
                Standard Option 2
              </li>
            </ul>
            <hr className="my-2 border-gray-600" />
          </div>
      </div>

      {/* Main Content */}
      <div className="w-5/6 p-4 bg-gray-900 text-white rounded-lg shadow-lg mx-auto">
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
          {selectedItem === 'reactionPreferences' && (
            <div>
              <h4 className="font-semibold text-xl">Reaction Preferences</h4>
              <p className="text-gray-400 mt-2">Choose how you want to react to posts and comments:</p>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Your Reactions:</h5>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      👍 Like
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      ❤️ Love
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      😂 Haha
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      😮 Wow
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      😢 Sad
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      😡 Angry
                    </label>
                  </li>
                </ul>
              </div>
              
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Save Reaction Preferences
              </button>
            </div>
          )}

          {selectedItem === 'notification' && (
            <div>
              <h4 className="font-semibold text-xl">Notification Preferences</h4>
              <p className="text-gray-400 mt-2">Adjust your notification settings to control how and when you receive updates:</p>
              
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Notification Methods:</h5>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Send me notifications via Email
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Send me notifications via SMS
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Push notifications to my mobile app
                  </label>
                </div>
              </div>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Frequency of Notifications:</h5>
                <ul className="list-disc list-inside mt-2">
                  <li>
                    <label className="flex items-center">
                      <input type="radio" name="notificationFrequency" value="immediate" className="mr-2" />
                      Immediate notifications
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center">
                      <input type="radio" name="notificationFrequency" value="daily" className="mr-2" />
                      Daily summary
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center">
                      <input type="radio" name="notificationFrequency" value="weekly" className="mr-2" />
                      Weekly summary
                    </label>
                  </li>
                </ul>
              </div>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Notification Types:</h5>
                <div className="mt-2 space-y-1">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Friend requests
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Comments on my posts
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Mentions in comments
                  </label>
                </div>
              </div>

              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Save Notification Preferences
              </button>
            </div>
          )}

          {selectedItem === 'accessibility' && (
            <div>
              <h4 className="font-semibold text-xl">Accessibility Settings</h4>
              <p className="text-gray-400 mt-2">Configure accessibility options for your account to improve your experience:</p>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Text Size:</h5>
                <select className="mt-2 p-2 border rounded w-full">
                  <option value="default">Default</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Contrast Settings:</h5>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Enable high contrast mode
                </label>
              </div>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Screen Reader:</h5>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Enable screen reader support
                </label>
              </div>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Keyboard Shortcuts:</h5>
                <p className="text-gray-400">You can customize your keyboard shortcuts for faster navigation:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Press <kbd>Alt</kbd> + <kbd>H</kbd> to go to Home</li>
                  <li>Press <kbd>Alt</kbd> + <kbd>P</kbd> to create a new post</li>
                  <li>Press <kbd>Alt</kbd> + <kbd>M</kbd> to view messages</li>
                </ul>
              </div>

              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Save Accessibility Settings
              </button>
            </div>
          )}

        {selectedItem === 'language' && (
            <div>
              <h4 className="font-semibold text-xl">Language and Region Settings</h4>
              <p className="text-gray-400 mt-2">Select your preferred language and region:</p>
              
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Preferred Language:</h5>
                <select className="mt-2 p-2 border rounded w-full">
                  <option value="english">English</option>
                  <option value="vietnamese">Tiếng Việt</option>
                  <option value="spanish">Español</option>
                  <option value="french">Français</option>
                </select>
              </div>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Region Settings:</h5>
                <select className="mt-2 p-2 border rounded w-full">
                  <option value="us">United States</option>
                  <option value="vn">Vietnam</option>
                  <option value="es">Spain</option>
                  <option value="fr">France</option>
                </select>
              </div>

              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Save Language Settings
              </button>
            </div>
          )}

          {selectedItem === 'media' && (
            <div>
              <h4 className="font-semibold text-xl">Media Settings</h4>
              <p className="text-gray-400 mt-2">Manage your media preferences for a better experience:</p>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Image Quality:</h5>
                <select className="mt-2 p-2 border rounded w-full">
                  <option value="auto">Auto</option>
                  <option value="high">High Quality</option>
                  <option value="medium">Medium Quality</option>
                  <option value="low">Low Quality</option>
                </select>
              </div>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Video Preferences:</h5>
                <label className="flex items-center mt-2">
                  <input type="checkbox" className="mr-2" />
                  Auto-play videos
                </label>
                <label className="flex items-center mt-1">
                  <input type="checkbox" className="mr-2" />
                  Play videos with sound
                </label>
              </div>

              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Save Media Preferences
              </button>
            </div>
          )}

          {selectedItem === 'darkMode' && (
            <div>
              <h4 className="font-semibold text-xl">Dark Mode Settings</h4>
              <p className="text-gray-400 mt-2">Enable or disable dark mode for your viewing experience:</p>

              <div className="mt-4 bg-gray-800 p-4 rounded-lg flex items-center">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Enable Dark Mode
                </label>
              </div>

              <p className="text-gray-400 mt-2">You can switch between light and dark modes anytime based on your preference.</p>

              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                Save Dark Mode Settings
              </button>
            </div>
          )}
          {selectedItem === '' && (
            <div className="text-center">
              <h4 className="font-semibold text-xl">Welcome!</h4>
              <p className="text-gray-400 mt-2">Select an option from the left to see the details here.</p>
            </div>
          )}

          {selectedItem === 'privacyCheckup' && (
            <div>
              <h4 className="font-semibold text-xl">Privacy Checkup</h4>
              <p className="text-gray-400 mt-2">Your privacy checkup content goes here. Here you can review your privacy settings and make adjustments.</p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Current Settings:</h5>
                <ul className="list-disc list-inside mt-2">
                  <li>Profile visibility: Friends</li>
                  <li>Post visibility: Public</li>
                  <li>Friend requests: Everyone</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Update Privacy Settings
                </button>
              </div>
            </div>
          )}

          {selectedItem === 'supervision' && (
            <div>
              <h4 className="font-semibold text-xl">Supervision Settings</h4>
              <p className="text-gray-400 mt-2">Your supervision content goes here. Manage who can see your posts and how you interact with others.</p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Visibility Settings:</h5>
                <ul className="list-disc list-inside mt-2">
                  <li>Who can see your posts: Friends</li>
                  <li>Comment settings: Friends only</li>
                  <li>Message requests: Friends of friends</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Update Supervision Settings
                </button>
              </div>
            </div>
          )}
          {selectedItem === 'defaultAudience' && (
            <div>
              <h4 className="font-semibold text-xl">Default Audience Settings</h4>
              <p className="text-gray-400 mt-2">
                Set who can see your posts by default. Choose your preferred audience for all future posts.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Current Default Audience:</h5>
                <p className="mt-2">Public</p>
                <h5 className="font-medium mt-4">Select a New Default Audience:</h5>
                <div className="flex flex-col mt-2">
                  <label className="cursor-pointer">
                    <input type="radio" name="audience" value="public" className="mr-2" />
                    Public
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="audience" value="friends" className="mr-2" />
                    Friends
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="audience" value="onlyMe" className="mr-2" />
                    Only Me
                  </label>
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Save Default Audience
                </button>
              </div>
            </div>
          )}

          {/* Reaction Preferences */}
          {selectedItem === 'reactionPreferences' && (
            <div>
              <h4 className="font-semibold text-xl">Reaction Preferences</h4>
              <p className="text-gray-400 mt-2">
                Choose how you want to react to content on the platform. Customize your reaction options.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Current Reaction Preferences:</h5>
                <ul className="list-disc list-inside mt-2">
                  <li>Like 👍</li>
                  <li>Love ❤️</li>
                  <li>Haha 😂</li>
                  <li>Wow 😮</li>
                  <li>Sad 😢</li>
                  <li>Angry 😡</li>
                </ul>
                <h5 className="font-medium mt-4">Customize Your Reactions:</h5>
                <div className="flex flex-col mt-2">
                  <label className="cursor-pointer">
                    <input type="checkbox" className="mr-2" />
                    Enable 'Support' reaction 🤝
                  </label>
                  <label className="cursor-pointer">
                    <input type="checkbox" className="mr-2" />
                    Enable 'Celebrate' reaction 🎉
                  </label>
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Update Reaction Preferences
                </button>
              </div>
            </div>
          )}
          {selectedItem === 'notification' && (
            <div>
              <h4 className="font-semibold text-xl">Notification Preferences</h4>
              <p className="text-gray-400 mt-2">
                Adjust your notification settings for a better experience. Choose how and when you want to be notified.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Current Notification Settings:</h5>
                <ul className="list-disc list-inside mt-2">
                  <li>Email Notifications: <strong>Enabled</strong></li>
                  <li>Push Notifications: <strong>Enabled</strong></li>
                  <li>SMS Notifications: <strong>Disabled</strong></li>
                </ul>
                <h5 className="font-medium mt-4">Customize Your Notifications:</h5>
                <div className="flex flex-col mt-2">
                  <label className="cursor-pointer">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Email Notifications for Friend Requests
                  </label>
                  <label className="cursor-pointer">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Push Notifications for Comments
                  </label>
                  <label className="cursor-pointer">
                    <input type="checkbox" className="mr-2" />
                    SMS Notifications for Messages
                  </label>
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Save Notification Preferences
                </button>
              </div>
            </div>
          )}

          {/* Accessibility Settings */}
          {selectedItem === 'accessibility' && (
            <div>
              <h4 className="font-semibold text-xl">Accessibility Settings</h4>
              <p className="text-gray-400 mt-2">
                Configure settings to improve accessibility for your account. Customize how you interact with the platform.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Current Accessibility Options:</h5>
                <ul className="list-disc list-inside mt-2">
                  <li>Text Size: <strong>Medium</strong></li>
                  <li>High Contrast Mode: <strong>Disabled</strong></li>
                  <li>Screen Reader: <strong>Enabled</strong></li>
                </ul>
                <h5 className="font-medium mt-4">Customize Your Accessibility Settings:</h5>
                <div className="flex flex-col mt-2">
                  <label className="cursor-pointer">
                    <input type="radio" name="textSize" value="small" className="mr-2" />
                    Small Text Size
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="textSize" value="medium" className="mr-2" defaultChecked />
                    Medium Text Size
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="textSize" value="large" className="mr-2" />
                    Large Text Size
                  </label>
                  <label className="cursor-pointer">
                    <input type="checkbox" className="mr-2" />
                    Enable High Contrast Mode
                  </label>
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Update Accessibility Settings
                </button>
              </div>
            </div>
          )}
          {selectedItem === 'profileLocking' && (
            <div>
              <h4 className="font-semibold text-xl">Profile Locking Settings</h4>
              <p className="text-gray-400 mt-2">
                Manage who can see your profile and how it is displayed. Adjust your privacy settings to control your profile visibility.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Profile Visibility:</h5>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="profileVisibility" value="public" className="mr-2" />
                  Public (Anyone can see your profile)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="profileVisibility" value="friends" className="mr-2" />
                  Friends Only (Only friends can see your profile)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="profileVisibility" value="private" className="mr-2" defaultChecked />
                  Private (Only you can see your profile)
                </label>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Save Profile Visibility Settings
                </button>
              </div>
            </div>
          )}

          {/* Profile Details Settings */}
          {selectedItem === 'profileDetails' && (
            <div>
              <h4 className="font-semibold text-xl">Profile Details Settings</h4>
              <p className="text-gray-400 mt-2">
                Adjust your profile information for visibility. Choose what details you want to share publicly or keep private.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Details to Share:</h5>
                <label className="cursor-pointer block mt-2">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  Share Profile Picture
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="checkbox" className="mr-2" />
                  Share About Me Section
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  Share Work and Education
                </label>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Update Profile Details
                </button>
              </div>
            </div>
          )}

          {/* Contact Options Settings */}
          {selectedItem === 'contactOptions' && (
            <div>
              <h4 className="font-semibold text-xl">Contact Options Settings</h4>
              <p className="text-gray-400 mt-2">
                Choose how others can find and contact you. Set your preferred methods of communication.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Contact Preferences:</h5>
                <label className="cursor-pointer block mt-2">
                  <input type="checkbox" className="mr-2" />
                  Allow others to find me by email
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="checkbox" className="mr-2" />
                  Allow others to find me by phone number
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="checkbox" className="mr-2" />
                  Allow friend requests from anyone
                </label>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Save Contact Options
                </button>
              </div>
            </div>
          )}
          {selectedItem === 'postVisibility' && (
            <div>
              <h4 className="font-semibold text-xl">Post Visibility Settings</h4>
              <p className="text-gray-400 mt-2">
                Control who can see your posts. Set your preferences for visibility to ensure your content is shared with the right audience.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Choose Your Audience:</h5>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="postVisibility" value="public" className="mr-2" />
                  Public (Everyone can see your posts)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="postVisibility" value="friends" className="mr-2" />
                  Friends Only (Only friends can see your posts)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="postVisibility" value="custom" className="mr-2" />
                  Custom (Choose specific friends)
                </label>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Save Post Visibility Settings
                </button>
              </div>
            </div>
          )}

          {/* Stories Visibility Settings */}
          {selectedItem === 'storiesVisibility' && (
            <div>
              <h4 className="font-semibold text-xl">Stories Visibility Settings</h4>
              <p className="text-gray-400 mt-2">
                Decide who can view your stories. Your stories can be shared with a selected audience.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Select Your Story Audience:</h5>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="storiesVisibility" value="everyone" className="mr-2" />
                  Everyone (Anyone can view your stories)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="storiesVisibility" value="friends" className="mr-2" />
                  Friends Only (Only friends can view your stories)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="storiesVisibility" value="closeFriends" className="mr-2" />
                  Close Friends (Only close friends can see your stories)
                </label>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Save Stories Visibility Settings
                </button>
              </div>
            </div>
          )}

          {/* Reels Visibility Settings */}
          {selectedItem === 'reelsVisibility' && (
            <div>
              <h4 className="font-semibold text-xl">Reels Visibility Settings</h4>
              <p className="text-gray-400 mt-2">
                Manage who can see your reels. Customize your audience to enhance your sharing experience.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Set Your Reels Audience:</h5>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="reelsVisibility" value="public" className="mr-2" />
                  Public (Everyone can see your reels)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="reelsVisibility" value="friends" className="mr-2" />
                  Friends Only (Only friends can see your reels)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="reelsVisibility" value="specific" className="mr-2" />
                  Specific Friends (Choose friends who can view your reels)
                </label>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Save Reels Visibility Settings
                </button>
              </div>
            </div>
          )}
          {selectedItem === 'followersVisibility' && (
            <div>
              <h4 className="font-semibold text-xl">Followers and Public Content Settings</h4>
              <p className="text-gray-400 mt-2">
                Control the visibility of your followers and public posts. Choose who can see your follower list and your public content.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Select Your Preferences:</h5>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="followersVisibility" value="public" className="mr-2" />
                  Public (Everyone can see your followers and public posts)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="followersVisibility" value="friends" className="mr-2" />
                  Friends Only (Only friends can see your followers)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="followersVisibility" value="private" className="mr-2" />
                  Private (Only you can see your followers)
                </label>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Save Followers Visibility Settings
                </button>
              </div>
            </div>
          )}

          {/* Profile Tagging Settings */}
          {selectedItem === 'profileTagging' && (
            <div>
              <h4 className="font-semibold text-xl">Profile and Tagging Settings</h4>
              <p className="text-gray-400 mt-2">
                Manage who can tag you in posts and photos. Customize your tagging preferences to control your profile's visibility.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Choose Your Tagging Options:</h5>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="tagging" value="everyone" className="mr-2" />
                  Everyone (Anyone can tag you)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="tagging" value="friends" className="mr-2" />
                  Friends Only (Only friends can tag you)
                </label>
                <label className="cursor-pointer block mt-2">
                  <input type="radio" name="tagging" value="noOne" className="mr-2" />
                  No One (No one can tag you)
                </label>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Save Tagging Settings
                </button>
              </div>
            </div>
          )}

          {/* Blocking Settings */}
          {selectedItem === 'blocking' && (
            <div>
              <h4 className="font-semibold text-xl">Blocking Settings</h4>
              <p className="text-gray-400 mt-2">
                Manage users you want to block from interacting with you. You can unblock users anytime.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Blocked Users:</h5>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>User A</li>
                  <li>User B</li>
                  <li>User C</li>
                </ul>
                <div className="mt-4">
                  <input type="text" placeholder="Enter username to block" className="p-2 rounded border border-gray-600 w-full" />
                  <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">
                    Block User
                  </button>
                </div>
              </div>
            </div>
          )}
          {selectedItem === 'activityLog' && (
            <div>
              <h4 className="font-semibold text-xl">Activity Log</h4>
              <p className="text-gray-400 mt-2">
                Review your past activities and interactions on the platform. This log helps you keep track of your actions.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Recent Activities:</h5>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>Liked a post by User X</li>
                  <li>Commented on a photo by User Y</li>
                  <li>Shared a video from User Z</li>
                  <li>Updated profile picture</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Clear Activity Log
                </button>
              </div>
            </div>
          )}

          {/* Apps and Websites Settings */}
          {selectedItem === 'appsAndWebsites' && (
            <div>
              <h4 className="font-semibold text-xl">Apps and Websites</h4>
              <p className="text-gray-400 mt-2">
                Manage third-party applications connected to your account. You can remove access or adjust permissions here.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Connected Apps:</h5>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>App 1 (Last accessed: 2 days ago)</li>
                  <li>Website A (Last accessed: 1 week ago)</li>
                  <li>App 2 (Last accessed: 5 days ago)</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">
                  Remove Selected Apps
                </button>
              </div>
            </div>
          )}

          {/* Business Integrations Settings */}
          {selectedItem === 'businessIntegrations' && (
            <div>
              <h4 className="font-semibold text-xl">Business Integrations</h4>
              <p className="text-gray-400 mt-2">
                Manage your business accounts and settings. Ensure your integrations are functioning correctly for optimal performance.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Current Integrations:</h5>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>Business Account 1 (Active)</li>
                  <li>Business Tool A (Active)</li>
                  <li>Integration Service B (Inactive)</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
                  Manage Business Settings
                </button>
              </div>
            </div>
          )}
          {selectedItem === 'wtf' && (
            <div>
              <h4 className="font-semibold text-xl">WTF Section</h4>
              <p className="text-gray-400 mt-2">
                Welcome to the WTF section! Here, you can discover unique and fun features that set us apart from other platforms.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Fun Features:</h5>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>Surprise Me: Get random content suggestions based on your interests!</li>
                  <li>Fun Polls: Participate in polls and see what others think!</li>
                  <li>Daily Jokes: Get a new joke every day to brighten your mood!</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500">
                  Explore More Fun Features
                </button>
              </div>
            </div>
          )}

          {/* Access Information Settings */}
          {selectedItem === 'accessInformation' && (
            <div>
              <h4 className="font-semibold text-xl">Access Information</h4>
              <p className="text-gray-400 mt-2">
                Review and access your personal information stored on the platform. This is your gateway to understanding your data.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Your Information Includes:</h5>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>Profile Information</li>
                  <li>Account Settings</li>
                  <li>Activity History</li>
                  <li>Connected Devices</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  View Your Information
                </button>
              </div>
            </div>
          )}

          {/* Download Information Settings */}
          {selectedItem === 'downloadInformation' && (
            <div>
              <h4 className="font-semibold text-xl">Download Your Information</h4>
              <p className="text-gray-400 mt-2">
                Request to download your personal information stored on the platform. Keep your data in your hands.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Information Available for Download:</h5>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>Profile Data</li>
                  <li>Posts and Comments</li>
                  <li>Friend Lists</li>
                  <li>Account Activity Logs</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
                  Request Download
                </button>
              </div>
            </div>
          )}
          {selectedItem === 'requestInformation' && (
            <div>
              <h4 className="font-semibold text-xl">Request Information</h4>
              <p className="text-gray-400 mt-2">
                Manage your requests for information from the platform. Here you can track your information requests and adjust settings related to your data.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Your Requests:</h5>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>View all pending requests</li>
                  <li>Cancel existing requests</li>
                  <li>Submit new requests for information</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500">
                  Manage Your Requests
                </button>
              </div>
            </div>
          )}

          {/* Standard Option 1 */}
          {selectedItem === 'standardOption1' && (
            <div>
              <h4 className="font-semibold text-xl">Community Standards</h4>
              <p className="text-gray-400 mt-2">
                Information about community standards. Understand the guidelines that shape our community and how we ensure a safe and respectful environment for everyone.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Key Points:</h5>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>Respectful communication is key.</li>
                  <li>Hate speech and harassment are not tolerated.</li>
                  <li>Know the reporting process for any violations.</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Learn More About Standards
                </button>
              </div>
            </div>
          )}

          {/* Standard Option 2 */}
          {selectedItem === 'standardOption2' && (
            <div>
              <h4 className="font-semibold text-xl">Legal Policies and Standards</h4>
              <p className="text-gray-400 mt-2">
                Further details on legal policies and standards. This section provides insights into the legal framework governing the platform and your rights as a user.
              </p>
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium">Important Policies:</h5>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  <li>Privacy Policy: How we handle your personal information.</li>
                  <li>Terms of Service: Your rights and responsibilities.</li>
                  <li>Content Guidelines: What is acceptable on our platform.</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
                  Review Legal Policies
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
