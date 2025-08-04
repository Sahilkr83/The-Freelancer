'use client'
import { useEffect, useState } from "react";

interface CountUpNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const CountUpNumber = ({ end, duration = 6500, suffix = "" }: CountUpNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    let frameId: number;

    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

export default CountUpNumber;
