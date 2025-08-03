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
      {/* <Head>
        <title></title>
        <link rel="canonical" href="https://thefreelancer.shop/" />
        <meta
          name="description"
          content="Professional video editing, motion graphics, and responsive web design to elevate your brand. Hire freelance editors today!"
        />
        <meta
          name="keywords"
          content="video editing, freelance editor, motion graphics, commercial video editing, YouTube editing, web design services, The Freelancer Shop"
        />
        <meta name="author" content="The Freelancer Shop" />

        {/* Open Graph 
        <meta property="og:title" content="The Freelancer Shop – Video Editing & Web Design Services" />
        <meta
          property="og:description"
          content="Elevate your brand with professional video editing, motion graphics, and creative web design services."
        />
        <meta property="og:image" content="https://thefreelancer.shop/assets/home-banner.png" />
        <meta property="og:url" content="https://thefreelancer.shop/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Freelancer Shop" />

        {/* Twitter Card
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Freelancer Shop – Video Editing & Web Design Services" />
        <meta
          name="twitter:description"
          content="Transform your content into stunning visuals and interactive websites with expert freelance services."
        />
        <meta name="twitter:image" content="https://thefreelancer.shop/assets/home-banner.png" />
        <meta name="twitter:url" content="https://thefreelancer.shop/" />
        <meta name="twitter:site" content="@thefreelancer27" />
      </Head> */}

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
            className="text-3xl sm:text-5xl lg:text-6xl  font-extrabold leading-tight max-w-5xl mx-auto text-center text-white bg-clip-text "
          >
            Welcome to The Freelancer
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-2xl sm:text-4xl lg:text-5xl pt-4 font-bold max-w-5xl mx-auto text-center text-white bg-clip-text "
          >
            Your Hub for All Things Video Editing!
          </motion.h1>

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
                Whether you&apos;re a content creator, business owner, or marketer, we
                specialize in transforming your raw footage into polished,
                professional videos that captivate your audience. From stunning
                visual effects to seamless transitions and compelling storytelling,
                we bring your creative vision to life.
              </p>
              <p>
                With expert editing and a keen eye for detail, we help you craft
                videos that stand out and make an impact. Let&apos;s turn your ideas
                into exceptional videos that tell your story perfectly!
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

        <Tools/>
            
      </main>
    </motion.div>

  )
}

export default Home
