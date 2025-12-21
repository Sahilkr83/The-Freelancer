'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaFilm } from "react-icons/fa";
import { useSession } from 'next-auth/react';
import logo from '@/assets/logo/TheFreelancer logo.png';
import ThemeSwitch from './ThemeToggle';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user || null;

  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  const loadingUser = !mounted || status === 'loading';

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <div
      className={`fixed top-0 w-full z-[9999] transition-all duration-300 backdrop-blur-lg nav-bar 
        ${scrolled ? 'border-b border-indigo-700 shadow-[0_2px_12px_rgba(93,118,255,0.25)]' : 'bg-transparent'}
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
          alt="The Freelancer Shop logo"
          title="The Freelancer Shop – Freelance Video Editing & Web Design"
          className="cursor-pointer"
        />

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6 items-center relative font-bold">
          <Link
            href="/"
            className={`px-2 py-1 border-b-4 rounded-b-2xl transition-colors duration-250 ${
              pathname === '/' ? 'nav-text' : 'border-transparent hover:text-indigo-400'
            }`}
          >
            Home
          </Link>

          {user ? (
            <Link
              href="/cloud-storage"
              className={`px-2 py-1 border-b-4 rounded-b-2xl transition-colors duration-250 ${
                pathname === '/cloud-storage' ? 'nav-text' : 'border-transparent hover:text-indigo-400'
              }`}
            >
              Cloud Storage
            </Link>
          ) : (
            <>
              <Link
                href="/web-development"
                className={`px-2 py-1 border-b-4 rounded-b-2xl transition-colors duration-250 ${
                  pathname === '/web-development' ? 'nav-text' : 'border-transparent hover:text-indigo-400'
                }`}
              >
                Web Portfolio
              </Link>
              <Link
                href="/video-portfolio"
                className={`px-2 py-1 border-b-4 rounded-b-2xl transition-colors duration-250 ${
                  pathname === '/video-portfolio' ? 'nav-text' : 'border-transparent hover:text-indigo-400'
                }`}
              >
                Video Portfolio
              </Link>
              <Link
                href="/about-us"
                className={`px-2 py-1 border-b-4 rounded-b-2xl transition-colors duration-250 ${
                  pathname === '/about-us' ? 'nav-text' : 'border-transparent hover:text-indigo-400'
                }`}
              >
                About Us
              </Link>
              <Link
                href="/contact-us"
                className={`px-2 py-1 border-b-4 rounded-b-2xl transition-colors duration-250 ${
                  pathname === '/contact-us' ? 'nav-text' : 'border-transparent hover:text-indigo-400'
                }`}
              >
                Contact Us
              </Link>
            </>
          )}
        </div>

        {/* User Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeSwitch />
          {loadingUser ? (
            <div className="w-32 h-10 bg-gray-700 animate-pulse rounded-md" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="px-3 py-1.5 border border-white rounded-md hover:bg-white hover:text-black transition"
              >
                Dashboard
              </Link>
              <Link href="/profile" className="flex items-center gap-2">
                {user.image && (
                  <Image
                    src={user.image}
                    width={40}
                    height={40}
                    alt={user.name ?? "User Avatar"}
                    className="h-10 w-10 rounded-full object-cover border border-white"
                  />
                )}
                <span>{user.name?.split(' ')[0]}</span>
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="px-3 py-1.5 border border-white rounded-md hover:bg-white hover:text-black transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="px-3 py-1.5 bg-blue-600 rounded-md hover:bg-blue-800 transition font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <div className="gap-4 flex lg:hidden items-center">
          <ThemeSwitch />
          <button
            className="p-2 rounded-md border border-white"
            ref={buttonRef}
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
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className={`absolute top-full right-4 mt-3 w-64 rounded-xl border border-gray-700 nav-bar-mobile
          transition-all duration-300 origin-top-right shadow-2xl
          ${menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
          lg:hidden
        `}
      >
        <div className="flex flex-col p-4 space-y-2 font-medium text-white">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
            🏠 Home
          </Link>

          {user ? (
            <>
              <Link href="/cloud-storage" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
                ☁️ Cloud Storage
              </Link>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="px-4 py-2 mx-1 rounded-md border border-white text-center">
                Dashboard
              </Link>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 hover:bg-gray-700 px-4 py-2 rounded-md">
                <Image
                  src={user.image || '/default-avatar.png'}
                  width={40}
                  height={40}
                  alt="User"
                  className="h-9 w-9 rounded-full object-cover border border-white"
                />
                <span>{user.name?.split(' ')[0]}</span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/web-development" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
                💻 Web Portfolio
              </Link>
              <Link href="/video-portfolio" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
                <FaFilm className="w-5 h-5" /> Video Portfolio
              </Link>
              <Link href="/about-us" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
                ℹ️ About Us
              </Link>
              <Link href="/contact-us" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
                📞 Contact Us
              </Link>
              <div className="border-t border-gray-700 my-2" />
              <Link href="/auth/sign-in" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md">
                🔐 Login
              </Link>
              <Link href="/auth/sign-up" onClick={() => setMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold text-center">
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




// type FlyOutLinkProps = {
//   children: ReactNode;
//   href: string;
//   FlyoutContent?: ReactNode;
// };

// const FlyOutLink = ({ children, href, FlyoutContent }: FlyOutLinkProps) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const showFlyOut = showDropdown && FlyoutContent

//   return (
//     <div

//       onMouseEnter={() => setShowDropdown(true)}
//       onMouseLeave={()=> setShowDropdown(false)}
//       className="relative group"
//     >
//       <Link href={href}>
//         {children}
//         <span style={{ transform : showFlyOut ? "scaleX(1)": "scaleX(0)"}} className='absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-white transitiont-transform duration-300 ease-out'/>
//       </Link>
//       <AnimatePresence>
//       {showFlyOut && (
//         <motion.div 
//           initial={{opacity:0 , y:10}}
//           animate={{opacity:1 , y:0}}
//           exit={{opacity:0 , y:10}}
//           style={{x: '-50%'}}
//           transition={{ duration: 0.3, ease: 'easeOut' }}
//           className="absolute top-full left-1/2  mt-5 z-50 rounded-xl min-w-48 bg-black  backdrop-blur-md transition-all "
//         >
//           <div className='absolute -top-6 left-0 right-0 h-6 bg-transparent'/>
//           <div className='absolute top-0 left-1/2 -translate-x-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-black'/>
//           {FlyoutContent}
//         </motion.div>
//       )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const WebPortfolio = () => {
//   return (
//           <div>
//             <ul className="flex gap-3 p-5 text-sm text-gray-200 text-nowrap">
//               <li>
//                 <Link
//                   href="/web-development/frontend"
//                   className="flex items-center gap-3 mx-2 py-1 w-full  rounded-md hover:bg-black transition"
//                 >
//                   <span>🧩</span> <span>Frontend Projects</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/web-development/fullstack"
//                   className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-black transition"
//                 >
//                   <span>🧠</span> <span>Fullstack Projects</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/web-development/landing-pages"
//                   className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-black transition"
//                 >
//                   <span>🖼️</span> <span>Landing Pages</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/web-development/ui-designs"
//                   className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-black transition"
//                 >
//                   <span>🎨</span> <span>UI/UX Designs</span>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//   )
// }