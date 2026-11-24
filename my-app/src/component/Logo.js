'use client';

import React, { useState } from 'react'
import Image from 'next/image';

const Logo = ({logo,appName}) => {

    const [hovered , setHovered] = useState(false)
    
  return (
    <div className='flex flex-col items-center gap-3 text-center text-sm font-semibold sm:text-base'>
        <Image
       
        style={{
            filter: hovered ? 'grayscale(0)' : 'grayscale(1)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'all 0.3s ease',}}

            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}

            src={logo} height='auto' width='auto' className='tool-logo h-12 w-12 rounded-xl object-contain sm:h-[70px] sm:w-[70px]'
            alt='App Logo'
            title='Software used: Adobe Premiere Pro'/>

        <span onMouseEnter={() => setHovered(true) }
        onMouseLeave={() => setHovered(false)} className='tool-text'>{appName}</span>
    </div>
  )
}

export default Logo
