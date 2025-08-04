import React, { useEffect, useState } from "react";
import { Toast, toast as toastLib } from "react-hot-toast";

const CustomToast = ({ toast }: { toast: Toast }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      toastLib.dismiss(toast.id);  // dismiss by id using the toast utility
    }, toast.duration || 4500);
    return () => clearTimeout(timer);
  }, [toast]);

const content =
  typeof toast.message === "function" ? toast.message(toast) : toast.message;

return (
  <div className={`toast ${show ? "show" : ""}`}>
    <div className="toast-img">⚠️</div>
    <div className="toast-desc">{content}</div>
  </div>
);
}

export default CustomToast;
