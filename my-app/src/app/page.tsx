'use client';

import React from 'react'
import homePAgeImg from "@/app/assests/homePageImg.webp"
import simpleImg from '@/app/assests/Simple.jpeg.webp'
import motionGraphic from '@/app/assests/news_image_3269.webp'
import commercial from '@/app/assests/Simple Edits.webp'
import Frame from '@/app/component/Frame';
import Types from '@/app/component/Types';
import Tools from '@/app/component/Tools';
import urls from '@/app/urlfiles/Urls';
import { motion } from 'framer-motion';
// import Head from 'next/head'
import Image from 'next/image'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >

      <main className="text-white relative pt-14 px-6 sm:px-12 lg:px-20 mx-auto max-w-[1460px] w-full z-30 select-none">
        {/* Hero Section */}
        <section
          className="py-20"
          aria-label="Hero Introduction"
        >
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-2xl sm:text-4xl lg:text-5xl  font-extrabold leading-tight max-w-5xl mx-auto text-center text-white bg-clip-text "
          >
            Pro Video Editing & Web Design
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-xl text-center lg:text-left text-gray-300 text-base sm:text-lg leading-relaxed tracking-wide"
            >
              <p className="mb-6">
                Welcome to <strong>The Freelancer Shop</strong> — your hub for expert-level
                <strong> video editing</strong> and <strong>web design</strong> services.
                We specialize in turning raw footage into cinematic videos and crafting sleek,
                modern websites tailored to your brand’s voice.
              </p>
              <p className="mb-6">
                Whether you're a content creator, entrepreneur, or agency, we deliver
                professional-grade <strong>editing</strong> with seamless transitions, motion graphics,
                and dynamic storytelling to help you grow your online presence.
              </p>
              <p>
                Our <strong>web development</strong> services include building fast, SEO-friendly sites
                using technologies like <strong>React</strong>, <strong>Next.js</strong>, <strong>Tailwind CSS</strong>,
                and <strong>MongoDB</strong>. With attention to performance, responsiveness, and user experience,
                we ensure your site not only looks great but ranks high too.
              </p>
            </motion.div>

          </div>
        </section>

        <section className='flex flex-col justify-between py-10 w-full gap-5 text-center' id="services" aria-label="Service Types">

          <h2 className=' font-bold uppercase types-of-edit-heading '>We Offer To You</h2> 

          <div className=' flex justify-between flex-wrap'>

            <Types 
            href='#simple'
            img={simpleImg} 
            editType="Simple Edits"
            />
            <Types 
            href='#motion'
            img={motionGraphic} 
            editType="Motion graphic"
            />
            <Types 
            href='#commercial'
            img={commercial} 
            editType="Commercial Edits"
            />

          </div>

        </section>
        
            
        <Frame
        editName="Simple"
        id='simple'
        video1={urls[0].simple1}
        video2={urls[0].simple2}
        video3={urls[0].simple3}
        />
            
        <Frame
        editName="motion graphic"
            id='motion'
            video1={urls[0].motion1}
            video2={urls[0].motion3}
            video3={urls[0].motion2}

            number1="4." type1="Hook Elements"
            number2="5." type2="Motion Transition"
            number3="6." type3="Fastpace Editing"/>

        <Frame
        editName="commercial"
            id='commercial'
            video1={urls[0].ad1}
            video2={urls[0].ad3}
            video3={urls[0].ad2}

            number1="4." type1="Hook Elements"
            number2="5." type2="Color grading"
            number3="6." type3="Fastpace Editing"/>

          <section className="py-10 max-w-4xl mx-auto text-center text-gray-300 text-base sm:text-lg leading-relaxed tracking-wide">
            <p>
              At The Freelancer Shop, we offer a variety of video editing packages including
              <strong> simple edits</strong>, <strong>motion graphics</strong>, and <strong>commercial ad creation</strong>.
              Whether you need quick social media content or detailed promotional videos,
              we use tools like After Effects, Premiere Pro, and CapCut to deliver high-quality results.
            </p>
          </section>


        <Tools/>
            
      </main>
    </motion.div>

  )
}

export default Home
