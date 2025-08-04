'use client';

import React, { useContext, useEffect, useState } from 'react';
import logo from '@/assets/logo/TheFreelancer logo.png';
import { AppContext } from '@/context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
// import { ReactNode } from 'react';
// import{AnimatePresence, motion} from 'framer-motion';

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
          alt="The Freelancer Shop logo"
          title="The Freelancer Shop – Freelance Video Editing & Web Design"
          className="cursor-pointer"
        />

        {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center font-medium relative">
        {/* Home */}
        {/* <FlyOutLink href='/' FlyoutContent={<WebPortfolio/>}>Home</FlyOutLink> */}
        <Link
          href="/"
          className={`px-2 py-1 border-b-2 transition ${
            pathname === '/' ? 'border-white' : 'border-transparent'
          }`}
        >
          Home
        </Link>

          {/* Trigger */}
        <Link
          href="/web-development"
          className={`px-2 py-1 border-b-2 transition ${
            pathname === '/web-development' ? 'border-white' : 'border-transparent'
          }`}
        >
          Web Portfolio
        </Link>


        {/* About Us */}
        <Link
          href="/about-us"
          className={`px-2 py-1 border-b-2 transition ${
            pathname === '/about-us' ? 'border-white' : 'border-transparent'
          }`}
        >
          About Us
        </Link>
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
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
            <span aria-hidden="true">🏠</span> Home
          </Link>
          <Link href="/web-development" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
            <span aria-hidden="true">💻</span> Web Portfolio
          </Link>
          <Link href="/contactus" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
            <span aria-hidden="true">📞</span> Contact Us
          </Link>
          <Link href="/about-us" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
            <span aria-hidden="true">ℹ️</span> About Us
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