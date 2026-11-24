'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight, CircleUserRound, Clapperboard, Code2, Home, LayoutDashboard, Menu, MessageCircle, UserRound, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import logo from '@/assets/logo/TheFreelancer logo.png';

const links = [
  { href: '/', label: 'Home', icon: Home, description: 'Overview and selected work' },
  { href: '/web-development', label: 'Web', icon: Code2, description: 'Websites and full-stack products' },
  { href: '/video-portfolio', label: 'Video', icon: Clapperboard, description: 'Editing and motion portfolio' },
  { href: '/about-us', label: 'About', icon: UserRound, description: 'Studio, approach, and experience' },
  { href: '/contact-us', label: 'Contact', icon: MessageCircle, description: 'Start a project conversation' },
];

export default function NavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={`fixed inset-x-0 top-0 z-[9999] border-transparent bg-transparent transition-all duration-300 lg:border-b ${scrolled ? 'lg:border-[#E8E8EE] lg:bg-white/95 lg:shadow-[0_8px_35px_rgba(21,21,21,.06)] lg:backdrop-blur-xl' : 'lg:bg-[#F8F9FC]/85 lg:backdrop-blur-md'}`}>
      <div className="relative z-30 mx-3 mt-3 flex h-16 max-w-[1320px] items-center justify-between rounded-2xl border border-[#E8E8EE] bg-white px-3 shadow-[0_10px_35px_rgba(21,21,21,.09)] sm:mx-5 sm:px-4 lg:mx-auto lg:mt-0 lg:h-20 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-10 lg:shadow-none">
        <Link href="/" className="flex items-center gap-3" aria-label="The Freelancer home">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-black p-1.5 shadow-sm">
            <Image src={logo} width={38} height={38} alt="The Freelancer logo" className="h-full w-full rounded-lg object-contain" priority />
          </span>
          <span className="text-sm font-semibold tracking-tight text-[#151515]">The Freelancer<span className="text-[#633CFF]">.</span></span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[#E8E8EE] bg-white p-1.5 lg:flex" aria-label="Primary navigation">
          {links.map(link => <Link key={link.href} href={link.href} className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive(link.href) ? 'bg-[#151515] text-white' : 'text-[#686868] hover:bg-[#F0F0F5] hover:text-[#151515]'}`}>{link.label}</Link>)}
        </nav>

        <div className="hidden min-w-[9.5rem] justify-end lg:flex">
          {status !== 'loading' && session?.user ? (
            <div className="flex items-center gap-2"><Link href="/dashboard" className="text-sm font-medium text-[#686868] hover:text-[#151515]">Dashboard</Link><Link href="/profile" aria-label="Profile" className="ml-2"><Image src={session.user.image || logo} width={38} height={38} alt={session.user.name || 'Profile'} className="h-10 w-10 rounded-full border border-[#E8E8EE] object-cover" /></Link></div>
          ) : <Link href="/contact-us" className="portfolio-button min-h-10 px-5 py-2 text-sm">Start a project</Link>}
        </div>

        <button type="button" onClick={() => setMenuOpen(value => !value)} className={`grid h-10 w-10 place-items-center rounded-xl transition lg:hidden ${menuOpen ? 'bg-[#151515] text-white' : 'bg-[#F0F0F5] text-[#151515]'}`} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>

      <button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} className={`fixed inset-0 z-10 bg-[#151515]/20 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} />

      <div id="mobile-navigation" className={`fixed inset-x-3 top-[5.5rem] z-20 max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-[1.5rem] border border-[#E8E8EE] bg-white p-3 shadow-[0_28px_80px_rgba(21,21,21,.2)] transition-all duration-300 sm:inset-x-5 lg:hidden ${menuOpen ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-3 scale-[.98] opacity-0'}`}>
        <div className="flex items-center justify-between px-3 pb-3 pt-2"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8A8A8A]">Navigation</p><p className="mt-1 text-sm text-[#686868]">Explore the studio</p></div><span className="rounded-full bg-[#EEE9FF] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#633CFF]">Portfolio</span></div>
        <nav className="grid gap-1" aria-label="Mobile navigation">
          {links.map(link => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`group grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-2xl px-3 py-3 transition ${active ? 'bg-[#EEE9FF] text-[#633CFF]' : 'text-[#151515] hover:bg-[#F8F9FC]'}`}><span className={`grid h-11 w-11 place-items-center rounded-xl ${active ? 'bg-white text-[#633CFF]' : 'bg-[#F0F0F5] text-[#686868]'}`}><Icon className="h-5 w-5" /></span><span><span className="block text-sm font-semibold">{link.label}</span><span className={`mt-0.5 block text-xs ${active ? 'text-[#633CFF]/70' : 'text-[#8A8A8A]'}`}>{link.description}</span></span><ArrowUpRight className={`h-4 w-4 transition ${active ? 'text-[#633CFF]' : 'text-[#B0B0B8] group-hover:text-[#633CFF]'}`} /></Link>;
          })}
        </nav>

        {session?.user && <div className="mt-3 border-t border-[#E8E8EE] pt-3"><p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#8A8A8A]">Your account</p><div className="grid grid-cols-2 gap-2"><Link href="/dashboard" className="flex items-center gap-2 rounded-xl bg-[#F8F9FC] px-3 py-3 text-sm font-semibold"><LayoutDashboard className="h-4 w-4 text-[#633CFF]" />Dashboard</Link><Link href="/profile" className="flex items-center gap-2 rounded-xl bg-[#F8F9FC] px-3 py-3 text-sm font-semibold"><CircleUserRound className="h-4 w-4 text-[#633CFF]" />Profile</Link></div></div>}

        {!session?.user && <Link href="/contact-us" className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#633CFF] px-5 text-sm font-semibold text-white">Start a project <ArrowRight className="h-4 w-4" /></Link>}
      </div>
    </header>
  );
}
