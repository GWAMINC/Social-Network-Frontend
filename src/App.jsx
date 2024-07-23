import './App.css'
import Home from './components/Home.jsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "@/components/auth/Login.jsx";
import Register from "@/components/auth/Register.jsx";
import AddPost from "./components/Post/AddPost.jsx";

const mockUserId = '669f306083271e2a0b6a436f';

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/addPost',
        element: <AddPost userId={mockUserId} />
    }
]);

function App() {

  return (
      <div>
          <RouterProvider router={appRouter}/>
      </div>
  )
}

export default App
