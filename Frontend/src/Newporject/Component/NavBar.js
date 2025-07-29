import React, { useContext, useState } from 'react'
import logo from "../../assests/logo/TheFreelancer logo.webp"
import {Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext.js';

const NavBar = () => {

  const {setContactOn} = useContext(AppContext)
  const {user} = useContext(AppContext)
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function clickHandler2 (){
    setContactOn(false)
    navigate("/")
  }

  return (
<div className='w-full h-fit relative'>
  {/* Top Nav */}
  <div className='navbar mx-auto max-w-[1350px] w-11/12 flex justify-between items-center pt-7 px-4 text-white'>

    {/* Logo */}
    <img
      loading="lazy"
      onClick={clickHandler2}
      src={logo}
      width={50}
      height={50}
      alt='logo'
      className="cursor-pointer"
    />

    {/* Main Nav Links */}
    <div className='hidden md:flex gap-6 items-center font-medium text-white'>
      <Link to="/" onClick={() => setContactOn(false)} className=" underline-offset-0 text-white">
        Home
      </Link>
      <Link to="/web-development" onClick={() => setContactOn(true)} className="text-white">
        Web Portfolio
      </Link>
    </div>

    {/* User Actions */}
    <div className="hidden md:flex items-center gap-4">
      <Link to="/contactus" className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition" onClick={() => setContactOn(true)}>
        Contact Us
      </Link>

      {user ? (
        <Link to="/profile" className="flex items-center gap-2">
          <img
            src={user.image}
            alt="User"
            className="h-10 w-10 rounded-full object-cover border border-white"
          />
          <span>{user.name?.split(" ")[0]}</span>
        </Link>
      ) : (
        <>
          <Link to="/login" className="px-3 py-1.5 border border-white rounded-md hover:bg-white hover:text-black transition">
            Login
          </Link>
          <Link to="/signup" className="px-3 py-1.5 bg-blue-600 rounded-md hover:bg-blue-800 hover:text-white transition font-semibold">
            Sign Up
          </Link>
        </>
      )}
    </div>

    {/* Hamburger Menu Button */}
    <button
      className="md:hidden p-2 rounded-md border border-white"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle menu"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        {menuOpen ? (
          <path d="M6 18L18 6M6 6l12 12" /> // Close icon
        ) : (
          <path d="M3 12h18M3 6h18M3 18h18" /> // Hamburger icon
        )}
      </svg>
    </button>
  </div>

  {/* Mobile Dropdown Menu */}
  <div
    className={`
      absolute top-full right-4 mt-3 w-64 rounded-xl shadow-2xl backdrop-blur-md border border-gray-700
      transition-all duration-300 origin-top-right bg-gray-900
      ${menuOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"}
      md:hidden z-[9999]
    `}
  >
    <div className="flex flex-col p-4 space-y-2 text-white font-medium">
      <Link to="/" onClick={() => { setMenuOpen(false); setContactOn(false); }} className="hover:bg-gray-700 px-4 py-2 rounded-md">
        🏠 Home
      </Link>
      <Link to="/web-development" onClick={() => { setMenuOpen(false); setContactOn(true); }} className="hover:bg-gray-700 px-4 py-2 rounded-md">
        💻 Web Portfolio
      </Link>
      <Link to="/contactus" onClick={() => { setMenuOpen(false); setContactOn(true); }} className="hover:bg-gray-700 px-4 py-2 rounded-md">
        📞 Contact Us
      </Link>

      <div className="border-t border-gray-700 my-2"></div>

      {user ? (
        <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 hover:bg-gray-700 px-4 py-2 rounded-md">
          <img
            src={user.image}
            alt="User"
            className="h-9 w-9 rounded-full object-cover border border-white"
          />
          <span>{user.name?.split(" ")[0]}</span>
        </Link>
      ) : (
        <>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md">
            🔐 Login
          </Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold text-center">
            ✨ Sign Up
          </Link>
        </>
      )}
    </div>
  </div>

  {/* Bottom border line */}
  <div className='absolute w-full h-[1px] bg-white -bottom-5 opacity-50 left-0'></div>
</div>

  )
}

export default NavBar