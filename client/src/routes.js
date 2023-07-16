import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.jsx";
import Register from "./views/examples/Register.js";
import Reset from './views/examples/Reset.js';
import Login from './views/examples/Login.js';
import Recommendation from './pages/Recommendation.jsx'
import Statistics from './pages/Statistics.jsx';
import Reviews from './pages/reviews/Reviews.jsx';
import Sync from './pages/sync/Sync.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import ProfileReviews from "./pages/reviews/ProfileReviews.jsx";
import ViewReviews from './pages/reviews/ViewReviews.jsx';
import UpdateReview from './pages/reviews/UpdateReview.jsx';
import CreateReview from './pages/reviews/CreateReview.jsx';
import CREatery from './pages/reviews/CREatery.jsx';
import CRStall from './pages/reviews/CRStall.jsx';
import ChangePassword from './pages/profile/ChangePassword.jsx';
import CreateProfile from './pages/profile/CreateProfile.jsx';
import UpdateProfile from './pages/profile/UpdateProfile.jsx';

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
    path: "/changepassword",
    name: "Change password",
    component: <ChangePassword />,
    layout: "/admin",
  },

];
export default routes;
