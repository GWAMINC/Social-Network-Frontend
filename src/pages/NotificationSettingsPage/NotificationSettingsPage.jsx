import React, { useState } from 'react';

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
    <div className="flex h-screen mt-16">
      {/* Sidebar */}
      <div className="w-1/4 bg-background-lighter text-white p-4 rounded-lg shadow-lg border border-gray-600">
        <h2 className="text-xl font-semibold">Settings & Privacy</h2>

        {/* Tools and Resources Section */}
        <div className="mt-4">
          <h3 className="font-medium">Tools and Resources</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Resource 1</li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Resource 2</li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Preferences Section */}
        <div className="mt-4">
          <h3 className="font-medium">Preferences</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Preference 1</li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Preference 2</li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Preference 3</li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Audience and Visibility Section */}
        <div className="mt-4">
          <h3 className="font-medium">Audience and Visibility</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Visibility Option 1</li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Visibility Option 2</li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Payments Section */}
        <div className="mt-4">
          <h3 className="font-medium">Payments</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Payment Option 1</li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Payment Option 2</li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Your Activity Section */}
        <div className="mt-4">
          <h3 className="font-medium">Your Activity</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Activity Option 1</li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Activity Option 2</li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Your Information Section */}
        <div className="mt-4">
          <h3 className="font-medium">Your Information</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Info Option 1</li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Info Option 2</li>
          </ul>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Community Standards Section */}
        <div className="mt-4">
          <h3 className="font-medium">Community Standards and Legal Policies</h3>
          <ul className="mt-2">
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Standard Option 1</li>
            <li className="mb-2 text-gray-300 cursor-pointer hover:underline">Standard Option 2</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">Notification Settings</h1>
        <form>
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
        </form>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
