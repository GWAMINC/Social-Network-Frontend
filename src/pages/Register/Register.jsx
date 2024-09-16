import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"; // Đảm bảo bạn đã cài đặt react-router-dom
import './Register.css';

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/user/register`, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      });
      console.log("Đăng ký thành công:", response.data);
      setMessage(response.data.message);
      setError("");
      setNewUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        role: "user",
      });
    } catch (error) {
      console.error(
          "Đăng ký thất bại:",
          error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || "Đăng ký thất bại");
      setMessage(""); // Xóa thông báo nếu có lỗi
    }
  };

  return (
      <div className="register-background">
        <div className="register-form-container">
          <h1 className="register-title">Register</h1>
          {message && (
              <div className="text-green-500 text-center mb-4">{message}</div>
          )}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleRegister} className="register-form">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <label className="block">
                <span className="block text-gray-700">Name:</span>
                <input
                    type="text"
                    placeholder="Vui lòng nhập tên"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="register-input"
                    required
                />
              </label>
              <label className="block">
                <span className="block text-gray-700">Email:</span>
                <input
                    type="email"
                    placeholder="Vui lòng nhập email"
                    value={newUser.email}
                    onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="register-input"
                    required
                />
              </label>
              <label className="block">
                <span className="block text-gray-700">Password:</span>
                <input
                    type="password"
                    placeholder="Vui lòng nhập mật khẩu"
                    value={newUser.password}
                    onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="register-input"
                    required
                />
              </label>
              <label className="block">
                <span className="block text-gray-700">Confirm Password:</span>
                <input
                    type="password"
                    placeholder="Vui lòng xác nhận mật khẩu"
                    value={newUser.confirmPassword}
                    onChange={(e) =>
                        setNewUser({ ...newUser, confirmPassword: e.target.value })
                    }
                    className="register-input"
                    required
                />
              </label>
              <label className="block">
                <span className="block text-gray-700">Phone Number:</span>
                <input
                    type="text"
                    placeholder="Vui lòng nhập số điện thoại"
                    value={newUser.phoneNumber}
                    onChange={(e) =>
                        setNewUser({ ...newUser, phoneNumber: e.target.value })
                    }
                    className="register-input"
                    required
                />
              </label>
              <label className="block">
                <span className="block text-gray-700">Role:</span>
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="register-input"
                    disabled
                >
                  <option value="user">User</option>
                </select>
              </label>

              <button
                  type="submit"
                  className="register-button"
              >
                Register
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/login" className="register-link">Already have an account? Login</Link>
            <br />
            <Link to="/forgot-password" className="register-link">Forgot Password?</Link>
          </div>
        </div>
      </div>
  )
};

export default Register;
