'use client';

import { useEffect, useRef, useState } from "react";
import { FaSearch, FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { motion } from "framer-motion";
import iphoneFrame from "@/assets/iphone_frame.webp";
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
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [isPlaying, setIsPlaying] = useState([false, false, false]);
  const [isMuted, setIsMuted] = useState([true, true, true]);
  const videos = [video1, video2, video3];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVolumeChange = (index: number) => {
    videoRefs.forEach((ref, i) => {
      if (ref.current && i !== index && !ref.current.muted) {
        ref.current.muted = true;
        setIsMuted(prev => prev.map((m, idx) => (idx === i ? true : m)));
      }
    });
  };

  const togglePlay = (i: number) => {
    const video = videoRefs[i].current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(prev => prev.map((p, idx) => (idx === i ? true : p)));
      } else {
        video.pause();
        setIsPlaying(prev => prev.map((p, idx) => (idx === i ? false : p)));
      }
    }
  };

  const toggleMute = (i: number) => {
    const video = videoRefs[i].current;
    if (video) {
      const newMuted = !video.muted;
      video.muted = newMuted;
      setIsMuted(prev => prev.map((m, idx) => (idx === i ? newMuted : m)));
      handleVolumeChange(i);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-20 mb-20" id={id}>
      <div className="frame-text text-center py-2 px-8 font-semibold uppercase text-[#a8e3f5] border-[#a8e3f5] border-4 w-fit flex gap-5 items-center">
        <FaSearch aria-hidden="true" />
        <h4>{editName} edit</h4>
      </div>

      <div className="flex items-center justify-around w-full frame">
        {videos.map((src, i) => (
          <div key={i} className="relative w-fit h-fit group">
            <Image src={iphoneFrame} alt="iPhone frame" />
            <video
              suppressHydrationWarning
              ref={videoRefs[i]}
              playsInline
              muted={isMuted[i]}
              loop
              preload="auto"
              src={src}
              aria-label='Freelance video editing portfolio reel'
              title="Freelance video editing portfolio reel"
              className="absolute top-3 right-3 w-[185px] h-[400px] rounded-lg"
              onPlay={() => setIsPlaying(prev => prev.map((p, idx) => (idx === i ? true : p)))}
              onPause={() => setIsPlaying(prev => prev.map((p, idx) => (idx === i ? false : p)))}
              onVolumeChange={() => {
                const muted = videoRefs[i].current?.muted ?? true;
                setIsMuted(prev => prev.map((m, idx) => (idx === i ? muted : m)));
              }}
            >
              <track kind="captions" srcLang="en" label="No captions available" />
            </video>

            {/* Custom Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 controls">
              <button
                onClick={() => togglePlay(i)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg text-white hover:bg-white/40 flex items-center justify-center transition-transform duration-150 active:scale-90 relative group"
                aria-label={isPlaying[i] ? "Pause" : "Play"}
              >
                {isPlaying[i] ? <FaPause /> : <FaPlay />}
                <span className={`absolute  right-1/6 -translate-x-1/2 text-xs  text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 controls ${isPlaying[i] ? "pr-[10px]" : "pr-4"}`}>
                  {isPlaying[i] ? "Pause" : "Play"}
                </span>
              </button>

              <button
                onClick={() => toggleMute(i)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg text-white hover:bg-white/40 flex items-center justify-center transition-transform duration-150 active:scale-90 relative group"
                aria-label={isMuted[i] ? "Unmute" : "Mute"}
              >
                {isMuted[i] ? <FaVolumeMute /> : <FaVolumeUp />}
                <span className={`absolute  left-1/5 translate-x-1/2 text-xs  text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 controls ${isMuted[i] ? "pl-2" : "pl-4"}`}>
                  {isMuted[i] ? "Unmute" : "Mute"}
                </span>
              </button>
            </div>
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
    </motion.div>
  );
};

export default Frame;