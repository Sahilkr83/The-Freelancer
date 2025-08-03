'use client';

import React, { useContext, useEffect, useState } from 'react';
import logo from '@/app/assests/logo/TheFreelancer logo.png';
import { AppContext } from '@/app/context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function NavBar() {
  const { user } = useContext(AppContext)!;
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed top-0 w-full z-[9999] transition-all duration-300 backdrop-blur-lg
        ${scrolled ? 'bg-slate-950/80 border-b border-indigo-700 shadow-[0_2px_12px_rgba(93,118,255,0.25)]' : 'bg-transparent'}
        font-['Rajdhani',_sans-serif]
      `}
    >
      <div className="mx-auto max-w-[1350px] w-11/12 flex justify-between items-center p-7 px-4 pb-4 text-white">
        {/* Logo */}
        <Image
          loading="lazy"
          onClick={() => router.push('/')}
          src={logo}
          width={50}
          height={50}
          alt="logo"
          className="cursor-pointer"
        />

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center font-medium">
          {[
            { href: '/', label: 'Home' },
            { href: '/web-development', label: 'Web Portfolio' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-2 py-1 border-b-2 transition ${
                pathname === href ? 'border-white' : 'border-transparent'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* User Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contactus"
            className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Contact Us
          </Link>

          {user ? (
            <Link href="/profile" className="flex items-center gap-2">
              <Image
                src={user.image}
                width={40}
                height={40}
                alt={user.image}
                className="h-10 w-10 rounded-full object-cover border border-white"
              />
              <span>{user.name?.split(' ')[0]}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1.5 border border-white rounded-md hover:bg-white hover:text-black transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 bg-blue-600 rounded-md hover:bg-blue-800 transition font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-md border border-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`
          absolute top-full right-4 mt-3 w-64 rounded-xl border border-gray-700 bg-slate-950
          transition-all duration-300 origin-top-right shadow-2xl
          ${menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
          md:hidden
        `}
      >
        <div className="flex flex-col p-4 space-y-2 font-medium text-white">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md">
            🏠 Home
          </Link>
          <Link href="/web-development" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md">
            💻 Web Portfolio
          </Link>
          <Link href="/contactus" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md">
            📞 Contact Us
          </Link>

          <div className="border-t border-gray-700 my-2" />

          {user ? (
            <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 hover:bg-gray-700 px-4 py-2 rounded-md">
              <Image
                src={user.image}
                width={40} 
                height={40}
                alt="User"
                className="h-9 w-9 rounded-full object-cover border border-white"
              />
              <span>{user.name?.split(' ')[0]}</span>
            </Link>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md">
                🔐 Login
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold text-center">
                ✨ Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-[1px] bg-white opacity-30 mt-2" />
    </div>
  );
}
