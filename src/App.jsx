import './App.css'
import Home from './components/Home.jsx';
import {BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes} from "react-router-dom";
import Login from "@/components/auth/Login.jsx";
import Register from "@/components/auth/Register.jsx";
import AddPost from "./components/Post/AddPost.jsx";
import EditProfile from './components/auth/EditProfile';
import { useState } from 'react';

// const mockUserId = '669f306083271e2a0b6a436f';
// const appRouter = createBrowserRouter([
//     {
//         path: '/',
//         element: <Home />
//     },
//     {
//         path: '/login',
//         element: <Login setUser={setUser}/>
//     },
//     {
//         path: '/register',
//         element: <Register />
//     },
//     {
//         path: '/addPost',
//         element: <AddPost userId={mockUserId} />
//     },
//     {
//         path: '/profile/update',
//         element: <EditProfile/>
//     }
// ]);

function App() {
    const mockUserId = '669f306083271e2a0b6a436f';
    const [user,setUser]=useState(null)
  return (
    //   <div>
    //       <RouterProvider router={appRouter}/>
    //   </div>
    <BrowserRouter>    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addPost" element={<AddPost userId={mockUserId} />} />
        <Route path="/profile/update" element={<EditProfile user={user}/>} />
      </Routes>   
    </BrowserRouter>
  )
}

export default App
