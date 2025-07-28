import React, { useContext } from 'react'
import logo from "../../assests/logo/TheFreelancer logo.webp"
import {Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext.js';

const NavBar = () => {

  const {setContactOn} = useContext(AppContext)
  const {user} = useContext(AppContext)
  const navigate = useNavigate();


  function clickHandler2 (){
    setContactOn(false)
    navigate("/")
  }

  return (
    <div className='w-full h-fit relative z-30'>
      <div className='navbar mx-auto max-w-[1350px] w-11/12 justify-between items-center  pt-7 px-7 text-white flex  '>

        <img loading="lazy" onClick={clickHandler2} src={logo} width={50} height={50} alt='logo'/>


        <div className='gap-4 flex '>
          <Link to="/" className='text-white' onClick={() => setContactOn(false)}>Home</Link>
          <Link to="/contactus"className='text-white' onClick={() => setContactOn(true)}>Contact Us</Link>
        </div>

        <div className='flex gap-x-2'>
          {user ? 
          <Link to="/profile" className="flex flex-col text-white justify-center items-center">
            <img className="h-10 w-10 rounded-full object-cover"
              src={user.image}
              alt={`${user.name}'s profile`}
              loading="lazy"
            />
            <p>{user.name?.split(" ")[0]}</p>
          </Link>
        : <>
           <Link to="/login" className='nav-btn items-center flex text-white'>Login</Link>
           <Link to="/signup" className='nav-btn nav-btn-2 items-center flex text-white'>Sign Up</Link> </>}
          
        </div>
        
      </div>
      <div className='absolute w-[110%] h-[1px] bg-white -bottom-5 opacity-50 left-0 '></div>
    </div>
  )
}

export default NavBar