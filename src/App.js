import { useState, useEffect } from "react";
import "./App.css";
import NewWeb from "./New porject/NewWeb";
import Preloader from "./Preloader";

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); 

  
  const checkMediaLoaded = async () => {
    
    const mediaElements = [...document.querySelectorAll("img"), ...document.querySelectorAll("video")];
    


    const mediaPromises = mediaElements.map((media) => {
       
      return new Promise((resolve) => {


        if (media.tagName === "IMG") {
          if (media.complete) {
            resolve();
          } else {
            media.onload = resolve;
          }
        } 
        
        
        
        else if (media.tagName === "VIDEO") {
          
          if (media.readyState >= 3) { 
            resolve();
          } else {
            media.oncanplaythrough = resolve; 
          }
        }
      });
    });
   

    
     await Promise.all(mediaPromises).then(() => {
      setIsLoaded(true);

    });
  };

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
     
      checkMediaLoaded();
    }, 0); 
    
    setTimeout(() => {
      if (isLoaded) {
        setFadeOut(true);
        setTimeout(() => setLoading(false), 500); 
      }
    }, 4500); 
    return () => clearTimeout(loadTimeout); 
  }, [isLoaded]);

 
 

  return (
    <div className="relative w-[100vw] wrapper h-[100vh] overflow-x-hidden bg-slate-950">
      <div className="absolute bottom-0 left-0 right-0 -top-36 z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>

      {/* Show Preloader or NewWeb based on loading state */}
      {loading ? <Preloader fadeOut={fadeOut} /> : <NewWeb />}
    </div>
  );
}

export default App;
