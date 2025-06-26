import { FaLongArrowAltRight,FaFacebookF,FaTwitter, FaInstagram,FaYoutube} from "react-icons/fa";

import  href  from "../../Url Files/links";
import { useNavigate } from 'react-router-dom';
import { useState,useEffect, createContext } from "react";
import { AppContext } from "../../Context/AppContext";


const Footer = () => {

  const { setContactOn,contactOn} = createContext(AppContext)
  
  const navigate = useNavigate();

  function clickHandler (){
    setContactOn(true)
    navigate("/contactus")
  }
  const [readyToPlay , setReadyToPlay] = useState(false)

  useEffect(() => {
    const videoAll = document.querySelectorAll('video');
    videoAll.forEach((video) => {
      try {
        video.play();
      } catch (error) {
        alert.error("Autoplay failed:", error);
      }
    });
  }, []);

  return (
    <div className='bg-black z-10  mx-auto w-full'>


       <div className={` overflow-clip yt ${
        contactOn ? 'hidden': 'block'
       }`}>

       <div className='w-full max-h-[100px] overflow-clip relative flex  items-center pb-[56.25%] video'>

        <div className=' w-full h-full -z-20  backVideo place-items-center'><video playsInline autoPlay muted loop src="https://res.cloudinary.com/dxp7dcmvr/video/upload/q_auto,f_auto/v1735458285/background_video_dbrrbr.mp4" preload="auto"  onCanPlayThrough={()=> setReadyToPlay(true)} style={{display: readyToPlay ? "block" : "none"}} ></video></div>

        <div className='text-white py-[20px] flex justify-center text-center w-full  absolute top-0 footer-video-front'>

            <div className='w-[685px] flex flex-col items-center  gap-3 '>
                <h1 className=' font-semibold footer-heading'>Ready To Capture Your <br></br>Brand Vision?</h1>

                <p className='pb-3 footer-text'>"Where creativity meets precision, we bring your vision to life—crafting stunning videos that tell your story and leave a lasting impression."
                </p>

                <button onClick={clickHandler} className='flex text-black gap-3 items-center justify-center text-[12px] font-semibold bg-[#a8e3f5] rounded-[30px] p-3'>
                    <FaLongArrowAltRight /> Contact Us
                </button>
            </div>
           
        </div>

       </div>
       
       </div>

        <div className='text-white px-7 bg-black flex flex-col justify-between max-w-[1350px] mx-auto w-11/12'>
            <div className='flex justify-between  pb-[100px] footer'>
            <div className='footer-last'>
                <h1 className='text-[#a8e3f5]  font-bold footer-second-heading'>The Freelancer_</h1>
                <a className='pl-3 ' id='footer-text' href='mailto:thefreelancers27@gmail.com'>thefreelancers27@gmail.com</a>
                <a className='pl-3' id='footer-text'  href='tel:+917004505998' >(+91) 700 450 5998</a>
                {/* <p className='pl-3' id='footer-text' itemType='email'>Jl. Pantai Berawa, Tibubeneng, Kuta, Bali</p> */}
                
            </div>
            <div className='text-[#a8e3f5]  flex   footer-icons'>
                <a href={href[0].facebook} target='_blank'  rel="noopener noreferrer"><FaFacebookF /></a>
                <a href={href[0].instagram} target='_blank' rel="noopener noreferrer" ><FaInstagram/></a>
                <a href={href[0].youtube} target='_blank'  rel="noopener noreferrer"><FaYoutube/></a>
                <a href={href[0].twitter} target='_blank'  rel="noopener noreferrer"><FaTwitter/></a>
            </div> 
            </div>

            <hr className='opacity-50'/>

            <div className='flex justify-between gap-4 py-10 text-center'>
                <p className="sm:text-base text-xs ">Video Production Agency By The Freelancer</p>
                <p className="sm:text-base text-xs">Copyright © 2024. All rights reserved</p>
            </div>
            
        </div>
    </div>
  )
}

export default Footer