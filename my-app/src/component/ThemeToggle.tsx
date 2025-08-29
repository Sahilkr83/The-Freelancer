"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative w-16 h-8 rounded-full transition-colors duration-700 ease-in-out
        flex items-center justify-center overflow-hidden
        ${isDark
          ? "bg-gradient-to-r from-purple-900 to-indigo-800"
          : "bg-gradient-to-r from-sky-300 via-blue-400 to-sky-500"}
      `}
      aria-label="Toggle Dark Mode"
    >
      {/* 🌙 Moon */}
      <div
        className={`absolute right-2 w-5 h-5 bg-gray-200 rounded-full shadow-md transition-all duration-700 ease-in-out
          ${isDark ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <div className="absolute right-1 top-0 w-5 h-5 bg-indigo-900 rounded-full" />
      </div>

      {/* ☀️ Sun */}
      <div
        className={`absolute left-2 w-5 h-5 bg-yellow-300 rounded-full shadow-[0_0_10px_#facc15] transition-all duration-700 ease-in-out
          ${!isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"}
        `}
      />

      {/* ⭐ Stars */}
      <div
        className={`absolute top-2 left-1 text-white transition-all duration-700 ease-in-out
          ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-2 fill-white" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.707 
                   1.48 8.272L12 18.896l-7.416 4.389 
                   1.48-8.272L0 9.306l8.332-1.151z"/>
        </svg>
      </div>
      <div
        className={`absolute top-5 left-4 text-white transition-all duration-700 ease-in-out
          ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-2 h-2 fill-white" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.707 
                   1.48 8.272L12 18.896l-7.416 4.389 
                   1.48-8.272L0 9.306l8.332-1.151z"/>
        </svg>
      </div>
      <div
        className={`absolute top-1 left-7 text-white transition-all duration-700 ease-in-out
          ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-2 h-2 fill-white" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.707 
                   1.48 8.272L12 18.896l-7.416 4.389 
                   1.48-8.272L0 9.306l8.332-1.151z"/>
        </svg>
      </div>

      {/* ☁️ Clouds */}
      <div
        className={`absolute right-6 top-3 w-3 h-2 bg-white rounded-full transition-all duration-700 ease-in-out
          ${!isDark ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}
        `}
      />
      <div
        className={`absolute right-2 top-1 w-4 h-2 bg-white rounded-full transition-all duration-700 ease-in-out
          ${!isDark ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}
        `}
      />
      <div
        className={`absolute right-2 top-5 w-3 h-2 bg-white rounded-full transition-all duration-700 ease-in-out
          ${!isDark ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}
        `}
      />
    </button>
  );
}
