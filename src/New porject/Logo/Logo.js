import React, { useState } from 'react'

const Logo = ({logo,appName}) => {

    const [hovered , setHovered] = useState(false)
    
  return (
    <div className='flex items-center text-[1.5rem] font-semibold gap-4 '>
        <img 
        style={{
            filter: hovered ? 'grayscale(0)' : 'grayscale(1)',
            transform: hovered ? 'scale(1.3)' : 'scale(1)',
            transition: 'all 0.3s ease',}}

            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}

            src={logo} width={70} className='tool-logo' 
            alt='Adobe Premiere Logo'/>

        <span onMouseEnter={() => setHovered(true) }
        onMouseLeave={() => setHovered(false)} className='tool-text'>{appName}</span>
    </div>
  )
}

export default Logo