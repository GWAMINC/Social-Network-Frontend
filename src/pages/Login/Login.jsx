import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../App.jsx";
import "./Login.css";

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
    <div className="bg-wave">
      <div className="login-container">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign in</h1>
        {message && <div className="text-green-500 mb-4">{message}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vui lòng nhập email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Vui lòng nhập password"
              required
            />
          </div>
          <div className="input-group">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="button-group">
            <button type="submit">Login</button>
            <button className="google-login-button">
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                <title>Google-color</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g id="Color-" transform="translate(-401.000000, -860.000000)">
                    <g id="Google" transform="translate(401.000000, 860.000000)">
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      ></path>
                      <path
                        d="M23.7136364,37.8666667 C19.5525,37.8666667 15.8895455,35.9373333 13.5206818,33.1269333 L5.59522727,39.2634667 C9.38604545,44.0133333 15.1222727,47.4666667 23.7136364,47.4666667 C29.5038636,47.4666667 34.3097727,45.5016 38.1075,42.1137333 L30.6197727,36.3397333 C28.6773182,37.6002667 26.3536364,38.4666667 23.7136364,38.4666667"
                        id="Fill-3"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.4736 45.9943182,20.9466667 45.6775,19.4656 L23.7136364,19.4656 L23.7136364,28.3477333 L36.7440909,28.3477333 C36.1492727,31.1488 34.5170455,33.4949333 32.3659091,35.0218667 L39.02625,40.9325333 C43.2504545,36.9813333 46.1454545,31.1706667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              Sign in with Google
            </button>
          </div>
          <div className="navigation-links">
            <Link to="/register">Register</Link>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
