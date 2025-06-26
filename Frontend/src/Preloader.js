import React ,{useState,useEffect}from 'react'

import { Typewriter } from 'react-simple-typewriter'

import logo from "./assests/logo/TheFreelancer logo.png"

const Preloader = ({fadeOut}) => {

    const [firstLoop,setFirstLoop] = useState(false)
    

    useEffect (()=>{
        setTimeout(()=>{
            setFirstLoop(true)
        },1000)
    },[])


  return (
    <div   className={`flex justify-center items-center w-[100vw] h-[100vh]  flex-col transition-all duration-500 relative ${
        fadeOut ?  'opacity-0 scale-100 z-40' : 'opacity-100 scale-50 z-40'
      }`}
    >
        <img className='z-40' src={logo} width={200} alt='logo'/>

        <span className='text-white  font-bold z-40 pre-loader-text'>
        <Typewriter
            words={['THE FREELANCER']}
            loop={1}
            cursor
            cursorStyle='_'
            typeSpeed={50}
            
          />
        </span>
        {firstLoop && 
        <span className='text-white text-[1.2rem] z-40'>
        <Typewriter
            words={['A SOCIAL MEDIA AGENCY']}
            loop={1}
            typeSpeed={40}
          />
        </span>}
        
    </div>
  )
}

export default Preloader