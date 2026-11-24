'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Braces, Database, Gauge, LayoutTemplate } from 'lucide-react';
import frontendImg from '@/assets/web-client/web-dev.webp';
import ProjectFrame from '@/component/ProjectFrame';
import razorpayImg from '@/assets/web-client/Razorpay Landing Page Clone.webp';
import weatherForecastImg from '@/assets/web-client/Live Weather Forecast App.webp';
import eCommerceCartImg from '@/assets/web-client/React E-commerce Cart System.webp';
import freelancerAgencyImg from '@/assets/web-client/Freelancer Agency Platform.webp';
import employeeManagementImg from '@/assets/web-client/Employee Management System.webp';

interface Project { id: number; title: string; description: string; feature?: boolean; date: string; img: string | StaticImageData; url: string }
const frontend: Project[] = [
  { id: 1, title: 'Razorpay Landing Page Clone', description: 'A responsive financial product landing experience built with React and Tailwind CSS.', feature: true, date: '25/07/2025', img: razorpayImg, url: 'https://sahils-razorpay-clone.netlify.app' },
  { id: 2, title: 'Live Weather Forecast App', description: 'A live forecast interface with location search and dynamic weather data.', date: '14/01/2025', img: weatherForecastImg, url: 'https://weather-app-not-accurate.netlify.app' },
  { id: 3, title: 'React E-commerce Cart', description: 'A commerce experience with reusable components and context-based state.', date: '02/04/2025', img: eCommerceCartImg, url: 'https://shopping-cart-first.netlify.app' },
];
const fullstack: Project[] = [
  { id: 4, title: 'Freelancer Agency Platform', description: 'A full-stack product showcase with authentication and data-driven content.', feature: true, date: '19/03/2025', img: freelancerAgencyImg, url: 'https://freelancer-agency.netlify.app/' },
  { id: 5, title: 'Employee Management System', description: 'A focused system for employee registration and record management.', date: '30/05/2025', img: employeeManagementImg, url: 'https://test-the-back.netlify.app/' },
];

export default function WebPortfolio() {
  return (
    <main className="pt-24">
      <section className="mx-auto max-w-[1380px] px-6 py-20 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[.88fr_1.12fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEE9FF] px-4 py-2 text-sm font-semibold text-[#633CFF]"><Braces className="h-4 w-4" /> Web engineering portfolio</div>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-6xl">Products that feel simple because the engineering isn&apos;t.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#686868]">Responsive websites and full-stack applications designed around clarity, speed, accessibility, and maintainable code.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#frontend" className="portfolio-button gap-2">Browse projects <ArrowRight className="h-4 w-4" /></a><Link href="/contact-us" className="portfolio-button-secondary">Discuss a build</Link></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-[2rem] bg-[#151515] p-3 shadow-2xl"><Image src={frontendImg} alt="Web development projects displayed on devices" priority className="h-[480px] w-full rounded-[1.4rem] object-cover" /><div className="absolute bottom-7 left-7 right-7 grid grid-cols-3 rounded-2xl border border-white/10 bg-[#151515]/90 p-5 text-white backdrop-blur"><div><p className="text-xl font-semibold">5+</p><p className="text-xs text-white/50">Live products</p></div><div><p className="text-xl font-semibold">100%</p><p className="text-xs text-white/50">Responsive</p></div><div><p className="text-xl font-semibold">A11y</p><p className="text-xs text-white/50">Considered</p></div></div></motion.div>
        </div>
      </section>

      <section className="border-y border-[#E8E8EE] bg-white py-20"><div className="mx-auto max-w-[1280px] px-6 lg:px-10"><p className="text-center text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">Development capabilities</p><div className="mt-10 grid gap-4 md:grid-cols-4">{[
        [LayoutTemplate, 'Interface systems', 'Responsive, reusable UI designed for consistency.'],
        [Braces, 'Frontend builds', 'React and Next.js experiences with clean component logic.'],
        [Database, 'Full-stack systems', 'APIs, databases, authentication, and dynamic content.'],
        [Gauge, 'Optimization', 'SEO, accessibility, performance, and deployment readiness.'],
      ].map(([Icon, title, text]) => { const C = Icon as typeof Braces; return <article key={title as string} className="rounded-2xl bg-[#F8F9FC] p-6"><C className="h-5 w-5 text-[#633CFF]" /><h2 className="mt-8 font-semibold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-[#686868]">{text as string}</p></article> })}</div></div></section>

      <section id="frontend" className="scroll-mt-24"><ProjectFrame id="frontend-projects" title="Frontend experiences" description="Responsive interfaces focused on usability, detail, and dependable performance." projects={frontend} /></section>

      <section className="bg-[#F0F0F5] py-5"><ProjectFrame id="fullstack" title="Full-stack products" description="End-to-end applications that connect polished interfaces to practical backend systems." projects={fullstack} /></section>

      <section className="mx-auto max-w-[1200px] px-6 py-28 lg:px-10"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">Build process</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">From rough idea to reliable release.</h2></div><ol className="grid gap-3 sm:grid-cols-2">{[['01', 'Scope', 'Goals, users, requirements, and success criteria.'], ['02', 'Prototype', 'Information architecture and interaction direction.'], ['03', 'Build', 'Responsive components, data, and integrations.'], ['04', 'Launch', 'QA, performance checks, deployment, and support.']].map(([n, title, text]) => <li key={n} className="rounded-2xl border border-[#E8E8EE] bg-white p-6"><span className="text-sm font-semibold text-[#633CFF]">{n}</span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#686868]">{text}</p></li>)}</ol></div></section>

      <section className="mx-auto max-w-[1200px] px-6 pb-28 lg:px-10"><div className="rounded-[2rem] bg-[#633CFF] px-7 py-14 text-white sm:flex sm:items-center sm:justify-between sm:px-12"><div><p className="text-sm text-white/65">Need a website or product?</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Let&apos;s build the right version first.</h2></div><Link href="/contact-us" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-[#151515] sm:mt-0">Start a project <ArrowRight className="h-4 w-4" /></Link></div></section>
    </main>
  );
}
