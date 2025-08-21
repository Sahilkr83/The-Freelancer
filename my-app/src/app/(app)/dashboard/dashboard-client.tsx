"use client";

import { AppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import demoImage from '@/assets/500x300.png'
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
export default function DashboardPage() {
  const { user } = useContext(AppContext)!;
  const router = useRouter();
  const [demoLink, setDemoLink] = useState("");


  // Example demo + user projects (later replace with DB fetch)
  const [projects] = useState([
    {
      id: "demo",
      title: "Demo Project",
      description:
        "This is a sample demo project to showcase your dashboard layout.",
      status: "Completed",
      thumbnail: {demoImage},
    },
    {
      id: "1",
      title: "Portfolio Website",
      description: "A modern web dev portfolio built with Next.js & TailwindCSS.",
      status: "In Progress",
      thumbnail: {demoImage},
    },
  ]);
  const editButton = async () =>{
    try{
      const res = await axios.post<ApiResponse>('/api/edit-on')
      
      if (res.status === 200) {
        router.push(`/demo-site/edit`)
      }
    }catch{

    }
    
  }
  const shareButton = () => {
    if (navigator.share) {
      const username = user?.username
      setDemoLink(`${window.location.origin}/demo-site/${username}`);
      // Mobile-friendly native share
      navigator.share({
        title: "Check out my demo site!",
        text: "Here is my demo website you can explore:",
        url: demoLink,
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
    <div className="text-white relative pt-24 pb-20 lg:px-7 z-20 mx-auto max-w-[1280px] w-11/12 font-['Rajdhani',_sans-serif]">
      <div className="absolute top-28 right-4 text-right">
        <h1 className="text-sm font-semibold">{user?.name}</h1>
        <p className="text-xs text-gray-300">{user?.email}</p>
      </div>

      {/* DEMO PROJECT SECTION */}
      <section>
       <h1 className="text-2xl sm:text-3xl font-bold py-4">Demo Website</h1>
       <hr className="pb-4 border-gray-600" />
       <p className="text-gray-300 leading-6">
        Welcome {user?.name}! 🎉 Start exploring our demo project — customize it as much as you like and share your creativity with the world.
       </p>

      <motion.div
        key={projects[0]?.id}
        whileHover={{ scale: 1.03, translateY: -3 }}
        transition={{ duration: 0.3 }}
        className="mt-10 relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg hover:shadow-2xl overflow-hidden flex flex-row items-center"
      >
        {/* Edit button */}
        <button
          onClick={() => editButton()}
          className="absolute top-2 right-2 text-sm sm:text-base bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition z-10"
        >
          Edit
        </button>

        {/* Image */}
        <Image
          src={demoImage}
          alt={projects[0]?.title || "Demo Project"}
          width={500}
          height={300}
          className="object-cover w-[120px] sm:w-[250px] h-[130px] sm:h-[180px] cursor-pointer"
          onClick={() => router.push(`/demo-site/${user?.username}`)}
        />

        {/* Content */}
        <div className="">
        <div className=" sm:px-6 sm:pt-6 pl-2 flex flex-col justify-between w-full h-full cursor-pointer" onClick={() => router.push(`/demo-site/${user?.username}`)}>
          <div>
            <h2 className="text-lg sm:text-2xl font-bold">{projects[0]?.title}</h2>
            <p className="text-gray-300 text-sm sm:text-base sm:mt-2 leading-relaxed">
              {projects[0]?.description} ${user?.username}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-4 items-center sm:px-6 sm:pb-3 pl-2">
          <span className="px-4 sm:py-2 py-1  mb-1 w-24 bg-indigo-500 rounded-full text-xs font-semibold hover:bg-indigo-600 transition">
            {projects[0]?.status}
          </span>
          <button
            onClick={() => shareButton()} // define shareButton function
            className="text-sm h-8 w-24 sm:text-base bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 transition"
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
        <p className="text-gray-300">
          Manage your personal projects and share them with others.
        </p>
        <div className="text-gray-400 text-lg py-6 px-4 mt-4 text-center border border-dashed border-gray-600 rounded-lg bg-gray-800/50">
          You currently don&apos;t have any projects with us.
        </div>

       {/* <motion.div
        key={projects[1]?.id}
        whileHover={{ scale: 1.03, translateY: -3 }}
        transition={{ duration: 0.3 }}
        className="mt-10 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg hover:shadow-2xl overflow-hidden flex flex-row items-center"
      >
        {/* Image 
        <Image
          src={demoImage}
          alt={projects[1]?.title || "Demo Project"}
          width={600}
          height={400}
          className="object-cover w-[120px] sm:w-[250px] h-[130px] sm:h-[180]"
        />

        {/* Content 
        <div className="sm:p-6 pl-2 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold">{projects[1]?.title}</h3>
            <p className="text-gray-300 text-sm sm:text-base sm:mt-2 leading-relaxed">
              {projects[1]?.description}
            </p>
          </div>
          <span className="px-4 sm:py-2 py-1 mt-3 mb-1 w-28 text-center bg-indigo-500 rounded-full text-xs font-semibold hover:bg-indigo-600 transition">
            {projects[1]?.status}
          </span>
        </div>
      </motion.div> */}
      </section>
    </div>
    </motion.div>
  );
}
