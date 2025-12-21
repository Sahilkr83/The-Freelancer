'use client';

import { useEffect, useRef, useState } from "react";
import { FaSearch, FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { motion } from "framer-motion";
import iphoneFrame from "@/assets/iphone_frame.webp";
import Image from "next/image";

interface FrameProps {
  id: string;
  videos?: string[];
  editName: string;
  items?: { number: string; type: string }[];
}

const Frame: React.FC<FrameProps> = ({
  id,
  videos = [],
  editName,
  items
}) => {

  /* =========================
     REFS & STATE
  ========================== */
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const userInteractedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState<boolean[]>(
    () => Array(videos.length).fill(false)
  );

  const [isMuted, setIsMuted] = useState<boolean[]>(
    () => Array(videos.length).fill(true)
  );

  const [videoLength, setVideoLength] = useState(false);

  /* =========================
     AUTO SCROLL (PING-PONG)
  ========================== */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let position = el.scrollLeft;
    let direction = 1;
    let paused = false;
    const speed = 0.6;

    const scroll = () => {
      if (!paused) {
        position += speed * direction;
        el.scrollLeft = Math.round(position);

        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          direction = -1;
          position = el.scrollLeft - 1;
        }

        if (el.scrollLeft <= 0) {
          direction = 1;
          position = 1;
        }
      }
      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);

    const pause = () => (paused = true);
    const resume = () => (paused = false);
    const syncPosition = () => (position = el.scrollLeft);

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);
    el.addEventListener("scroll", syncPosition);

    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("scroll", syncPosition);
    };
  }, []);

  /* =========================
     VIDEO COUNT CHECK
  ========================== */
  useEffect(() => {
    setVideoLength(videos.length !== 3);
  }, [videos.length]);

  /* =========================
     INTERSECTION OBSERVER
  ========================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          const video = target as HTMLVideoElement;

          if (!userInteractedRef.current) {
            isIntersecting
              ? video.play().catch(() => {})
              : video.pause();
          }

          if (!isIntersecting) {
            userInteractedRef.current = false;
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach(video => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach(video => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  /* =========================
     SYNC ICONS WITH VIDEO
  ========================== */
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;

      const onPlay = () =>
        setIsPlaying(p => p.map((_, i) => i === idx));
      const onPause = () =>
        setIsPlaying(p => p.map(() => false));

      video.addEventListener("play", onPlay);
      video.addEventListener("pause", onPause);

      return () => {
        video.removeEventListener("play", onPlay);
        video.removeEventListener("pause", onPause);
      };
    });
  }, [videos]);

  /* =========================
     CONTROLS
  ========================== */
  const togglePlay = (i: number) => {
    const video = videoRefs.current[i];
    if (!video) return;

    userInteractedRef.current = true;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = (i: number) => {
    const target = videoRefs.current[i];
    if (!target) return;

    const shouldUnmute = target.muted;

    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      video.muted = idx === i ? !shouldUnmute : true;
    });

    setIsMuted(prev =>
      prev.map((_, idx) => (idx === i ? !shouldUnmute : true))
    );
  };

  /* =========================
     RENDER
  ========================== */
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-20 mb-20"
    >
      {/* TITLE */}
      <div className="frame-text py-2 px-8 font-semibold uppercase border-4 flex gap-5 items-center">
        <FaSearch />
        <h3>{editName} edits</h3>
      </div>

      <div className="flex  justify-around w-full gap-10 sm:flex-row flex-col">
        {/* VIDEOS */}
        <div
          ref={containerRef}
          className="w-full overflow-x-auto no-scrollbar whitespace-nowrap "
        >
          <div
            className={`grid gap-6 px-2 py-5 
              sm:flex sm:gap-5 
              ${!videoLength ? "sm:w-full w-full sm:justify-around grid-cols-1 grid-rows-3 place-items-center " : "sm:w-max w-max grid-cols-4 grid-rows-2"}
            `}
          >
            {videos.map((src, i) => (
              <div key={i} className="relative group bg-black rounded-[40px] flex items-center w-max">
                <Image src={iphoneFrame} alt="iPhone frame" />
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  playsInline
                  muted={isMuted[i]}
                  loop
                  preload="auto"
                  src={src}
                  className="absolute top-3 right-3 w-[185px] h-[400px] rounded-lg"
                />

                {/* CONTROLS */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                  <button
                    onClick={() => togglePlay(i)}
                    className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center"
                  >
                    {isPlaying[i] ? <FaPause /> : <FaPlay />}
                  </button>

                  <button
                    onClick={() => toggleMute(i)}
                    className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center"
                  >
                    {isMuted[i] ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TEXT */}
        <div className={`flex flex-col gap-4 text-xl ${videoLength ? 'w-[250px]' : 'w-[500px]'}`}>
          <h3 className={`text-[2rem] font-semibold frame-text uppercase`}>{editName} Edits</h3>
          <ol className="flex flex-col gap-3 text-[24px]">
            <li><span className="frame-text">1.</span> Fine Cuts</li>
            <li><span className="frame-text">2.</span> Fine Transition</li>
            <li><span className="frame-text">3.</span> Subtitles</li>
            {items?.map((item, i) => (
              <li key={i}>
                <span className="frame-text">{item.number} </span>
                 {item.type}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </motion.div>
  );
};

export default Frame;
