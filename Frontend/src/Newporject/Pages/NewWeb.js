import React from 'react'
import NavBar from '../Component/NavBar.js'
import { Route, Routes } from "react-router-dom";
import Footer from '../Component/Footer.js'
import Homepage from './Homepage.js'
import ContactForm from './ContactForm.js'



const NewWeb = () => {

  
  return (
    <div className='w-full h-full flex flex-col justify-between z-20'>
       <NavBar/>

       <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/contactus' element={<ContactForm/>} />
       </Routes>

       <Footer/>
    </div>
  )
}

export default NewWeb