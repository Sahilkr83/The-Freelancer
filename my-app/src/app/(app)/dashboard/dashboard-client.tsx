"use client";

import { AppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import demoImage from '@/assets/web-client/Freelancer Agency Platform.webp'
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
export default function DashboardPage() {
  const { user } = useContext(AppContext)!;


  const project = {
    id: "demo",
    title: "Demo Project",
    description: "Customize this sample project and publish it as your own.",
    status: "Completed",
  };
  const editButton = async () =>{

    const res = await axios.post<ApiResponse>('/api/edit-on')
    
    if (res.status === 200) {
      window.open(`/demo-site/edit`)
    }
  }
  const shareButton = () => {
    if (navigator.share) {
      const username = user?.username
      // Mobile-friendly native share
      navigator.share({
        title: "Check out my demo site!",
        text: "Here is my demo website you can explore:",
        url: `${window.location.origin}/demo-site/${username}`,
      })
      
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className="relative pt-28 pb-20 lg:px-7 z-20 mx-auto max-w-[1280px] w-11/12">
      <div className="absolute top-28 right-4 text-right">
        <h1 className="text-sm font-semibold">{user?.name}</h1>
        <p className="text-xs  ">{user?.email}</p>
      </div>

      {/* DEMO PROJECT SECTION */}
      <section>
       <h1 className="text-2xl sm:text-3xl font-bold py-4">Demo Website</h1>
       <hr className="pb-4 border-gray-600" />
       <p className="  leading-6">
        Welcome {user?.name}! 🎉 Start exploring our demo project — customize it as much as you like and share your creativity with the world.
       </p>

      <motion.div
        key={project.id}
        whileHover={{ scale: 1.03, translateY: -3 }}
        transition={{ duration: 0.3 }}
        className="dashboard-card mt-10 relative rounded-2xl overflow-hidden flex flex-row items-center"
      >
        {/* Edit button */}
        <button
          onClick={() => editButton()}
          className="absolute top-3 right-3 text-sm bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition z-10"
        >
          Edit
        </button>

        {/* Image */}
        <Image
          src={demoImage}
          alt={project.title}
          width={500}
          height={300}
          className="object-cover w-[110px] sm:w-[250px] h-[150px] sm:h-[180px] cursor-pointer"
          onClick={() => window.open(`/demo-site/${user?.username}`, "_blank")}
        />

        {/* Content */}
        <div className="">
        <div className=" sm:px-6 sm:pt-6 pl-2 flex flex-col justify-between w-full h-full cursor-pointer" onClick={() => window.open(`/demo-site/${user?.username}`, "_blank")}>
          <div>
            <h2 className="text-lg sm:text-2xl font-bold">{project.title}</h2>
            <p className="  text-sm sm:text-base sm:mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-4 items-center sm:px-6 sm:pb-3 pl-2">
          <span className="px-4 sm:py-2 py-1 mb-1 w-24 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded-full text-xs font-semibold text-center">
            {project.status}
          </span>
          <button
            onClick={() => shareButton()} // define shareButton function
            className="px-4 sm:py-2 py-1 mb-1 w-24 h-7 sm:h-9 rounded-full text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:border-blue-500 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            Share
          </button>
          </div></div>
      </motion.div>
      </section>

      {/* USER PROJECTS SECTION */}
      <section className="mt-10 sm:mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold py-4">Your Website&apos;s</h2>
        <hr className="pb-4" />
        <p className=" ">
          Manage your personal projects and share them with others.
        </p>
        <div className="text-base py-10 px-4 mt-4 text-center border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-slate-500">
          You currently don&apos;t have any projects with us.
        </div>
      </section>
    </div>
    </motion.div>
  );
}
