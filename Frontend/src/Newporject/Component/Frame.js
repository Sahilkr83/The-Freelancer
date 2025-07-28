import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import iphoneFrame from "../../assests/iphone_frame.png";

const Frame = ({ id, video1, video2, video3, editName, number1, number2, number3, type1, type2, type3, className }) => {
  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // 50% visible to trigger
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          // Try to play when in view
          video.play().catch((e) => {
            console.warn("Autoplay prevented:", e);
          });
        } else {
          // Pause when out of view
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    videoRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      videoRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-20 mb-20" id={id}>
      <div className="frame-text text-center py-2 px-8 font-semibold uppercase text-[#a8e3f5] border-[#a8e3f5] border-4 w-fit flex gap-5 items-center">
        <FaSearch />
        <h1>{editName} edit</h1>
      </div>

      <div className="flex items-center justify-around w-full frame">
        <div className="relative w-fit h-fit ">
          <img src={iphoneFrame} alt="frame" className="z-10" />
          <video
            ref={videoRefs[0]}
            playsInline
            className="absolute rounded-lg top-3 z-10 right-3 w-[185px] h-[400px]"
            muted
            loop
            preload="auto"
            src={video1}
          />
        </div>

        <div className={`relative w-fit h-fit ${className}`}>
          <img src={iphoneFrame} className="z-10" alt="" />
          <video
            ref={videoRefs[1]}
            playsInline
            className={`${className} rounded-lg absolute top-3 z-10 right-3 w-[185px] h-[400px]`}
            muted
            loop
            preload="auto"
            src={video2}
          />
        </div>

        <div className="relative w-fit h-fit ">
          <img src={iphoneFrame} className="z-10" alt="" />
          <video
            ref={videoRefs[2]}
            playsInline
            className="absolute rounded-lg top-3 z-10 right-3 w-[185px] h-[400px]"
            muted
            loop
            preload="auto"
            src={video3}
          />
        </div>

        <div className="flex flex-col text-[1.5rem] gap-4 ">
          <h1 className="uppercase text-[2rem] font-semibold text-[#a8e3f5]">{editName} edit</h1>
          <ol className="flex flex-col gap-3">
            <li>
              <span className="text-[#a8e3f5]">1.</span> Fine Cuts
            </li>
            <li>
              <span className="text-[#a8e3f5]">2.</span> Fine Transition
            </li>
            <li>
              <span className="text-[#a8e3f5]">3.</span> Subtitles
            </li>
            <li>
              <span className="text-[#a8e3f5]">{number1}</span> {type1}
            </li>
            <li>
              <span className="text-[#a8e3f5]">{number2}</span> {type2}
            </li>
            <li>
              <span className="text-[#a8e3f5]">{number3}</span> {type3}
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Frame;
