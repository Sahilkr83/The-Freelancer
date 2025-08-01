import React from 'react'
import homePAgeImg from "../../assests/homePageImg.webp"
import simpleImg from '../../assests/Simple.jpeg.webp'
import motionGraphic from '../../assests/news_image_3269.webp'
import commercial from '../../assests/Simple Edits.webp'
import Frame from '../Component/Frame.js';
import Types from '../Component/Types.js';
import Tools from '../Component/Tools.js';

import urls from '../../Url Files/Urls.js';
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion';

const Homepage = () => {
  return (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
    <main className='text-white relative pt-7 lg:px-7 mx-auto max-w-[1460px] w-11/12  z-30 '>
      
      <Helmet>
        <title>The Freelancer Shop – Video Editing & Web Design Services</title>
        <link rel="canonical" href="https://thefreelancer.shop/" />
        <meta name="description" content="Professional video editing, motion graphics, and responsive web design to elevate your brand. Hire freelance editors today!" />
        <meta name="keywords" content="video editing, freelance editor, motion graphics, commercial video editing, YouTube editing, web design services, The Freelancer Shop" />
        <meta name="author" content="The Freelancer Shop" />

        {/* Open Graph */}
        <meta property="og:title" content="The Freelancer Shop – Video Editing & Web Design Services" />
        <meta property="og:description" content="Elevate your brand with professional video editing, motion graphics, and creative web design services." />
        <meta property="og:image" content="https://thefreelancer.shop/assets/home-banner.png" />
        <meta property="og:url" content="https://thefreelancer.shop/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Freelancer Shop" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Freelancer Shop – Video Editing & Web Design Services" />
        <meta name="twitter:description" content="Transform your content into stunning visuals and interactive websites with expert freelance services." />
        <meta name="twitter:image" content="https://thefreelancer.shop/assets/home-banner.png" />
        <meta name="twitter:url" content="https://thefreelancer.shop/" />
        <meta name="twitter:site" content="@thefreelancer27" />
      </Helmet>

      <section className='py-[100px]'  aria-label="Hero Introduction">

        <h1 className='lg:text-[2.5rem] text-4xl font-bold pb-10 leading-[3.4rem]'>Welcome to The Freelancer - Your Hub for All Things Video Editing!</h1>
        <div className='flex lg:items-center img-section '>

          <img alt="Freelance Video Editing and Web Design Service - Homepage Banner" loading="lazy" rel="preload" src={homePAgeImg} width={875} height={450} />

          <div className='xl:w-[475px] w-full xl:pl-16 h-full pb-10 xl:pb-0'>
            <p className='lg:text-base text-sm '>Whether you're a content creator, business owner, or marketer, we specialize in transforming your raw footage into polished, professional videos that captivate your audience. From stunning visual effects to seamless transitions and compelling storytelling, we’re here to bring your creative vision to life. With expert editing and a keen eye for detail, we help you craft videos that stand out and make an impact. Let’s turn your ideas into exceptional videos that tell your story perfectly!</p>
          </div>

        </div>
        </section>
        <section className='flex flex-col justify-between py-10 w-full gap-5 text-center' id="services" aria-label="Service Types">

          <h2 className=' font-bold uppercase types-of-edit-heading '>We Offer To You</h2> 

          <div className=' flex justify-evenly flex-wrap'>

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
        video3={urls[0].simple3}/>
        
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

export default Homepage