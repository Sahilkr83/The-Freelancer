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
      className="relative min-h-screen flex items-center justify-center"
    >
      <div className="relative pt-28 pb-20 lg:px-7 mx-auto max-w-[1000px] w-11/12">
        
        {/* Profile Card */}
        <div className="dashboard-card rounded-3xl p-7 sm:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            <div className="relative w-32 h-32">
              <Image
                src={user?.image || "/default-avatar.png"}
                width={128}
                height={128}
                alt="User"
                className="rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-2 border-black rounded-full"></div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight">
                {user?.name}
              </h1>
              <p className="text-lg mt-1 text-slate-500 dark:text-slate-400">{user?.email}</p>
              <p className="text-md text-blue-600 dark:text-blue-400 font-semibold">@{user?.username}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-5">
              Profile Information
            </h3>
            <ul className="grid gap-3 text-base sm:grid-cols-2">
              <li className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800"><span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</span>{user?.name}</li>
              <li className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800"><span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Username</span>{user?.username}</li>
              <li className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800"><span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Email</span>{user?.email}</li>
              <li className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800"><span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Verified</span>{user?.isVerified ? "Yes" : "No"}</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-col md:flex-row gap-5">
            <button
              onClick={() => router.push("/auth/change-password")}
              className="portfolio-button"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
