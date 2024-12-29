import React from 'react'
import homePAgeImg from "../assests/homePageImg.png"
import simpleImg from '../assests/Simple.jpeg.jpg'
import commercial from '../assests/Simple Edits.jpg'
import Frame from './Frame';
import Types from './Types';
import Tools from './Tools';

import urls from '../Url Files/Urls';


const Homepage = () => {
  return (
    <div className='text-white pt-7 lg:px-7 z-20 mx-auto max-w-[1460px] w-11/12 '>
      <div className='py-[100px]'>
        <h1 className='lg:text-[2.5rem] text-4xl font-bold pb-10 leading-[3.4rem]'>Welcome to The Freelancer - Your Hub for All Things Video Editing!</h1>
        <div className='flex lg:items-center img-section '>
          <img alt='Home Page Img' src={homePAgeImg} width={875} height={450}/>
          <div className='lg:w-[475px] w-full lg:pl-16 h-full pb-10 lg:pb-0'>
            <p className='lg:text-base text-sm '>Whether you're a content creator, business owner, or marketer, we specialize in transforming your raw footage into polished, professional videos that captivate your audience. From stunning visual effects to seamless transitions and compelling storytelling, we’re here to bring your creative vision to life. With expert editing and a keen eye for detail, we help you craft videos that stand out and make an impact. Let’s turn your ideas into exceptional videos that tell your story perfectly!</p>
          </div>
        </div>
        </div>
        <div className='flex flex-col justify-between py-10 w-full gap-5 text-center'>

          <h2 className=' font-bold uppercase types-of-edit-heading '>We Offer To You</h2> 

          <div className=' flex justify-evenly '>

            <Types 
            img={simpleImg} 
            editType="Simple"
            />
            <Types 
            img={commercial} 
            editType="Commercial"
            />

          </div>

        </div>
        
        <Frame
        editName="Simple"
        video1={urls[0].simple1}
        video2={urls[0].simple2}
        video3={urls[0].simple3}/>
        
        <Frame
        editName="commercial"

        video1={urls[0].ad1}
        video2={urls[0].ad2}
        video3={urls[0].ad3}

        number1="4." type1="Hook Elements"
        number2="5." type2="Color grading"
        number3="5." type3="Fastpace Editing"/>

        <Tools/>
        
    </div>
  )
}

export default Homepage