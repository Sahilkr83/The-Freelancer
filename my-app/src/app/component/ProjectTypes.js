import React from 'react';
// import Image from 'next/image';
export default function ProjectTypes({ href, img, editType }) {
  return (
    <a href={href} className="block cursor-pointer m-3 text-center max-w-[200px]">
      <img src={img} alt={editType} className="rounded-md mb-2 mx-auto" />
      <p className="font-semibold">{editType}</p>
    </a>
  );
}
