import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  

  useEffect(() => {
    const scroll = () => {
      // wait for content to fully render
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    };

    // Slight timeout gives React time to render route
    const timeout = setTimeout(scroll, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
