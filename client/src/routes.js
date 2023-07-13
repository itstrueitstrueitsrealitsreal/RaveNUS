import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.jsx";
import Maps from "./views/examples/Maps.js";
import Register from "./views/examples/Register.js";
import Tables from "./views/examples/Tables.js";
import Icons from "./views/examples/Icons.js";
import Reset from './views/examples/Reset.js';
import Login from './views/examples/Login.js';
import Recommendation from './pages/Recommendation.jsx'
import Statistics from './pages/Statistics.jsx';
import Reviews from './pages/reviews/Reviews.jsx';
import Sync from './pages/sync/Sync.jsx';
import Leaderboard from './pages/Leaderboard.jsx';

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/statistics",
    name: "Statistics",
    icon: "ni ni-chart-bar-32 text-purple",
    component: <Statistics />,
    layout: "/admin",
  },
  {
    path: "/reviews",
    name: "Reviews",
    icon: "ni ni-check-bold text-red",
    component: <Reviews />,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-green",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/sync",
    name: "Sync",
    icon: "ni ni-cloud-download-95 text-blue",
    component: <Sync />,
    layout: "/admin",
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    icon: "ni ni-trophy text-yellow",
    component: <Leaderboard />,
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
  {
    path: "/reviews/profile",
    name: "Profile reviews",
    component: <ProfileReviews />,
    layout: "/admin",
  },
  {
    path: "/vr/:eatid/:stallid",
    name: "View reviews",
    component: <ViewReviews />,
    layout: "/admin",
  },
  {
    path: "/updatereview/:revid/:eatid/:stallid/:uid",
    name: "Update review",
    component: <UpdateReview />,
    layout: "/admin",
  },
  {
    path: "/cr/:id",
    name: "Create review (eatery)",
    component: <CREatery />,
    layout: "/admin",
  },
  {
    path: "/cr/:uid/:locid",
    name: "Create review (stall)",
    component: <CRStall />,
    layout: "/admin",
  },
  {
    path: "/cr/:uid/:locid/:stallid",
    name: "Create review",
    component: <CreateReview />,
    layout: "/admin",
  },
  {
    path: "/createprofile",
    name: "Create profile",
    component: <CreateProfile />,
    layout: "/admin",
  },
  {
    path: "/updateprofile/:id",
    name: "Update profile",
    component: <UpdateProfile />,
    layout: "/admin",
  },
  {
    path: "/changepassword",
    name: "Change password",
    component: <ChangePassword />,
    layout: "/admin",
  },

];
export default routes;
