/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

// Format date to yyyy-MM-dd
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Profile = ({ user }) => {
  // Initialize state with user data
  const [profile, setProfile] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phoneNumber: user ? user.phoneNumber : "",
    bio: user ? user.profile.bio : "",
    birthDate: user ? formatDate(user.profile.birthDate) : "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Display login prompt if no user is provided
  if (!user) {
    return (
      <div className="text-center p-4">
        <h1 className="text-lg font-semibold">Please log in to edit your profile</h1>
      </div>
    );
  }

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (!profile.name || !profile.email || !profile.phoneNumber) {
      setError("Name, email, and phone number are required.");
      setMessage("");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${apiUrl}/user/profile/update`,
        profile,
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Edit</h1>
      {message && (
        <div className="text-green-500 text-center mb-4">{message}</div>
      )}
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}
      <form onSubmit={handleEditProfile} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => {
              setProfile({ ...profile, name: e.target.value });
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => {
              setProfile({ ...profile, email: e.target.value });
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Phone Number:</span>
          <input
            type="tel"
            value={profile.phoneNumber}
            onChange={(e) => {
              setProfile({ ...profile, phoneNumber: e.target.value });
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Bio:</span>
          <input
            type="text"
            value={profile.bio}
            onChange={(e) => {
              setProfile({ ...profile, bio: e.target.value });
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Birth Date:</span>
          <input
            type="date"
            value={profile.birthDate}
            onChange={(e) => {
              setProfile({ ...profile, birthDate: e.target.value });
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
