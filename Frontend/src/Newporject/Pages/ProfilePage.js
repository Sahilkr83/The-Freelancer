import React, { useContext } from 'react';
// import { AppContext } from '../../context/AppContext.js'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext.js';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProfilePage() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include', // important to send cookies
        });
    } catch (error) {
        console.error("Logout error:", error);
    } finally {
        setUser(null);
        toast.success("Log Out Successfully")
        navigate("/login");
    }
  };

  if (!user) {
    return (
       <div className='text-white pt-7 lg:px-7 z-20 mx-auto max-w-[1460px] w-11/12 '>
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">You are not logged in.</p>
      </div>
      </div>
    );
  }

  return (
    <div className='text-white pt-7 lg:px-7 z-20 mx-auto max-w-[1460px] w-11/12 '>
      <Helmet>
        <title>Your Profile – The Freelancer Shop</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

         <div className=" mx-auto p-6 mt-10  shadow-xl rounded-2xl flex justify-between h-96 profile-div">
        <div>
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-y-3">
        <div>
          <h3 className="text-lg font-semibold mb-2">Profile Info</h3>
        <ul className=" space-y-1">
          <li><strong>Name:</strong> {user.name}</li>
          <li><strong>Email:</strong> {user.email}</li>
          {/* Add more fields if your user object has them */}
        </ul>
        </div>
        <button className='nav-btn' onClick={() => navigate("/change-password")}>Change password</button>
      </div>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 h-12 bg-red-500 text-white rounded-xl hover:bg-red-600"
      >
        Log Out
      </button>
    </div>
    </div>
   
  );
}
