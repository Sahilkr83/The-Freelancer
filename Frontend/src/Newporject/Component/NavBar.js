import React, { useContext } from 'react'
import logo from "../../assests/logo/TheFreelancer logo.png"
import {useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext.js';

const NavBar = () => {

  const {setContactOn} = useContext(AppContext)
  const {user} = useContext(AppContext)
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

        <img onClick={clickHandler2} src={logo} width={50} height={50} alt='logo'/>


        <div className='gap-4 flex '>
          <button onClick={clickHandler2} >Home</button>
          <button onClick={clickHandler}>Contact Us</button>
        </div>

        <div className='flex gap-x-2'>
          {user ? 
          <div className='flex flex-col justify-center items-center' onClick={() => navigate("/profile")}> 
            <img className="h-10 w-10 rounded-full object-cover"
            src={user.image}
            alt=""
           /> <p>{user.name?.split(" ")[0]}</p></div>
        : <>
           <button className=' nav-btn ' onClick={() => navigate("/login")}>Login</button>
          <button className=' nav-btn nav-btn-2' onClick={() => navigate("/signup")}>Sign Up</button> </>}
          
        </div>
        
      </div>
      <div className='absolute w-[110%] h-[1px] bg-white -bottom-5 opacity-50 left-0 '></div>
    </div>
  )
}

export default NavBar