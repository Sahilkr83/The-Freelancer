import React from 'react';
 import Image from 'next/image';
export default function ProjectTypes({ href, img, editType }) {
  return (
    <a href={href} className=" cursor-pointer m-3 text-center max-w-[200px] ">
      <Image alt={`${editType} img`}   width={800}
      height={500} src={img}  className="rounded-md mb-2 mx-auto h-36" />
      <p className="font-semibold">{editType}</p>
    </a>
  );
}
