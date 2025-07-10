// GuestRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext.js";
// import { AppContext } from "../context/AppContext";

export default function GuestRoute({ children }) {
  const { user } = useContext(AppContext);

  if (user) {
    return <Navigate to="/" />; 
  }

  return children;
}
