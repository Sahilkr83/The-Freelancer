import React, { useState } from 'react'
import NavBar from './NavBar'
import { Route, Routes } from "react-router-dom";
import Footer from './Footer'
import Homepage from './Home page'
import ContactForm from './ContactForm'



const NewWeb = () => {
  const [contactOn ,setContactOn] = useState(false)
  
  return (
    <div className='w-full h-full flex flex-col justify-between z-20'>
       <NavBar  setContactOn={setContactOn} />

       <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/contactus' element={<ContactForm/>} />
       </Routes>

       <Footer contactOn={contactOn} setContactOn={setContactOn}/>
    </div>
  )
}

export default NewWeb