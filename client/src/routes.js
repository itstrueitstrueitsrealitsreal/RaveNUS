import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.jsx";
import Maps from "./views/examples/Maps.js";
import Register from "./views/examples/Register.js";
import Tables from "./views/examples/Tables.js";
import Icons from "./views/examples/Icons.js";
import Reset from './views/examples/Reset.js';
import Login from './views/examples/Login.js';
import Recommendation from './pages/Recommendation.jsx'

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Statistics",
    icon: "ni ni-chart-bar-32 text-purple",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Reviews",
    icon: "ni ni-check-bold text-red",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-green",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Sync",
    icon: "ni ni-cloud-download-95 text-blue",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Leaderboard",
    icon: "ni ni-trophy text-yellow",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/reset",
    name: "Reset",
    component: <Reset />,
    layout: "/auth",
  },
  {
    path: "/recommendation/:uid",
    name: "Recommendation",
    component: <Recommendation />,
    layout: "/admin",
  },
];
export default routes;
