import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from '../Component/NavBar.js';
import Footer from '../Component/Footer.js';
import Homepage from './Homepage.js';
import ContactUs from './ContactUs.js';
import LoginPage from './LoginPage.js';
import SignupPage from './SignupPage.js';
import GuestRoute from '../Component/GuestRoute.js';
import ProfilePage from './ProfilePage.js';


import ChangePassword from './ChangePassword.js';
import ForgetPassword from './ForgetPassword.js';
import NewPassword from './NewPassword.js';
import TestingPage from './TestPage.js';

const NewWeb = () => {
  const location = useLocation();

  // Define routes where NavBar/Footer should be hidden
  const hideLayoutRoutes = ['/verify-email',"/verify-your-email","/test"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="w-full h-full flex flex-col justify-between z-20">
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
        <Route path="/test" element={<TestingPage />} />

      </Routes>

      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default NewWeb;
