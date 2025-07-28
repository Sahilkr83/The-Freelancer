import { useState, useEffect, useContext } from "react";
import "./App.css";
import NewWeb from "./Newporject/Pages/NewWeb.js";
import Preloader from "./Preloader.js";
import { AppContext } from "./Context/AppContext.js";

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const { checkLoggedInUser,user } = useContext(AppContext);


  useEffect(() => {
    const preloaderShown = sessionStorage.getItem("preloaderShown");

    if (preloaderShown) {
      // If preloader was shown, skip it and load app immediately
      setLoading(false);
    } else {
      // Show preloader and then set flag
      const handlePreload = async () => {
        const minPreloadDuration = new Promise((resolve) => {
          setTimeout(resolve, 2100);
        });

        const checkMediaLoaded = async () => {
          const mediaElements = [
            ...document.querySelectorAll("img"),
            ...document.querySelectorAll("video"),
          ];

          const mediaPromises = mediaElements.map((media) => {
            return new Promise((resolve) => {
              const cleanup = () => {
                media.onload = null;
                media.onerror = null;
                media.oncanplaythrough = null;
              };

              const onLoadOrError = () => {
                cleanup();
                resolve();
              };

              if (media.tagName === "IMG") {
                if (media.complete) {
                  resolve();
                } else {
                  media.onload = onLoadOrError;
                  media.onerror = onLoadOrError;
                }
              } else if (media.tagName === "VIDEO") {
                if (media.readyState === 4) {
                  resolve();
                } else {
                  media.oncanplaythrough = onLoadOrError;
                  media.onerror = onLoadOrError;
                }
              }
            });
          });

          await Promise.all(mediaPromises);
        };

        await Promise.all([checkMediaLoaded(), minPreloadDuration]);

        setFadeOut(true);
        setTimeout(() => setLoading(false), 500);

        // Mark preloader as shown for this session
        sessionStorage.setItem("preloaderShown", "true");
      };

      handlePreload();
    }

    checkLoggedInUser();
  }, []);
  useEffect(() => {
  },[user])
  return (
    <div className="relative w-[100vw] wrapper h-[100vh] overflow-x-hidden bg-slate-950">
      <div className="absolute bottom-0 left-0 right-0 -top-36 z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
     
      // {loading ? <Preloader fadeOut={fadeOut} /> : }
        <NewWeb />
    </div>
  );
}

export default App;
