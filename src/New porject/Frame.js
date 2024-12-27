import React from 'react'
import { FaSearch } from "react-icons/fa";
import iphoneFrame from "../assests/iphone_frame.png"


const Frame = ({video1,video2,video3,editName,number1,number2,number3,type1,type2,type3}) => {
  return (
    <div className='flex flex-col items-center  gap-20 mb-20'>

          <div className='frame-text  py-2 px-8 font-semibold uppercase text-[#a8e3f5] border-[#a8e3f5] border-4 w-fit flex gap-5 items-center'>
            <FaSearch /> 
            <h1>{editName} edit</h1>
           </div>

          <div className='flex items-center justify-around w-full frame'>

            <div className='relative w-fit h-fit '>
              <img src={iphoneFrame} alt='frame' className=' z-10'   />
              <video className='absolute top-0 z-10 right-3 w-[185px] h-[420px]'autoPlay controls muted loop src={video1} loading="lazy" />
            </div>

            <div className='relative w-fit h-fit '>
              <img src={iphoneFrame} className=' z-10'   alt=''/>
              <video className='absolute top-0 z-10 right-3 w-[185px] h-[420px]'autoPlay controls muted loop src={video2} loading="lazy" />
            </div>

            <div className='relative w-fit h-fit '>
              <img src={iphoneFrame} className=' z-10' alt=''/>
              <video className='absolute top-0 z-10 right-3 w-[185px] h-[420px]'autoPlay controls muted loop src={video3} loading="lazy" />
            </div>

            <div className='flex flex-col text-[1.5rem] gap-4 '>
              <h1 className='uppercase text-[2rem] font-semibold text-[#a8e3f5]'>{editName} edit</h1>
              <ol className='flex flex-col gap-3'>
                <li><span className='text-[#a8e3f5]'>1.</span> Fine  Cuts</li>
                <li><span className='text-[#a8e3f5]'>2.</span> Fine  Transition</li>
                <li><span className='text-[#a8e3f5]'>3.</span> Subtitles</li>
                <li><span className='text-[#a8e3f5]'>{number1}</span> {type1}</li>
                <li><span className='text-[#a8e3f5]'>{number2}</span> {type2}</li>
                <li><span className='text-[#a8e3f5]'>{number3}</span> {type3}</li>
              </ol>
            </div>
          </div>
          
        </div>
  )
}

export default Frame