import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./Context/AppContext.js";

import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Newporject/Component/ScrollToTop.jsx";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( 
   <AppContextProvider>
    <BrowserRouter>
     <ScrollToTop />
     <Toaster /> {/* ✅ Required */}
     <App /> 
    </BrowserRouter>
    </AppContextProvider>
  );
