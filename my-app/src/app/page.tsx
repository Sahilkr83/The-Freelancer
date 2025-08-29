'use client';

import React from 'react';
import homePAgeImg from "@/assets/homePageImg.webp";
import Frame from '@/component/Frame';
import urls from '@/component/urlfiles/Urls';
import { motion } from 'framer-motion';
import ProjectFrame from '@/component/ProjectFrame';
import Image, { StaticImageData } from 'next/image';
import razorpayImg from '@/assets/web-client/Razorpay Landing Page Clone.webp';
import eCommerceCartImg from '@/assets/web-client/React E-commerce Cart System.webp';
import freelancerAgencyImg from '@/assets/web-client/Freelancer Agency Platform.webp';
import Link from 'next/link';
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
  id: string;
  title: string;
  description: string;
  img: string;
  project: InnerProject[];
}

const Home = () => {
  const projects: ProjectCategory[] = [
    {
      id: 'project',
      title: '',
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
          title: 'Freelancer Agency Platform',
          description: 'Freelancer Agency – a full-stack product showcase platform with user auth and real-time data.',
          feature: true,
          date: "19/03/2025",
          img: freelancerAgencyImg,
          url: 'https://freelancer-agency.netlify.app/',
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
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <main className=" relative pt-14 px-6 sm:px-12 lg:px-20 mx-auto max-w-[1460px] w-full z-30 select-none">
        {/* Hero Section */}
        <section
          className="py-20"
          aria-label="Hero Introduction"
        >
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-5xl mx-auto text-center bg-clip-text "
          >
            Pro Video Editing & Web Design
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl sm:text-3xl lg:text-4xl pt-4 font-bold max-w-5xl mx-auto text-center bg-clip-text "
          >
            By The Freelancer - Your Hub for Creative Digital Solutions
          </motion.h2>

          <div className="mt-10 flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-7xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                title="Our professional video editing and web design service Home Page Image"
                alt="Freelance Video Editing and Web Design Service - Homepage Image"
                rel="preload"
                src={homePAgeImg}
                width={875}
                height={450}
                className="block rounded-3xl"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="max-w-xl text-center lg:text-left text-base sm:text-lg leading-relaxed tracking-wide"
            >
              <p className="mb-6">
                Welcome to <strong>The Freelancer Shop</strong> — your hub for expert-level
                <span className="font-semibold"> video editing</span> and <span className="font-semibold">web design</span> services.
                We specialize in turning raw footage into cinematic videos and crafting sleek,
                modern websites tailored to your brand&apos;s voice.
              </p>
              <p className="mb-6">
                Whether you&apos;re a content creator, entrepreneur, or agency, we deliver
                professional-grade <span className="font-semibold">editing</span> with seamless transitions, motion graphics,
                and dynamic storytelling to help you grow your online presence.
              </p>
              <p>
                Our <span className="font-semibold">web development</span> services include building fast, SEO-friendly sites
                using technologies like <span className="font-semibold">React</span>, <span className="font-semibold">Next.js</span>, <span className="font-semibold">Tailwind CSS</span>,
                and <strong>MongoDB</strong>. With attention to performance, responsiveness, and user experience,
                we ensure your site not only looks great but ranks high too.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 max-w-5xl mx-auto px-4 ">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose The Freelancer Shop?</h2>
          <div className="grid sm:grid-cols-2 gap-12 text-lg leading-relaxed">
            <p>
              We combine creativity with technical excellence to deliver tailor-made digital solutions. Whether
              you want captivating videos to engage your audience or sleek websites to boost your business,
              we bring your vision to life.
            </p>
            <p>
              Our collaborative process keeps you in the loop every step of the way, ensuring your brand&apos;s
              personality shines through every frame and every pixel. We pride ourselves on timely delivery,
              attention to detail, and a commitment to quality.
            </p>
          </div>
        </section>



        {/* Frame - Motion Graphics Section */}
        <Frame
          editName="Motion Graphics"
          id='motion'
          video1={urls[0].motion1}
          video2={urls[0].motion3}
          video3={urls[0].motion2}
          number1="4." type1="Hook Elements"
          number2="5." type2="Motion Transition"
          number3="6." type3="Fastpace Editing"
        />
        
        <div className="mt-10 mb-16 flex justify-center gap-6 text-white">
          <Link
            href="/video-portfolio"
            
            className="px-6 py-3  bg-purple-600 hover:bg-purple-700  rounded-lg font-semibold transition"
            aria-label="Go to Video Portfolio"
          >
            Video Portfolio
          </Link>
        </div>

        {/* Projects Section */}
        <section className="max-w-5xl mx-auto px-4 mb-10  text-center">
          <p className="mb-4 text-lg">
            Explore a curated selection of projects showcasing our expertise in both frontend
            development and full-stack applications. We focus on performance, accessibility, and
            modern design principles to create digital experiences that captivate and convert.
          </p>
          <p className="mb-6 text-sm italic opacity-80">
            Click on any project to visit the live demo and see the work in action.
          </p>
        </section>

        {projects.map(({ id, title, description, project }) => (
          <ProjectFrame
            key={id}
            id={id}
            title={`Projects: ${title}`}
            description={description}
            projects={project}
          />
        ))}
        {/* Portfolio Buttons */}
        <div className="mt-10 mb-16 flex justify-center gap-6">
          
          <Link
            href="/web-development"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition text-white"
            aria-label="Go to Web Portfolio"
          >
            Web Portfolio
          </Link>
        </div>
        <section className="py-20 max-w-6xl mx-auto px-6 ">
          <h2 className="text-4xl font-extrabold mb-12 text-centertracking-wide">
            Technologies & Tools
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            {/* Web Development Card */}
            <div
              className=" rounded-2xl p-8 shadow-xl hover:shadow-indigo-500/50 md:shadow-black shadow-indigo-500/50  transition-shadow duration-300 cursor-default"
              aria-label="Web Development technologies"
            >
              <h3 className="font-bold text-indigo-400 text-xl mb-6 tracking-wide uppercase border-b border-indigo-500 pb-3">
                Web Development
              </h3>
              <ul className="space-y-3  ">
                {[
                  { name: "React", icon: "⚛️" },
                  { name: "Next.js", icon: "⏭️" },
                  { name: "Tailwind CSS", icon: "🎨" },
                  { name: "MongoDB", icon: "🍃" },
                  { name: "Node.js & Express", icon: "🟢" },
                ].map(({ name, icon }) => (
                  <li
                    key={name}
                    className="flex items-center gap-3 hover:text-indigo-400 transition-colors duration-200"
                  >
                    <span className="text-lg">{icon}</span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Video Editing Card */}
            <div
              className="0 rounded-2xl p-8 shadow-xl  hover:shadow-purple-500/50 md:shadow-black shadow-purple-500 transition-shadow duration-300 cursor-default"
              aria-label="Video Editing software"
            >
              <h3 className="font-bold text-purple-400 text-xl mb-6 tracking-wide uppercase border-b border-purple-500 pb-3">
                Video Editing
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Adobe Premiere Pro", icon: "🎬" },
                  { name: "After Effects", icon: "✨" },
                  { name: "CapCut", icon: "✂️" },
                  { name: "Final Cut Pro", icon: "🍎" },
                  { name: "DaVinci Resolve", icon: "🎨" },
                ].map(({ name, icon }) => (
                  <li
                    key={name}
                    className="flex items-center gap-3 hover:text-purple-400 transition-colors duration-200"
                  >
                    <span className="text-lg">{icon}</span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>


        {/* Video Editing Packages Info */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="py-10 max-w-4xl mx-auto text-center text-base sm:text-lg leading-relaxed tracking-wide"
        >
          <p>
            At The Freelancer Shop, we offer a variety of video editing packages including
            <strong> simple edits</strong>, <strong>motion graphics</strong>, and <strong>commercial ad creation</strong>.
            Whether you need quick social media content or detailed promotional videos,
            we use industry-standard tools like After Effects, Premiere Pro, and CapCut to deliver high-quality results tailored to your needs.
          </p>
        </motion.section>

        {/* Testimonial Section */}
        <section className="py-20 max-w-3xl mx-auto px-4">
          <blockquote className="border-l-4 border-indigo-400 pl-6 italic text-lg  max-w-xl mx-auto">
            “Working with The Freelancer Shop was an absolute pleasure. Their
            attention to detail in both video editing and website design exceeded our expectations.
            Highly recommended for anyone seeking professional digital solutions.”
          </blockquote>
          
          <p className="mt-6 text-right font-semibold text-indigo-500">— Happy Client</p>
        </section>
      </main>
    </motion.div>
  );
};

export default Home;
