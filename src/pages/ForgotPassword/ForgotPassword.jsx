import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './ForgotPassword.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/user/forgot-password`, { email });
      setMessage(response.data.message);
      setError('');
      setEmail('');
    } catch (error) {
      console.error('Forgot password request failed:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Request failed');
      setMessage('');
    }
  };

  return (
    <div className="forgot-password-background">
      <div className="forgot-password-form-container">
        <h1 className="forgot-password-title">Forgot Password</h1>
        {message && <div className="message success">{message}</div>}
        {error && <div className="message error">{error}</div>}
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <label className="block">
            <span className="label-text">Email:</span>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-password-input"
              required
            />
          </label>
          <button
            type="submit"
            className="forgot-password-button"
          >
            Send Reset Link
          </button>
          <div className="navigation-links">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
