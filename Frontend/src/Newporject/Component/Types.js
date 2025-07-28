import React from 'react'


const Types = ({img,editType,href}) => {

  const handleScroll = (e) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div onClick={handleScroll}  className=' flex flex-col gap-3 pb-3'> 
    <div className='border-4 border-[#a8e3f5] border-solid bg-white w-[200px] h-[180px] overflow-clip flex justify-center items-center rounded-[8px]  pt-3 types-of-edit-img'>
    <img loading="lazy" src={img} width={300} className='scale-[1.8]  object-fill' alt='Simple Edit Img' />
    </div>
    <p className='uppercase types-of-edit-text'>{editType}</p>
    <hr/>
    </div>
  )
}

export default Types