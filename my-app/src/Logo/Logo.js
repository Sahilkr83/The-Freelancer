'use client';

import React, { useState } from 'react'
import Image from 'next/image';

const Logo = ({logo,appName}) => {

    const [hovered , setHovered] = useState(false)
    
  return (
    <div className='flex items-center text-[1.5rem] font-semibold gap-4 '>
        <Image
       
        style={{
            filter: hovered ? 'grayscale(0)' : 'grayscale(1)',
            transform: hovered ? 'scale(1.3)' : 'scale(1)',
            transition: 'all 0.3s ease',}}

            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}

            src={logo}  height='auto' width='auto' className='tool-logo w-[70px] h-[70px]' 
            alt='App Logo'/>

        <span onMouseEnter={() => setHovered(true) }
        onMouseLeave={() => setHovered(false)} className='tool-text'>{appName}</span>
    </div>
  )
}

export default Logo