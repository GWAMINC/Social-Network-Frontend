import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../App.jsx";
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { checkAuth } = useContext(AuthContext);

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
          withCredentials: true,
        }
      );

      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      setMessage("Đăng nhập thành công!");
      checkAuth();
      navigate("/");
    } catch (error) {
      console.error(
        "Đăng nhập thất bại:",
        error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 py-6 flex flex-col justify-center sm:py-12 animate-gradient">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 form-container sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Sign in</h1>
            {message && (
              <div className="text-green-500 text-center mb-4">{message}</div>
            )}
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="divide-y divide-gray-200">
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
                  <div className="relative">
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
                  </div>
                  <div className="relative">
                    <label className="block">
                      <span className="block text-gray-700">Role:</span>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-cyan-500 text-white rounded-md px-4 py-2"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="w-full flex justify-center mt-4 space-x-4">
              <Link to="/register" className="text-sm text-blue-500 hover:underline">
                Register
              </Link>
              <Link to="/recover" className="text-sm text-blue-500 hover:underline">
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
