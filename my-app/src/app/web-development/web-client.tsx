'use client';
import React from 'react';
// import Head from 'next/head';
import { motion } from 'framer-motion';
import frontendImg from '@/assets/web-client/web-dev.webp';
import ProjectFrame from '@/component/ProjectFrame';
import ProjectTypes from '@/component/ProjectTypes';
import Image, { StaticImageData } from 'next/image';
import razorpayImg from '@/assets/web-client/Razorpay Landing Page Clone.webp'
import weatherForecastImg from '@/assets/web-client/Live Weather Forecast App.webp'
import eCommerceCartImg from '@/assets/web-client/React E-commerce Cart System.webp'
import freelancerAgencyImg from '@/assets/web-client/Freelancer Agency Platform.webp'
import employeeManagementImg from '@/assets/web-client/Employee Management System.webp'


interface InnerProject {
  id: number;
  title: string;
  description: string;
  feature?: boolean;
  date: string;
  img: string | StaticImageData;
  url: string;
}

interface ProjectCategory {
  id: string;  // like 'frontend', 'fullstack'
  title: string;
  description: string;
  img: string;
  project: InnerProject[];  // array of actual projects under this category
}




const WebPortfolio = () => {
  // Example project URLs or video/demo URLs, replace with your own data
const projects: ProjectCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Modern responsive websites with React, TailwindCSS, and accessibility in mind.',
    img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    project: [
      {
        id: 1,
        title: 'Razorpay Landing Page Clone',
        description: 'Razorpay landing page clone built with React and TailwindCSS.',
        feature: true,
        date: "25/07/2025",
        img: razorpayImg,
        url: 'https://sahils-razorpay-clone.netlify.app',
      },
      {
        id: 2,
        title: 'Live Weather Forecast App',
        description: 'Weather app using OpenWeatherMap API with dynamic UI updates.',
        date: "14/01/2025",
        img: weatherForecastImg,
        url: 'https://weather-app-not-accurate.netlify.app',
      },
      {
        id: 3,
        title: 'React E-commerce Cart System',
        description: "E-commerce shopping cart built with React and context-based state management.",
        feature: true,
        date: "02/04/2025",
        img: eCommerceCartImg,
        url: "https://shopping-cart-first.netlify.app",
      },
    ]
  },
//   {
//     id: 'backend',
//     title: 'Backend APIs & Services',
//     description: 'Robust RESTful APIs and microservices built with Node.js, Express, and MongoDB.',
//     demo1: 'https://documenter.getpostman.com/view/24305875/2s9Ykn9fDw',
//     demo2: 'https://expressjs.com/en/starter/hello-world.html',
//     demo3: 'https://nodejs.org/en/about',
//     img: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//   },
  {
    id: 'fullstack',
    title: 'Full Stack Projects',
    description: 'End-to-end applications combining frontend & backend with deployment pipelines.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    project: [
      {
        id: 1,
        title: 'Freelancer Agency Platform',
        description: 'Freelancer Agency – a full-stack product showcase platform with user auth and real-time data.',
        feature: true,
        date: "19/03/2025",
        img: freelancerAgencyImg,
        url: 'https://freelancer-agency.netlify.app/',
      },
      {
        id: 2,
        title: 'Employee Management System',
        description: 'A streamlined system for employee registration and record management.',
        date: "30/05/2025",
        img: employeeManagementImg,
        url: 'https://test-the-back.netlify.app/',
      },
    ]

  },
];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <main className="text-white relative pt-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-[1460px] z-30">
        {/* Introduction Section */}
        <section className="py-14">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            whileInView="visible"
            viewport={{ once: true }}

            className="text-2xl sm:text-4xl lg:text-5xl pt-4 font-bold max-w-5xl mx-auto text-center text-white bg-clip-text "
          >
            React & Full-Stack Developer Portfolio
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl mt-10  font-extrabold leading-tight max-w-5xl mx-auto text-center text-white bg-clip-text "
          >
            Built with JavaScript, Tailwind CSS & MongoDB
          </motion.h2>

          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 py-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-xl text-center lg:text-left text-gray-300 text-base sm:text-lg leading-relaxed tracking-wide xl:w-[475px] w-full xl:pl-16 h-full pb-10 xl:pb-0"
            >
              <p className="mb-6">
                Discover my web development portfolio featuring real-world frontend and full-stack applications. As a React 
                and JavaScript developer, I build modern, mobile-responsive websites and scalable backend APIs using technologies 
                like Node.js, Express, MongoDB, and Tailwind CSS. Each project is optimized for SEO, performance, and accessibility.
              </p>
              <p>
                I create user-first, responsive websites and scalable apps using React, 
                Node.js, and more. Explore my featured frontend and full-stack work.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                alt="React Developer working on a responsive website"
                rel="preload"
                src={frontendImg}
                width={656}
                height={366}
                className="block rounded-2xl mt-10"
                priority
              />
            </motion.div>
          </div>
        </section>
        {/* Project Types */}
        <section className="py-12 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-6">Explore Project Categories</h2>
          <div className="flex justify-center flex-wrap gap-6">
            {projects.map(({ id, img, title }) => (
              <ProjectTypes key={id} href={`#${id}`} img={img} editType={title} />
            ))}
          </div>
        </section>

        {/* Projects */}
        {projects.map(({ id, title, description, project }) => (
          <ProjectFrame
            key={id}
            id={id}
            title={`Projects: ${title}`}
            description={description}
            projects={project}
          />
        ))}
      </main>
    </motion.div>
  );
};

export default WebPortfolio;
