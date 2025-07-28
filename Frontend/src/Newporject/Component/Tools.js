import React from 'react'
import prLogo from '../../assests/logo/Adobe_Premiere logo.webp'
import aeLogo from '../../assests/logo/Adobe After logo.webp'
import davanciResovle from '../../assests/logo/davinci-resolve logo.webp'
import filmora from '../../assests/logo/Filmora logo.webp'
import Logo from '../Logo/Logo.js'

const Tools = () => {
  return (
    <div className='max-w-[1460px] w-11/12  text-start flex flex-col gap-10 mb-20'>
        <h1 className='text-[2.5rem] font-bold'>Tools We Use </h1>

        <div className='flex w-full flex-wrap gap-y-10 justify-between'>
            <Logo 
             logo={prLogo}
             appName="Adobe Premiere Pro"
            />
            <Logo 
             logo={aeLogo}
             appName="Adobe After Effect"
            />
            <Logo 
              logo={davanciResovle}
             appName="Davinci Resolve"
            />
            <Logo 
             logo={filmora}
             appName="Filmora"
            />
            
        </div>
    </div>
  )
}

export default Tools