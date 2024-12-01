import Btn from "./Button";
import Btn1 from "./Btn1";
import Youtube from "./Youtube";
import Youtube2 from "./Youtube2";

import Btn2 from "./Btn2";
import img1 from './img/1 (1).png'
import img2 from './img/2.png'
import img3 from './img/3.png'

import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";


import { href ,Link } from "./Link";

function Main (){
    return(
        <div className="p-[25px] w-[28rem] overflow-hidden">
            
        <div className=" main  bg-[#425242]">
            <h1 className="mb-[22px] text-[2.625rem] font-bold text-[#76d431]" >The Freelancer :&#41;</h1>
            <p className="text-white opacity-60 my-[22px] text-[1.26rem]">Quality over Quantity</p>
            <p className="text-[#CEE8C88D]  text-[12.8px] leading-6 my-[22px]">I am professional in both video editing and graphic design, with expertise in industry-standard software, including Adobe Premiere Pro and PhotoShop</p>
            
               <Btn/>
           <div className="flex justify-center gap-4">
            <div className="w-[35px] h-[35px] bg-[#071c05] text-[#30ba03] font-bold text-[23px] text-center rounded-[6px] img">Pr</div>
            <div className="w-[35px] h-[35px] bg-[#071c05] text-[#30ba03] font-bold text-[23px] text-center rounded-[6px] img">Ps</div>
           </div>
        </div>
        
        <div className=" bg-[#3b473b] h-10"></div>

        <div className=" bg-[#425242]  p-[40px] ">
            <h1 className="text-[#76d431] mb-[22px] text-[26px] font-semibold">
                Video Edition
            </h1>
            
            <p className="text-white opacity-60 my-[22px] text-[14.5px]">Talk-head edit</p>
            <p className="text-white opacity-60 text-[14.5px] pl-[34px]  my-[22px]">Not official - Editedby The Freelancer</p>

           <Youtube link={Link[0].src}/>

           <p className="text-white opacity-60 text-[14.5px] pl-[34px]  my-[22px]">Influencer - English</p>

           <Youtube link={Link[1].src}/>

           <Btn1/>
           <Btn2/>

           <div className=" h-10"></div>

           <p className="text-white opacity-60 my-[22px] text-[14.5px]">Influener</p>
           <p className="text-[#CEE8C88D]  text-[12.8px] leading-6 my-[22px]">The Real world by Adrew Tate</p>
           <Youtube2 link={Link[0].src}/>

           <p className="text-[#CEE8C88D]  text-[12.8px] leading-6 my-[22px]">How I Recover 4,47,000</p>

           <Youtube2 link={Link[1].src}/>

           <Btn1/>
           <Btn2/>

           <h1 className="text-[#76d431] mb-[22px] text-[26px] font-semibold">
             Client review
            </h1>
            <p className="text-white opacity-70 my-[22px] text-[14.5px]">For Long Form YT edit</p>

            <img src={img1} width='200px' className="img-1" alt=""></img>
            <br/>
            <img src={img1} width='200px' className="img-1 img-2 " alt=""></img>
            <br/>
            <img src={img2} width='200px' className="img-1 " alt=""></img>
            <br/>
            <img src={img2} width='200px' className="img-1 img-2" alt=""></img>
            <br/>
            <img src={img3} width='200px' className="img-1" alt=""></img>
            <br/>
            <img src={img3} width='200px' className="img-1 img-2" alt=""></img>
            <br/>
            
            <div className="flex justify-center">
                <h1 className="text-[#76d431] mb-[22px] text-[16.5px] font-semibold">
                Let work together!
                </h1>
            </div>
            <br/>

            <div className="flex justify-center items-center gap-3 icon">
            <a href={href[0].Instagram}>
               <FaInstagram size={24} className="icon-1"/>
            </a>
            <a href={href[0].Phone}>
               <FaPhoneAlt size={20} className="icon-1"/>
            </a>
            <a href={href[0].Telegram}>
              <FaTelegramPlane size={24} className="icon-1"/>
            </a>
            <a href={href[0].Whatsapp}>
               <FaWhatsapp size={24} className="icon-1"/>
            </a>
            
            </div>
            
        </div>
        <div className=" bg-[#3b473b] h-28 rounded-b-[50px] pb-[22px]"></div>
        </div>
    )
}

export default Main;