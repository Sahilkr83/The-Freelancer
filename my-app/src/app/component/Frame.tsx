'use client';

import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import iphoneFrame from "@/app/assests/iphone_frame.webp";
import Image from 'next/image'; 

interface FrameProps {
  id: string;
  video1: string;
  video2: string;
  video3: string;
  editName: string;
  number1?: string;
  number2?: string;
  number3?: string;
  type1?: string;
  type2?: string;
  type3?: string;
}

const Frame: React.FC<FrameProps> = ({
  id, video1, video2, video3, editName,
  number1, number2, number3, type1, type2, type3
}) => {
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef(null), useRef(null)];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          const video = target as HTMLVideoElement;
          isIntersecting ? video.play().catch(console.warn) : video.pause();
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    videoRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      videoRefs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const videos = [video1, video2, video3];

  return (
    <div className="flex flex-col items-center gap-20 mb-20" id={id}>
      <div className="frame-text text-center py-2 px-8 font-semibold uppercase text-[#a8e3f5] border-[#a8e3f5] border-4 w-fit flex gap-5 items-center">
        <FaSearch aria-hidden="true" />
        <h2>{editName} edit</h2>
      </div>

      <div className="flex items-center justify-around w-full frame">
        {videos.map((src, i) => (
          <div key={i} className="relative w-fit h-fit">
            <Image src={iphoneFrame} alt="iPhone frame" />
            <video
              ref={videoRefs[i]}
              playsInline
              muted
              loop
              preload="auto"
              src={src}
              className="absolute top-3 right-3 w-[185px] h-[400px] rounded-lg"
            >
              <track kind="captions" srcLang="en" label="No captions available" />
            </video>
          </div>
        ))}

        <div className="flex flex-col text-[1.5rem] gap-4">
          <h3 className="uppercase text-[2rem] font-semibold text-[#a8e3f5]">{editName} edit</h3>
          <ol className="flex flex-col gap-3">
            <li><span className="text-[#a8e3f5]">1.</span> Fine Cuts</li>
            <li><span className="text-[#a8e3f5]">2.</span> Fine Transition</li>
            <li><span className="text-[#a8e3f5]">3.</span> Subtitles</li>
            {number1 && type1 && (
              <li><span className="text-[#a8e3f5]">{number1}</span> {type1}</li>
            )}
            {number2 && type2 && (
              <li><span className="text-[#a8e3f5]">{number2}</span> {type2}</li>
            )}
            {number3 && type3 && (
              <li><span className="text-[#a8e3f5]">{number3}</span> {type3}</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Frame;
