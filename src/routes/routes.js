import config from "@/config";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AddPost from "@/pages/AddPost";
import EditProfile from "@/pages/EditProfile";
import Groups from "@/pages/Groups";
import Profile from "@/pages/Profile/Profile"; 

const publicRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: `${config.routes.groups}/*`, component: Groups },
];

const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.addPost, component: AddPost },
    { path: config.routes.profileUpdate, component: EditProfile },
    { path: config.routes.profile, component: Profile }, 
    { path: `${config.routes.groups}/*`, component: Groups },
];

export { publicRoutes, privateRoutes };
