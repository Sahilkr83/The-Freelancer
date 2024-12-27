import { useState,useEffect } from "react";
import "./App.css";
import NewWeb from "./New porject/NewWeb";
import Preloader from "./Preloader";

function App() {
  const [loading,setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true); 
      setTimeout(() => {
        setLoading(false); 
      }, 500);
    }, 4500); 
  }, []);

  return (
   
      <div className="relative  w-[100vw] wrapper h-[100vh]  overflow-x-hidden bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 -top-36 z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>

        {loading ? <Preloader fadeOut={fadeOut}/> :  <NewWeb/>}
        </div>
  )
}

export default App;
