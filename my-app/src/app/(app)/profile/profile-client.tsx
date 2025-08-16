'use client';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';

export default function ProfilePage() {
  const { user} = useContext(AppContext)!;
  const router = useRouter()
  const handleLogout = async () => {
    signOut({ callbackUrl: "/auth/sign-in" });
    toast.success("Logged out successfully!");
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
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="text-white relative pt-24 pb-0 lg:pb-36 lg:px-7 z-20 mx-auto max-w-[1460px] w-11/12 font-['Rajdhani',_sans-serif]">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 mt-10">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-neon-glow">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-wide ">
              {user.name}
            </h1>
            <p className="text-gray-300 text-lg mt-1">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-5">
          <div>
            <h3 className="text-xl font-semibold tracking-wide mb-3 text-indigo-400 uppercase drop-shadow-md">
              Profile Info
            </h3>
            <ul className="space-y-2 text-gray-300 text-lg">
              <li><strong>Name:</strong> {user.name}</li>
              <li><strong>Email:</strong> {user.email}</li>
              {/* Add more profile fields if needed */}
            </ul>
          </div>
          <button
            onClick={() => router.push("/change-password")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold tracking-widest uppercase shadow-lg hover:brightness-110 transition"
          >
            Change Password
          </button>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-12 w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-bold tracking-wide uppercase text-white shadow-lg transition"
      >
        Log Out
      </button>
    </div>

    <style jsx>{`
      .shadow-neon-glow {
        box-shadow:
          0 0 8px rgba(99, 102, 241, 0.7),
          0 0 20px rgba(99, 102, 241, 0.6),
          0 0 40px rgba(139, 92, 246, 0.5);
      }
      .text-gradient-neon {
        background: linear-gradient(90deg, #7f00ff, #e100ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 2px #b37feb);
      }
    `}</style>
  </motion.div>
  );
}
