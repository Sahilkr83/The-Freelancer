import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import frontendImg from '../../assests/web-dev.webp';
import ProjectFrame from '.././Component/ProjectFrame.js';
import ProjectTypes from '../Component/ProjectTypes.js';


const WebPortfolio = () => {
  // Example project URLs or video/demo URLs, replace with your own data
const projects = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Modern responsive websites with React, TailwindCSS, and accessibility in mind.',
    img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    project:[

      {
        id:1,
        title: 'Frontend Development',
        description: 'Razorpay landing page clone built with React and TailwindCSS.',
        feature:true,
        date:"25/07/2025",
        img:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/670ef02f926e1700084f5b4d/screenshot_2024-10-15-22-44-45-0000.webp&fit=cover&h=500&q=40&w=800",
        url: 'https://sahils-razorpay-clone.netlify.app',
      },
      {
        id:2,
        title: 'Frontend Development',
        description: 'Weather app using OpenWeatherMap API with dynamic UI updates.',
        date:"14/01/2025",
        img:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/6714034fd5be710008003c54/screenshot_2024-10-19-19-07-25-0000.webp&fit=cover&h=500&q=40&w=800",
        url: 'https://weather-app-not-accurate.netlify.app',
      },
      {
        id:3,
        title: 'Frontend Development',
        description: "E-commerce shopping cart built with React and context-based state management.",
        feature:true,
        date:"02/04/2025",
        img:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/6840c188ec01b500088c8274/screenshot_2025-06-04-21-59-05-0000.webp&fit=cover&h=500&q=40&w=800",
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
    project:[
      {
        id:1,
        title: 'Full Stack Projects',
        description: 'Freelancer Agency – a full-stack product showcase platform with user auth and real-time data.',
        feature:true,
        date:"19/03/2025",
        img:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/68892485e7416e000894ada9/screenshot_2025-07-29-19-44-45-0000.webp&fit=cover&h=500&q=40&w=800",
        url: 'https://freelancer-agency.netlify.app/',
      },
      {
        id:1,
        title: 'Full Stack Projects',
        description: 'A streamlined system for employee registration and record management.',
        date:"30/05/2025",
        img:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/68709aa566c4a1923132b8f0/screenshot_2025-07-11-05-02-07-0000.webp&fit=cover&h=500&q=40&w=800",
        url: 'https://test-the-back.netlify.app/',
      },
    ]
  },
];

  return (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
  <main className="text-white relative pt-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-[1460px] z-30">
      <Helmet>
        <title>Web Development Portfolio – Modern Frontend & Full-Stack Projects</title>
        <link rel="canonical" href="https://thefreelancer.shop/web-development" />
        <meta name="description" content="Explore cutting-edge web development projects by The Freelancer Shop, including frontend designs, backend APIs, and full-stack applications." />

        {/* Open Graph */}
        <meta property="og:title" content="Web Development Portfolio – The Freelancer Shop" />
         <meta property="og:description" content="Frontend and full-stack projects using React, Node.js, MongoDB, and more. Optimized, responsive, and SEO-friendly solutions tailored to your business." />
        <meta property="og:image" content="https://thefreelancer.shop/assets/webdev-og-banner.webp" />
        <meta property="og:url" content="https://thefreelancer.shop/web-development" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Freelancer Shop" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Development Portfolio – The Freelancer Shop" />
        <meta name="twitter:description" content="Explore modern frontend and full-stack web apps created by The Freelancer Shop." />
        <meta name="twitter:image" content="https://thefreelancer.shop/assets/webdev-twitter-banner.webp" />
        <meta name="twitter:site" content="@thefreelancer27" />
      </Helmet>

      {/* Introduction Section */}
      <section className="py-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Welcome to The Freelancer – Web Development Portfolio
        </h1>
        <h2 className="text-xl font-semibold mb-4">React Developer | Full-Stack Engineer | JavaScript Expert</h2>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="xl:w-[475px] w-full xl:pl-16 h-full pb-10 xl:pb-0">
            <p className="hidden lg:block text-base leading-relaxed">
              Discover my web development portfolio featuring real-world frontend and full-stack applications. As a React and JavaScript developer, I build modern, mobile-responsive websites and scalable backend APIs using technologies like Node.js, Express, MongoDB, and Tailwind CSS. Each project is optimized for SEO, performance, and accessibility.
            </p>
            <p className="block lg:hidden text-sm leading-relaxed">
              I create user-first, responsive websites and scalable apps using React, Node.js, and more. Explore my featured frontend and full-stack work.
            </p>
          </div>

          <img
            src={frontendImg}
            width={875}
            height={450}
            alt="React Developer working on a responsive website"
            className="rounded-lg shadow-xl object-cover max-w-full lg:w-1/2"
            loading="lazy"
          />
        </div>
      </section>
      {/* Project Types */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-6">Project Types</h2>
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
         
          title={title}
          
          description={description}
          projects={project}
        />
      ))}
    </main>
    </motion.div>
  );
};

export default WebPortfolio;
