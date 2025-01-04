import React from 'react'


const Types = ({img,editType}) => {
  return (
    <div className=' flex flex-col gap-3 pb-3'> 
    <div className='border-4 border-[#a8e3f5] border-solid bg-white w-[200px] h-[180px] overflow-clip rounded-[8px]  pt-3 types-of-edit-img'>
    <img src={img} width={300} className='scale-150' alt='Simple Edit Img' />
    </div>
    <p className='uppercase types-of-edit-text'>{editType}</p>
    </div>
  )
}

export default Types