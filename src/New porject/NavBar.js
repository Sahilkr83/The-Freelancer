import React from 'react'
import logo from "../assests/tf-removebg-preview.png"
import { NavLink, useNavigate } from 'react-router-dom';

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
    <div className='w-full h-fit relative z-30'>
      <div className='navbar mx-auto max-w-[1350px] w-11/12 justify-between items-center  pt-7 px-7 text-white flex  '>

        <img onClick={clickHandler2} src={logo} width={50} height={50} alt=''/>


        <div onClick={clickHandler2} className='gap-4 flex '>
          <NavLink>Home</NavLink>
        </div>

        <button onClick={clickHandler}><NavLink>Contact Us</NavLink></button>
        
      </div>
      <div className='absolute w-[110%] h-[1px] bg-white -bottom-5 opacity-50 left-0 '></div>
    </div>
  )
}

export default NavBar