import React from 'react'
import simpleImg from '../assests/Simple.jpeg.jpg'
import commercial from '../assests/Simple Edits.jpg'
import Frame from './Frame';
import Types from './Types';
import Tools from './Tools';
import simpleEdit1 from '../assests/Edits/Simple edits/sp1.mp4'
import simple2 from '../assests/Edits/Simple edits/sp2.mp4'
import simple3 from '../assests/Edits/Simple edits/sp3.mp4'

import ads1 from '../assests/Edits/Commercial/adEdit1.mp4'
const Homepage = () => {
  return (
    <div className='text-white pt-7 px-7 z-20 mx-auto max-w-[1460px] w-11/12 '>

        <h1 className='text-[2.5rem] font-bold'>Welcome to The Freelancer - Your Hub for All Things Video Editing!</h1>
        <div className='max-w-[450px]'>
        <p>Whether you're a content creator, business owner, or marketer, we specialize in transforming your raw footage into polished, professional videos that captivate your audience. From stunning visual effects to seamless transitions and compelling storytelling, we’re here to bring your creative vision to life. With expert editing and a keen eye for detail, we help you craft videos that stand out and make an impact. Let’s turn your ideas into exceptional videos that tell your story perfectly!</p>
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
        video1={simpleEdit1}
        video2={simple2}
        video3={simple3}/>
        
        <Frame
        editName="commercial"

        video1={ads1}
        video2={simple2}
        video3={simple3}

        number1="4." type1="Hook Elements"
        number2="5." type2="Color grading"
        number3="5." type3="Fastpace Editing"/>

        <Tools/>
        
    </div>
  )
}

export default Homepage