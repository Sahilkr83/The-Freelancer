import React from 'react'
import NavBar from './NavBar'

import Footer from './Footer'
import Homepage from './Home page'


const NewWeb = () => {
  return (
    <div className='w-full h-full flex flex-col justify-between z-20'>
       <NavBar/>

       <Homepage/>

       <Footer/>
    </div>
  )
}

export default NewWeb