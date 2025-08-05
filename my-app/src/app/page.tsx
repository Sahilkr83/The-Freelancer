'use client';

import React from 'react'
import homePAgeImg from "@/assets/homePageImg.webp"
import simpleImg from '@/assets/Simple.jpeg.webp'
import motionGraphic from '@/assets/news_image_3269.webp'
import commercial from '@/assets/Simple Edits.webp'
import Frame from '@/component/Frame';
import Types from '@/component/Types';
import Tools from '@/component/Tools';
import urls from '@/urlfiles/Urls';
import { motion } from 'framer-motion';
// import Head from 'next/head'
import Image from 'next/image'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      <main className="text-white relative pt-14 px-6 sm:px-12 lg:px-20 mx-auto max-w-[1460px] w-full z-30 select-none">
        {/* Hero Section */}
        <section
          className="py-20"
          aria-label="Hero Introduction"
        >
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-2xl sm:text-4xl lg:text-5xl  font-extrabold leading-tight max-w-5xl mx-auto text-center text-white bg-clip-text "
          >
            Pro Video Editing & Web Design
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl sm:text-43xl lg:text-4xl pt-4 font-bold max-w-5xl mx-auto text-center text-white bg-clip-text "
          >
            By The Freelancer - Your Hub for Creative Digital Solutions
          </motion.h2>

          <div className="mt-10 flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-7xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                title="Our professional video editing and web design service banner"
                alt="Freelance Video Editing and Web Design Service - Homepage Banner"
                rel="preload"
                src={homePAgeImg}
                width={875}
                height={450}
                className="block rounded-xl"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-xl text-center lg:text-left text-gray-300 text-base sm:text-lg leading-relaxed tracking-wide"
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

        <section className='flex flex-col justify-between py-10 w-full gap-5 text-center' id="services" aria-label="Service Types">

          <h3 className=' font-bold uppercase types-of-edit-heading '>We Offer To You</h3> 

          <div className=' flex justify-between flex-wrap'>

            <Types 
            href='#simple'
            img={simpleImg} 
            editType="Basic Editing "
            />
            <Types 
            href='#motion'
            img={motionGraphic} 
            editType="Motion Graphics " 
            />
            <Types 
            href='#commercial'
            img={commercial} 
            editType="Commercial Editing "
            />

          </div>

        </section>
        
            
        <Frame
        editName="Basic"
        id='simple'
        video1={urls[0].simple1}
        video2={urls[0].simple2}
        video3={urls[0].simple3}
        />
            
        <Frame
        editName="Motion Graphics"
        id='motion'
        video1={urls[0].motion1}
        video2={urls[0].motion3}
        video3={urls[0].motion2}
        number1="4." type1="Hook Elements"
        number2="5." type2="Motion Transition"
        number3="6." type3="Fastpace Editing"/>

        <Frame
        editName="Commercial"
        id='commercial'
        video1={urls[0].ad1}
        video2={urls[0].ad3}
        video3={urls[0].ad2}
        number1="4." type1="Hook Elements"
        number2="5." type2="Color grading"
        number3="6." type3="Fastpace Editing"
        />

        <motion.section         
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-10 max-w-4xl mx-auto text-center text-gray-300 text-base sm:text-lg leading-relaxed tracking-wide">
          <p>
            At The Freelancer Shop, we offer a variety of video editing packages including
            <strong> simple edits</strong>, <strong>motion graphics</strong>, and <strong>commercial ad creation</strong>.
            Whether you need quick social media content or detailed promotional videos,
            we use tools like After Effects, Premiere Pro, and CapCut to deliver high-quality results.
          </p>
        </motion.section>


        <Tools/>
            {/* <motion.div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="w-16 h-16 rounded-full shadow-xl border-4 border-white overflow-hidden bg-white">
        <Image
          src="/avatar.png" // Replace with your image path
          alt="Animated Avatar"
          width={64}
          height={64}
          className="object-cover"
        />
      </div>
    </motion.div> */}
            
      </main>
    </motion.div>

  )
}

export default Home
