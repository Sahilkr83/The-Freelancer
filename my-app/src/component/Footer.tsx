'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Facebook, Instagram, Mail, Phone, Twitter, Youtube } from 'lucide-react';
import logo from '@/assets/logo/TheFreelancer logo.png';
import socialUrls from '@/component/urlfiles/links';

const navigation = {
  Work: [
    { href: '/web-development', label: 'Web development' },
    { href: '/video-portfolio', label: 'Video portfolio' },
  ],
  Studio: [
    { href: '/about-us', label: 'About' },
    { href: '/contact-us', label: 'Contact' },
  ],
};

const socials = [
  { href: socialUrls[0].facebook, icon: Facebook, label: 'Facebook' },
  { href: socialUrls[0].instagram, icon: Instagram, label: 'Instagram' },
  { href: socialUrls[0].youtube, icon: Youtube, label: 'YouTube' },
  { href: socialUrls[0].twitter, icon: Twitter, label: 'Twitter' },
];

export default function Footer() {
  const pathname = usePathname();
  const compactRoutes = ['/auth/', '/profile', '/dashboard', '/contact-us'];
  const isCompact = compactRoutes.some(route => pathname.startsWith(route));

  return (
    <footer className="relative z-20 overflow-hidden border-t border-[#E8E8EE] bg-[#F0F0F5]">
      {!isCompact && (
        <section className="mx-auto max-w-[1320px] px-5 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#DDD5FF] bg-[#EEE9FF] px-6 py-12 sm:px-10 sm:py-14 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-14">
            <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.17em] text-[#633CFF]"><span className="h-2 w-2 rounded-full bg-[#633CFF]" />Available for select projects</div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-.045em] text-[#151515] sm:text-4xl lg:text-5xl">Bring the idea. I&apos;ll help make it clear, useful, and memorable.</h2>
            </div>
            <Link href="/contact-us" className="relative mt-8 inline-flex min-h-13 w-fit items-center gap-3 rounded-full bg-[#633CFF] px-6 font-semibold text-white shadow-[0_14px_35px_rgba(99,60,255,.24)] transition hover:-translate-y-1 hover:bg-[#5130DB] lg:mt-0">Start a project <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1320px] px-5 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20 lg:px-10">
        <div className="grid gap-12 border-b border-[#DCDCE4] pb-14 sm:grid-cols-2 lg:grid-cols-[1.25fr_.55fr_.55fr_1fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="The Freelancer home">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-black p-1.5 shadow-sm">
                <Image src={logo} width={44} height={44} alt="The Freelancer logo" className="h-full w-full rounded-lg object-contain" />
              </span>
              <span className="text-lg font-semibold tracking-tight">The Freelancer<span className="text-[#633CFF]">.</span></span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#686868]">An independent creative development studio building focused websites, full-stack products, and high-impact video for ambitious teams.</p>
            <div className="mt-7 flex gap-2">
              {socials.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-[#DCDCE4] bg-white text-[#686868] transition hover:-translate-y-1 hover:border-[#633CFF] hover:text-[#633CFF]"><Icon className="h-4 w-4" /></a>
              ))}
            </div>
          </div>

          {Object.entries(navigation).map(([title, items]) => (
            <nav key={title} aria-label={`${title} links`}>
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8A8A8A]">{title}</p>
              <ul className="mt-5 space-y-3.5">{items.map(item => <li key={item.href}><Link href={item.href} className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#454545] transition hover:text-[#633CFF]">{item.label}<ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 transition group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" /></Link></li>)}</ul>
            </nav>
          ))}

          <div className="rounded-2xl border border-[#E8E8EE] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8A8A8A]">Direct contact</p>
            <a href="mailto:thefreelancers27@gmail.com" className="mt-5 flex items-start gap-3 text-sm text-[#454545] transition hover:text-[#633CFF]"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#633CFF]" /><span className="break-all">thefreelancers27@gmail.com</span></a>
            <a href="tel:+917004505998" className="mt-4 flex items-center gap-3 text-sm text-[#454545] transition hover:text-[#633CFF]"><Phone className="h-4 w-4 shrink-0 text-[#633CFF]" />(+91) 700 450 5998</a>
            <div className="mt-6 flex items-center gap-2 border-t border-[#E8E8EE] pt-5 text-xs font-medium text-[#686868]"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span>Typically replies within one day</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-[#8A8A8A] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Freelancer. All rights reserved.</p>
          <p>Designed and developed with care in India.</p>
        </div>
      </section>

      <div className="pointer-events-none mx-auto max-w-[1320px] overflow-hidden px-5 sm:px-8 lg:px-10" aria-hidden="true">
        <p className="translate-y-[18%] whitespace-nowrap text-center text-[clamp(4rem,12vw,10rem)] font-semibold leading-none tracking-[-.075em] text-[#E2E2E9]">THE FREELANCER</p>
      </div>
    </footer>
  );
}
