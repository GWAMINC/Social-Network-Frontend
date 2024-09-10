import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
  const navigate = useNavigate(); // Hook điều hướng

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
      
      // Hiệu ứng pháo hoa
      toast.success('Đăng ký thành công! 🎉', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });

      // Điều hướng tới trang đăng nhập sau khi đăng ký thành công
      setTimeout(() => navigate('/login'), 2000);

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
    <div className="animate-gradient">
      <div className="form-container">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {message && (
          <div className="text-green-500 text-center mb-4">{message}</div>
        )}

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <label className="block">
              <span className="block text-gray-700">Name:</span>
              <input
                type="text"
                placeholder="Vui lòng nhập tên"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </label>
            <label className="block">
              <span className="block text-gray-700">Role:</span>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled
              >
                <option value="user">User</option>
              </select>
            </label>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>

            <div className="text-center mt-4">
              <span className="text-gray-700">Already have an account?</span>
              <a href="/login" className="text-blue-500 hover:underline ml-2">Login</a>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
