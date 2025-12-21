'use client';

import React from 'react';
import videoPortfolioImg from "@/assets/videoPortfolio.webp";
import podcastImg from '@/assets/podcast.webp';
import simpleImg from '@/assets/Simple.jpeg.webp';
import motionGraphic from '@/assets/news_image_3269.webp';
import commercial from '@/assets/Simple Edits.webp';
import Frame from '@/component/Frame';
import Types from '@/component/Types';
import Tools from '@/component/Tools';
import urls from '@/component/urlfiles/Urls';
import { motion } from 'framer-motion';
import Image from 'next/image';

const VideoPortfolioPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <main className="  relative pt-14 px-6 sm:px-12 lg:px-20 mx-auto max-w-[1460px] w-full z-30 select-none">
        
        {/* Hero Section */}
        <section className="py-20" aria-label="Hero Introduction">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight max-w-5xl mx-auto text-center"
          >
            Transform Your Vision Into Cinematic Reality
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl lg:text-3xl pt-4 font-bold max-w-5xl mx-auto text-center "
          >
            The Freelancer — Expert Video Editing & Web Design Solutions
          </motion.h2>

          <div className="mt-10 flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-7xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                title="Professional video editing design Image"
                alt="Showcase of high-quality video editing Image"
                src={videoPortfolioImg}
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
              viewport={{ once: true }}
              className="max-w-xl text-center lg:text-left  text-base sm:text-lg leading-relaxed tracking-wide"
            >
              <p className="mb-6">
                At <strong>The Freelancer Shop</strong>, we don’t just edit videos — we craft stories that connect, inspire, and convert. Our editing style blends precision, artistry, and industry-leading techniques to give your content a cinematic edge.
              </p>
              <p className="mb-6">
                Whether you’re building your brand, launching a campaign, or leveling up your YouTube channel, we deliver professional-grade <span className="font-semibold">color grading</span>, <span className="font-semibold">motion graphics</span>, and <span className="font-semibold">seamless transitions</span> that captivate audiences.
              </p>
              <p>
                From sleek high-impact promotional videos, we combine cutting-edge editing tools like <strong>Premiere Pro</strong> and <strong>After Effects</strong> to make sure your brand stands out — both visually and strategically.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className='flex flex-col justify-between py-10 w-full gap-5 text-center' id="services" aria-label="Service Types">
          <h3 className='font-bold uppercase types-of-edit-heading'>Our Editing Expertise</h3> 
          <div className='flex justify-between flex-wrap'>
            <Types href='#podcast' img={podcastImg} editType="Podcast Editing" scale='1'/>
            <Types href='#simple' img={simpleImg} editType="Basic Editing" scale='1.8'/>
            <Types href='#motion' img={motionGraphic} editType="Motion Graphics" scale='1.8'/>
            <Types href='#commercial' img={commercial} editType="Commercial Editing" scale='1'/>
          </div>
        </section>
        
        {/* Podcast Frame */}
        <Frame
          editName="Podcast"
          id='podcast'
          videos={[urls[0].pd2,urls[0].pd1,urls[0].pd3,urls[0].pd4,urls[0].pd5,urls[0].pd6,urls[0].pd7]}
        />
        {/* Basic Editing Frame */}
        <Frame
          editName="Basic Editing"
          id='simple'      
          videos={[urls[0].simple1,urls[0].simple2,urls[0].simple3]}
          items={[
            { number: "4.", type: "Smooth Transitions" },
            { number: "5.", type: "Color Correction" },
            { number: "6.", type: "Audio Enhancement" }
          ]}
        />

        {/* Motion Graphics Frame */}
        <Frame
          editName="Motion Graphics"
          id='motion'
          videos={[urls[0].motion1,urls[0].motion3,urls[0].motion2]}
          items={[
            { number: "4.", type: "Dynamic Visual Hooks" },
            { number: "5.", type: "Custom Motion Transitions" },
            { number: "6.", type: "High-Impact Animation" }
          ]}
        />

        {/* Commercial Editing Frame */}
        <Frame
          editName="Commercial Editing"
          id='commercial'
          videos={[urls[0].ad1,urls[0].ad2,urls[0].ad3]}
          items={[
            { number: "4.", type: "Brand-Centric Storytelling" },
            { number: "5.", type: "Advanced Color Grading" },
            { number: "6.", type: "Fast-Paced Ad Sequencing" }
          ]}
        />

        {/* About Our Process */}
        <motion.section         
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="py-10 max-w-4xl mx-auto text-center  text-base sm:text-lg leading-relaxed tracking-wide"
        >
          <p>
            Every project we take on is approached with one goal: <strong>maximum impact</strong>. We edit with precision, using top-tier software like <strong>Adobe Premiere Pro</strong>, <strong>After Effects</strong>, and <strong>CapCut Pro</strong> to produce crisp, engaging videos that tell your story exactly how it should be told.
          </p>
          <p className="mt-4">
            Whether you need quick-turn social media edits or full-scale commercial production, <strong>The Freelancer Shop</strong> delivers a polished, professional product — on time, every time.
          </p>
        </motion.section>

        <Tools/>      
      </main>
    </motion.div>
  );
};

export default VideoPortfolioPage;

