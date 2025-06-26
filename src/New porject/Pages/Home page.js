import React from 'react'
import homePAgeImg from "../../assests/homePageImg.webp"
import simpleImg from '../../assests/Simple.jpeg.jpg'
import motionGraphic from '../../assests/news_image_3269.webp'
import commercial from '../../assests/Simple Edits.jpg'
import Frame from '../Component/Frame';
import Types from '../Component/Types';
import Tools from '../Component/Tools';

import urls from '../../Url Files/Urls';


const Homepage = () => {
  return (
    <div className='text-white pt-7 lg:px-7 z-20 mx-auto max-w-[1460px] w-11/12 '>
      <div className='py-[100px]'>

        <h1 className='lg:text-[2.5rem] text-4xl font-bold pb-10 leading-[3.4rem]'>Welcome to The Freelancer - Your Hub for All Things Video Editing!</h1>
        <div className='flex lg:items-center img-section '>

          <img alt='Home Page Img' rel="preload" src={homePAgeImg} width={875} height={450} />

          <div className='xl:w-[475px] w-full xl:pl-16 h-full pb-10 xl:pb-0'>
            <p className='lg:text-base text-sm '>Whether you're a content creator, business owner, or marketer, we specialize in transforming your raw footage into polished, professional videos that captivate your audience. From stunning visual effects to seamless transitions and compelling storytelling, we’re here to bring your creative vision to life. With expert editing and a keen eye for detail, we help you craft videos that stand out and make an impact. Let’s turn your ideas into exceptional videos that tell your story perfectly!</p>
          </div>

        </div>
        </div>
        <div className='flex flex-col justify-between py-10 w-full gap-5 text-center'>

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

        </div>
        
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
        
    </div>
  )
}

export default Homepage