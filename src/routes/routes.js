import config from "@/config";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AddPost from "@/pages/AddPost";
import EditProfile from "@/pages/EditProfile";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.addPost, component: AddPost },
    { path: config.routes.profileUpdate, component: EditProfile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };