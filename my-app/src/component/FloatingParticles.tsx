'use client';

import React, { useEffect, useState } from 'react';

const NUM_STARS = 15;


const randomPercent = () => Math.random() * 100;
const randomSize = () => 4 + Math.random() * 20;

type Particle = {
  size: number;
  left: number;
  top?: number;
  bottom?: number;
  duration?: number;
  delay: number;
};

export default function FloatingParticles() {
  const [stars, setStars] = useState<Particle[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: NUM_STARS }).map(() => ({
      size: randomSize(),
      left: randomPercent(),
      top: randomPercent(),
      delay: Math.random() * 4,
    }));

    

    setStars(newStars);

  }, []);

  return (
    <>
      <style jsx>{`
        .particle {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.6;
          animation-timing-function: linear;
        }

        .star {
          background: radial-gradient(circle, var(--star-color) 60%, transparent 90%);
          filter: drop-shadow(0 0 3px #a0c8ff);
          animation-name: twinkle, starMove;
          animation-iteration-count: infinite;
          animation-duration: 14s, 20s;
          animation-timing-function: ease-in-out, ease-in-out;
          animation-direction: normal, alternate;
        }

        .bubble {
           background: rgba(var(--bubble-color-rgb), 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          animation-name: floatUp, bubbleDrift;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          animation-duration: 18s, 16s;
          animation-timing-function: linear, ease-in-out;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes starMove {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(40px, -40px);
          }
          50% {
            transform: translate(-40px, 40px);
          }
          75% {
            transform: translate(40px, 40px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-40px);
            opacity: 0.2;
          }
        }

        @keyframes bubbleDrift {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(40px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Render stars only after mount */}
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className="particle star"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s, ${star.delay}s`,
          }}
        />
      ))}

      {/* Render bubbles only after mount */}

    </>
  );
}
