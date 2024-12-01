import { FaWhatsapp } from "react-icons/fa";

function Btn2 (){

    return(
        <div className="my-[22px] flex w-full justify-center">
        <button className="btn border-[#93d86e] border-solid border-[3px] text-[#93d86e] rounded-[50px] font-semibold items-center flex px-[26px] h-[52px]">
               <FaWhatsapp className="btn-whatapp w-[30px]" />
                See more
               </button>
        </div>
    )
}
export default Btn2;