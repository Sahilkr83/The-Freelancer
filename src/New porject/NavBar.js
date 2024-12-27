import React from 'react'
import logo from "../assests/tf-removebg-preview.png"
import { useNavigate } from 'react-router-dom';

const NavBar = ({setContactOn}) => {

  const navigate = useNavigate();

  function clickHandler (){
    setContactOn(true)
    navigate("/contactus")
  }
  function clickHandler2 (){
    setContactOn(false)
    navigate("/")
  }

  return (
    <div className='mx-auto max-w-[1160px] w-11/12 justify-between items-center  pt-7 px-7 text-white flex z-20'>

        <img onClick={clickHandler2} src={logo} width={50} height={50} alt=''/>
        
        
        <div onClick={clickHandler2} className='gap-4 flex '>
          Home
        </div>
        
        <button onClick={clickHandler}>Contact Us</button>
    </div>
  )
}

export default NavBar