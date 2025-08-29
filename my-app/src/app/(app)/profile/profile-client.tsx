'use client';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";
import Image from 'next/image';

export default function ProfilePage() {
  const { status: sessionStatus } = useSession();
  const { user } = useContext(AppContext)!;
  const router = useRouter();

  const handleLogout = async () => {
    signOut({ callbackUrl: "/auth/sign-in" });
    toast.success("Logged out successfully!");
  };

  if (sessionStatus === "loading") {
    return (
      <div className="pt-7 lg:px-7 mx-auto max-w-[1460px] w-11/12 min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold tracking-wide">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black flex items-center justify-center"
    >
      <div className="relative pt-28 pb-20 lg:px-7 mx-auto max-w-[1000px] w-11/12 font-['Rajdhani',_sans-serif] ">
        
        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl ">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            <div className="relative w-32 h-32">
              <Image
                src={user?.image || "/default-avatar.png"}
                width={128}
                height={128}
                alt="User"
                className="rounded-full object-cover border-4 border-indigo-500 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-2 border-black rounded-full"></div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-wide text-white">
                {user?.name}
              </h1>
              <p className="text-lg mt-1 text-gray-300">{user?.email}</p>
              <p className="text-md text-indigo-400 font-semibold">@{user?.username}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold tracking-wide mb-4 text-indigo-400 uppercase">
              Profile Information
            </h3>
            <ul className="space-y-3 text-gray-200 text-lg">
              <li><span className="text-indigo-300 font-medium">Full Name:</span> {user?.name}</li>
              <li><span className="text-indigo-300 font-medium">Username:</span> {user?.username}</li>
              <li><span className="text-indigo-300 font-medium">Email:</span> {user?.email}</li>
              <li><span className="text-indigo-300 font-medium">Verified:</span> {user?.isVerified ? "✅ Yes" : "❌ No"}</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-col md:flex-row gap-5">
            <button
              onClick={() => router.push("/auth/change-password")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold tracking-widest uppercase shadow-lg hover:scale-105 transition-transform"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-bold tracking-widest uppercase text-white shadow-lg hover:scale-105 transition-transform"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
