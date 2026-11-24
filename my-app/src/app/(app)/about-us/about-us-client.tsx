'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Gem, Handshake, Zap } from 'lucide-react';
import aboutHero from '@/assets/Abouthero.webp';

const values = [
  { icon: Compass, title: 'Purpose before polish', text: 'Every creative and technical decision starts with the audience and the result it needs to produce.' },
  { icon: Gem, title: 'Care in the details', text: 'The final ten percent—pacing, spacing, performance, and finish—is where trust is won.' },
  { icon: Handshake, title: 'Open collaboration', text: 'Direct communication, clear milestones, and feedback that stays visible throughout the project.' },
  { icon: Zap, title: 'Momentum with quality', text: 'A focused workflow that moves quickly without compromising the parts people notice.' },
];

export default function AboutUs() {
  return (
    <main className="pt-24">
      <section className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">About the studio</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-.055em] sm:text-6xl">Creative instinct.<br />Technical discipline.</h1>
          </motion.div>
          <p className="max-w-xl text-lg leading-8 text-[#686868]">The Freelancer Shop is an independent digital studio combining web engineering, interface craft, and video post-production for founders, creators, and growing teams.</p>
        </div>
        <div className="mt-16 overflow-hidden rounded-[2rem] bg-[#EEE9FF] p-3 sm:p-5">
          <Image src={aboutHero} alt="Creative studio process and multidisciplinary design practice" priority className="h-[360px] w-full rounded-[1.4rem] object-cover sm:h-[560px]" />
        </div>
      </section>

      <section className="border-y border-[#E8E8EE] bg-white py-24"><div className="mx-auto grid max-w-[1180px] gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">The approach</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">One partner across creative and code.</h2></div>
        <div className="space-y-6 text-lg leading-8 text-[#686868]"><p>Great digital work should feel coherent. The message, interface, motion, and underlying technology should all pull in the same direction.</p><p>That is why the studio works across disciplines. A website is considered as both a product and a brand experience; a video is shaped as both a story and a business asset.</p><p>The result is work that looks considered, performs reliably, and remains useful after launch.</p></div>
      </div></section>

      <section className="mx-auto max-w-[1280px] px-6 py-28 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['120+', 'Clients supported'], ['250+', 'Projects delivered'], ['3+', 'Years of practice'], ['4.9', 'Average rating']].map(([number, label]) => <article key={label} className="rounded-2xl border border-[#E8E8EE] bg-white p-7"><p className="text-4xl font-semibold tracking-tight text-[#633CFF]">{number}</p><p className="mt-2 text-sm text-[#686868]">{label}</p></article>)}</div>
        <div className="mt-24 grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">Principles</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">What guides every project.</h2></div><div className="grid gap-4 sm:grid-cols-2">{values.map(({ icon: Icon, title, text }) => <motion.article whileHover={{ y: -4 }} key={title} className="rounded-2xl bg-[#F0F0F5] p-7"><Icon className="h-6 w-6 text-[#633CFF]" /><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-[#686868]">{text}</p></motion.article>)}</div></div>
      </section>

      <section className="bg-[#151515] py-28 text-white"><div className="mx-auto max-w-[1080px] px-6 lg:px-10"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#A992FF]">The journey</p><div className="mt-12 space-y-0">{[
        ['2022', 'Started with a focused video-editing practice for independent creators.'],
        ['2023', 'Expanded into responsive web development and full-stack applications.'],
        ['2024', 'Built ongoing relationships with brands, agencies, and global clients.'],
        ['Today', 'Operating as a multidisciplinary studio for complete digital experiences.'],
      ].map(([year, text]) => <div key={year} className="grid gap-3 border-t border-white/15 py-7 sm:grid-cols-[10rem_1fr]"><p className="font-semibold text-[#A992FF]">{year}</p><p className="text-lg text-white/70">{text}</p></div>)}</div></div></section>

      <section className="mx-auto max-w-[1100px] px-6 py-28 text-center"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">Next step</p><h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Good work starts with an honest conversation.</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-[#686868]">Share what you are building, where you are stuck, or what you want to improve. I&apos;ll help identify the clearest path forward.</p><Link href="/contact-us" className="portfolio-button mt-8 gap-2">Start a conversation <ArrowRight className="h-4 w-4" /></Link></section>
    </main>
  );
}
