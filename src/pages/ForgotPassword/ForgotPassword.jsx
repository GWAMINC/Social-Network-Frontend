import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './ForgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(
        `${apiUrl}/user/forgot-password`,
        { email }
      );
      console.log("Password reset response:", res.data);
      setMessage("Đã gửi liên kết khôi phục mật khẩu đến email của bạn.");
    } catch (error) {
      console.error(
        "Khôi phục mật khẩu thất bại:",
        error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || "Khôi phục mật khẩu thất bại");
    }
  };

  return (
    <div className="forget-password-container">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Quên Mật Khẩu</h1>
            {message && (
              <div className="text-green-500 text-center mb-4">{message}</div>
            )}
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <label className="block">
                    <span className="block text-gray-700">Email:</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Vui lòng nhập email"
                      required
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-cyan-500 text-white rounded-md px-2 py-1"
                >
                  Gửi liên kết khôi phục
                </button>
              </div>
            </form>
            <div className="w-full flex flex-col items-center mt-6">
              <Link
                to="/login"
                className="text-blue-500 hover:underline"
              >
                Quay về đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
