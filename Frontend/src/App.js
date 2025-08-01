import { useEffect, useContext } from "react";
import "./App.css";
import { AppContext } from "./Context/AppContext.js";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./Newporject/Pages/Homepage.js";
import ContactUs from "./Newporject/Pages/ContactUs.js";
import GuestRoute from "./Newporject/Component/GuestRoute.js";
import LoginPage from "./Newporject/Pages/LoginPage.js";
import SignupPage from "./Newporject/Pages/SignupPage.js";
import ProfilePage from "./Newporject/Pages/ProfilePage.js";
import ChangePassword from "./Newporject/Pages/ChangePassword.js";
import ForgetPassword from "./Newporject/Pages/ForgetPassword.js";
import NewPassword from "./Newporject/Pages/NewPassword.js";
import NavBar from "./Newporject/Component/NavBar.js";
import Footer from "./Newporject/Component/Footer.js";
import WebPortfolio from "./Newporject/Pages/WebPortfolio.js";
import { motion } from 'framer-motion';

function App() {
  const { user,checkLoggedInUser,projectDataFetch } = useContext(AppContext);
  const location = useLocation();
  
  // Define routes where NavBar/Footer should be hidden
  const hideLayoutRoutes = ['/verify-email',"/verify-your-email","/test"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  useEffect(() => {
    checkLoggedInUser();
    projectDataFetch();
    // eslint-disable-next-line 
  },[user])
  useEffect(() => {
  },[user])
  return (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className="relative w-full min-h-screen overflow-x-hidden bg-slate-950">

      <div className="absolute bottom-0 left-0 right-0 -top-36 z-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] "></div>
      {!shouldHideLayout && <NavBar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/web-development" element={<WebPortfolio />} />

      </Routes>

      {!shouldHideLayout && <Footer />}
    </div>
    </motion.div>
  );
}

export default App;
