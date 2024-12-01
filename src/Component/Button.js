import { FaWhatsapp } from "react-icons/fa";

function Btn (){

    return(
        <div className="my-[22px] flex w-full justify-center">
        <button className="btn bg-[#FFFFFF1C] hover:bg-[#93d86e] rounded-[50px] font-semibold items-center flex px-[26px] h-[52px] text-white opacity-60  ">
               <FaWhatsapp className="btn-whatapp" />
                Get in touch
               </button>
               </div>
    )
}


export default Btn;
