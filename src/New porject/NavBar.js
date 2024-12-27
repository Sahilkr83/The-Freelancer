import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assests/tf-removebg-preview.png"
const NavBar = () => {

  function click() {
    console.log('link clicked');
  }

  return (
    <div className='mx-auto max-w-[1160px] w-11/12 justify-between items-center  pt-7 px-7 text-white flex z-20'>

        <img src={logo} width={50} height={50} alt=''/>
        
        
        <div className='gap-4 flex '>
          <NavLink> Home</NavLink>
          <NavLink> Project</NavLink>
          <NavLink> About us</NavLink>
        </div>
        
        <button onClick={click}>Contact Us</button>
    </div>
  )
}

export default NavBar