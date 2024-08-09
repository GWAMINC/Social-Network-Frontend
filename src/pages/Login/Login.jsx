import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(
        `${apiUrl}/user/login`,
        { email, password, role },
        {
          withCredentials: true, // Đảm bảo cookies được gửi cùng với yêu cầu
        }
      );
      setUser(res.data.user);
      console.log(res.data);
      setMessage("Đăng nhập thành công!");
      navigate("/profile/update", { state: { user: res.data.user } });
    } catch (error) {
      console.error(
        "Đăng nhập thất bại:",
        error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || "Đăng nhập thất bại");
      setUser(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign in</h1>
        {message && (
          <div className="text-green-500 text-center mb-4">{message}</div>
        )}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
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
          <label className="block">
            <span className="block text-gray-700">Password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Vui lòng nhập password"
              required
            />
          </label>
          <label className="block">
            <span className="block text-gray-700">Role:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <div className="text-gray-700 mb-2">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:text-blue-600"
            >
              Bạn quên tài khoản ư?
            </a>
          </div>
          <div>
            <a href="./Register" className="text-blue-500 hover:text-blue-600">
              Đăng ký tài khoản
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
