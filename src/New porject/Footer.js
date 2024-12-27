import React from 'react'
import { FaLongArrowAltRight,FaFacebookF,FaTwitter, FaInstagram,FaYoutube} from "react-icons/fa";
import  href  from "./Link";
import backgroundVideo from "../assests/background video.mp4"

const Footer = () => {

// final

  return (
    <div className='bg-black z-10  mx-auto'>


       <div className=' overflow-clip yt'>

       <div className='w-full max-h-[100px] overflow-clip relative flex  items-center pb-[56.25%] video'>

        <div className=' w-full h-full -z-20  backVideo place-items-center'><video  autoPlay muted loop src={backgroundVideo}></video></div>

        <div className='text-white py-[20px] flex justify-center text-center w-full  absolute top-0 footer-video-front'>

            <div className='w-[685px] flex flex-col items-center  gap-3 '>
                <h1 className=' font-semibold footer-heading'>Ready To Capture Your <br></br>Brand Vision?</h1>

                <p className='pb-3 footer-text'>"Where creativity meets precision, we bring your vision to life—crafting stunning videos that tell your story and leave a lasting impression."
                </p>

                <button className='flex text-black gap-3 items-center justify-center text-[12px] font-semibold bg-[#a8e3f5] rounded-[30px] p-3'>
                    <FaLongArrowAltRight /> Contact Us
                </button>
            </div>
           
        </div>

       </div>
       
       </div>

        <div className='text-white px-7 bg-black flex flex-col justify-between max-w-[1350px] mx-auto'>
            <div className='flex justify-between  pb-[100px] footer'>
            <div className='footer-last'>
                <h1 className='text-[#a8e3f5]  font-bold footer-second-heading'>The Freelancer_</h1>
                <p className='pl-3' id='footer-text' itemType='email'>support@domain.com</p>
                <p className='pl-3' id='footer-text' itemType='number'>(+62) 81 115 3568</p>
                <p className='pl-3' id='footer-text' itemType='email'>Jl. Pantai Berawa, Tibubeneng, Kuta, Bali</p>
                
            </div>
            <div className='text-[#a8e3f5]  flex   footer-icons'>
                <a href={href[0].facebook} target='_blank'  rel="noopener noreferrer"><FaFacebookF /></a>
                <a href={href[0].instagram} target='_blank' rel="noopener noreferrer" ><FaInstagram/></a>
                <a href={href[0].youtube} target='_blank'  rel="noopener noreferrer"><FaYoutube/></a>
                <a href={href[0].twitter} target='_blank'  rel="noopener noreferrer"><FaTwitter/></a>
            </div> 
            </div>

            <hr className='opacity-50'/>

            <div className='flex justify-between py-10'>
                <p>Video Production Agency By The Freelancer</p>
                <p>Copyright © 2024. All rights reserved</p>
            </div>
            
        </div>
    </div>
  )
}

export default Footer