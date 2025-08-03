'use client';

import React from 'react'
import Image, { StaticImageData } from 'next/image';
interface TypesProps {
  img: string | StaticImageData;
  editType: string;
  href: string; // Assuming it's an id selector like "#section-id"
}

const Types: React.FC<TypesProps> = ({img,editType,href}) => {

  const handleScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div onClick={handleScroll}  className=' flex flex-col gap-3 pb-3 items-center'> 
    <div className='border-4 border-[#a8e3f5] border-solid bg-white w-[200px] h-[180px]  flex justify-center items-center rounded-2xl  pt-3 types-of-edit-img overflow-hidden '>
    <Image priority src={img} width={300} className='scale-[1.8]  object-contain' alt='Simple Edit Img' />
    </div>
    <p className='uppercase types-of-edit-text'>{editType}</p>
    <hr
    className="w-[90px] border-2 h-1 rounded-full "
    aria-hidden="true"
  />
    </div>
  )
}

export default Types