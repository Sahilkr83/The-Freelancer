import React from 'react'
import NavBar from './NavBar'
import { Route, Routes } from "react-router-dom";
import Footer from './Footer'
import Homepage from './Home page'
import ContactForm from './ContactForm'



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