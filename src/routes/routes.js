import config from "@/config";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import AddPost from "@/pages/AddPost";
import EditProfile from "@/pages/EditProfile";

import ChatRoomPage from "@/pages/Chat/ChatRoomPage.jsx";
import AllChats from "@/pages/Chat/AllChats.jsx";

import Groups from "@/pages/Groups";
import Profile from "@/pages/Profile/Profile"; 
// import Post from "@/pages/Post";
import { PostWrapper } from "@/pages/Post/Post";
import NotificationsPage from "@/pages/NotificationsPage/NotificationsPage";
import NotificationSettingsPage from "@/pages/NotificationSettingsPage/NotificationSettingsPage";
import AddPostInGroup from "@/pages/AddPostInGroup";

const publicRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.forgotPassword, component: ForgotPassword },
    { path: `${config.routes.groups}/*`, component: Groups },
];

const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.addPost, component: AddPost },
    { path: config.routes.profileUpdate, component: EditProfile },

    { path: config.routes.chats, component: AllChats },
    { path: config.routes.chatRoom, component: ChatRoomPage },

    { path: config.routes.profile, component: Profile }, 
    { path: `${config.routes.groups}/*`, component: Groups },
    { path: config.routes.addPostInGroup, component: AddPostInGroup },
    { path: config.routes.post, component: PostWrapper },
    { path: config.routes.notifications, component: NotificationsPage },
    { path: config.routes.notificationSettings, component: NotificationSettingsPage },
];

export { publicRoutes, privateRoutes };
