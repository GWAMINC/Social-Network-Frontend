import config from "@/config";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AddPost from "@/pages/AddPost";
import EditProfile from "@/pages/EditProfile";
import ChatRoomPage from "@/pages/Chat/ChatRoomPage.jsx";
import AllChats from "@/pages/Chat/AllChats.jsx";

const publicRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },

];

const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.addPost, component: AddPost },
    { path: config.routes.profileUpdate, component: EditProfile },
    { path: config.routes.chats, component: AllChats },
    { path: config.routes.chatRoom, component: ChatRoomPage },
];

export { publicRoutes, privateRoutes };