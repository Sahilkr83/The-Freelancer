import { useEffect, useContext } from "react";
import "./App.css";
// import NewWeb from "./Newporject/Pages/NewWeb.js";
// import Preloader from "./Preloader.js";
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

function App() {
  // const [loading, setLoading] = useState(true);
  // const [fadeOut, setFadeOut] = useState(false);
  const { user } = useContext(AppContext);
   const location = useLocation();
  
    // Define routes where NavBar/Footer should be hidden
    const hideLayoutRoutes = ['/verify-email',"/verify-your-email","/test"];
  
    const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);


  // useEffect(() => {
  //   const preloaderShown = sessionStorage.getItem("preloaderShown");

  //   if (preloaderShown) {
  //     // If preloader was shown, skip it and load app immediately
  //     setLoading(false);
  //   } else {
  //     // Show preloader and then set flag
  //     const handlePreload = async () => {
  //       const minPreloadDuration = new Promise((resolve) => {
  //         setTimeout(resolve, 2100);
  //       });

  //       const checkMediaLoaded = async () => {
  //         const mediaElements = [
  //           ...document.querySelectorAll("img"),
  //           ...document.querySelectorAll("video"),
  //         ];

  //         const mediaPromises = mediaElements.map((media) => {
  //           return new Promise((resolve) => {
  //             const cleanup = () => {
  //               media.onload = null;
  //               media.onerror = null;
  //               media.oncanplaythrough = null;
  //             };

  //             const onLoadOrError = () => {
  //               cleanup();
  //               resolve();
  //             };

  //             if (media.tagName === "IMG") {
  //               if (media.complete) {
  //                 resolve();
  //               } else {
  //                 media.onload = onLoadOrError;
  //                 media.onerror = onLoadOrError;
  //               }
  //             } else if (media.tagName === "VIDEO") {
  //               if (media.readyState === 4) {
  //                 resolve();
  //               } else {
  //                 media.oncanplaythrough = onLoadOrError;
  //                 media.onerror = onLoadOrError;
  //               }
  //             }
  //           });
  //         });

  //         await Promise.all(mediaPromises);
  //       };

  //       await Promise.all([checkMediaLoaded(), minPreloadDuration]);

  //       setFadeOut(true);
  //       setTimeout(() => setLoading(false), 500);

  //       // Mark preloader as shown for this session
  //       sessionStorage.setItem("preloaderShown", "true");
  //     };

  //     handlePreload();
  //   }

  //   checkLoggedInUser();
  // }, []);
  useEffect(() => {
  },[user])
  return (
<div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950">


      <div className="absolute bottom-0 left-0 right-0 -top-36 z-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] "></div>
     
      {/* {loading ? <Preloader fadeOut={fadeOut} /> : } */}
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
        {/* <Route path="/test" element={<TestingPage />} /> */}

      </Routes>

      {!shouldHideLayout && <Footer />}
    </div>
  );
}

export default App;
