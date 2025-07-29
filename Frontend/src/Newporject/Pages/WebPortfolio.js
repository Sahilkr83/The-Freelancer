import React from 'react';
import { Helmet } from 'react-helmet';

// Example images (replace with your real images)
import frontendImg from '../../assests/web-dev.webp';
// import backendImg from '../../assests/backend.webp';
// import fullstackImg from '../../assests/fullstack.webp';

import ProjectFrame from '.././Component/ProjectFrame.js'; // Similar to Frame component
import ProjectTypes from '../Component/ProjectTypes.js'; // Similar to Types component
// import DevTools from '../Component/DevTools.js'; // Similar to Tools component

const WebPortfolio = () => {
  // Example project URLs or video/demo URLs, replace with your own data
const projects = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Modern responsive websites with React, TailwindCSS, and accessibility in mind.',
    wedImg3:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/6840c188ec01b500088c8274/screenshot_2025-06-04-21-59-05-0000.webp&fit=cover&h=500&q=40&w=800",
    wedImg1:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/670ef02f926e1700084f5b4d/screenshot_2024-10-15-22-44-45-0000.webp&fit=cover&h=500&q=40&w=800",
    wedImg2:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/6714034fd5be710008003c54/screenshot_2024-10-19-19-07-25-0000.webp&fit=cover&h=500&q=40&w=800",
    demo1: {
      url: 'https://sahils-razorpay-clone.netlify.app',
      description: 'Razorpay landing page clone built with React and TailwindCSS.'
    },
    demo2: {
      url: 'https://weather-app-not-accurate.netlify.app',
      description: 'Weather app using OpenWeatherMap API with dynamic UI updates.'
    },
    demo3: {
      url: "https://shopping-cart-first.netlify.app",
      description: "E-commerce shopping cart built with React and context-based state management."
    },
    img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
    wedImg3:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/68709aa566c4a1923132b8f0/screenshot_2025-07-11-05-02-07-0000.webp&fit=cover&h=500&q=40&w=800",
    // wedImg2:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/68709aa566c4a1923132b8f0/screenshot_2025-07-11-05-02-07-0000.webp&fit=cover&h=500&q=40&w=800",
    wedImg1:"https://app.netlify.com//.netlify/images?url=https://d33wubrfki0l68.cloudfront.net/68892485e7416e000894ada9/screenshot_2025-07-29-19-44-45-0000.webp&fit=cover&h=500&q=40&w=800",
    demo1: {
      url: 'https://freelancer-agency.netlify.app/',
      description: 'Freelancer Agency – a full-stack product showcase platform with user auth and real-time data.'
    },
    demo2: {
    //   url: 'https://test-the-back.netlify.app/',
    //   description: 'GitHub repo for a full-stack MERN e-commerce app with admin dashboard and JWT auth.'
    },
    demo3: {
    url: 'https://test-the-back.netlify.app/',
    description: 'A streamlined system for employee registration and record management.'
    },

    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
];





  return (
    <div className="text-white relative pt-7 lg:px-7 mx-auto max-w-[1460px] w-11/12 z-30">

      <Helmet>
        <title>Web Development Portfolio – The Freelancer Shop</title>
        <link rel="canonical" href="https://thefreelancer.shop/web-development" />
        <meta
          name="description"
          content="Explore The Freelancer Shop's web development portfolio featuring frontend, backend, and full-stack projects with modern technologies."
        />
        <meta property="og:title" content="Web Development Portfolio – The Freelancer Shop" />
        <meta property="og:description" content="Showcasing modern responsive websites, APIs, and full-stack applications." />
        <meta property="og:url" content="https://thefreelancer.shop/web-development" />
      </Helmet>

      <div className="py-[100px]">
        <h1 className="lg:text-[2.5rem] text-4xl font-bold pb-10 leading-[3.4rem]">
          Welcome to The Freelancer - Web Development Portfolio
        </h1>

        <div className="flex lg:items-center img-section">
          <img
            alt="Web Development Portfolio"
            loading="lazy"
            src={frontendImg}
            width={875}
            height={450}
            className="rounded-lg"
          />
          


          <div className="xl:w-[475px] w-full xl:pl-16 h-full pb-10 xl:pb-0">
            <p className="lg:text-base text-sm">
              Whether you need a sleek frontend interface, a powerful backend API, or a full-stack solution, I deliver custom web applications that meet your business goals with clean, maintainable code and modern tech.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between py-10 w-full gap-5 text-center">
        <h2 className="font-bold uppercase types-of-edit-heading">Project Types</h2>

        <div className="flex justify-evenly flex-wrap">
          {projects.map(({ id, img, title }) => (
            <ProjectTypes key={id} href={`#${id}`} img={img} editType={title} />
          ))}
        </div>
      </div>

      {/* Project Frames */}
      {projects.map(({ id, title, wedImg1,wedImg2,wedImg3, demo1, demo2, demo3, description }) => (
        <ProjectFrame
          key={id}
          id={id}
          img1={wedImg1}
          img2={wedImg2}
          img3={wedImg3}
          editName={title}
          video1={demo1}
          video2={demo2}
          video3={demo3}
          demoDescriptions={[
                demo1.description,
                demo2.description,
                demo3.description,
            ]}
          description={description} // You can add a prop for description if needed
        />
      ))}

      {/* <DevTools /> */}
    </div>
  );
};

export default WebPortfolio;
