'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Captions, Clapperboard, Palette, Volume2 } from 'lucide-react';
import videoPortfolioImg from '@/assets/videoPortfolio.webp';
import podcastImg from '@/assets/podcast.webp';
import simpleImg from '@/assets/Simple.jpeg.webp';
import motionGraphic from '@/assets/news_image_3269.webp';
import commercial from '@/assets/Simple Edits.webp';
import Frame from '@/component/Frame';
import Tools from '@/component/Tools';
import urls from '@/component/urlfiles/Urls';

const categories = [
  { href: '#podcast', image: podcastImg, label: 'Podcast', detail: 'Multi-camera pacing' },
  { href: '#simple', image: simpleImg, label: 'Social & basic', detail: 'Clean, fast storytelling' },
  { href: '#motion', image: motionGraphic, label: 'Motion graphics', detail: 'Designed movement' },
  { href: '#commercial', image: commercial, label: 'Commercial', detail: 'Brand-led impact' },
];

export default function VideoPortfolioPage() {
  return (
    <main className="pt-24">
      <section className="relative overflow-hidden bg-[#EEE9FF] px-0 pb-16 pt-14 text-[#151515] sm:py-24 lg:py-32">
        <div className="absolute right-0 top-0 h-[38rem] w-[38rem] rounded-full bg-white/80 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1380px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#633CFF] sm:text-sm sm:tracking-[.18em]">Video & motion portfolio</p><h1 className="mt-4 text-[2.65rem] font-semibold leading-[1.02] tracking-[-.055em] sm:mt-5 sm:text-6xl">Editing that gives every second a reason to stay.</h1><p className="mt-5 max-w-xl text-base leading-7 text-[#686868] sm:mt-7 sm:text-lg sm:leading-8">Post-production for brands and creators who need stronger pacing, clearer stories, and a visual identity people recognize.</p><div className="mt-7 grid grid-cols-2 gap-2 sm:mt-9 sm:flex sm:flex-wrap sm:gap-3"><a href="#work" className="portfolio-button gap-2 px-4 text-sm sm:px-6 sm:text-base">Watch work <ArrowRight className="h-4 w-4" /></a><Link href="/contact-us" className="portfolio-button-secondary px-4 text-sm sm:px-6 sm:text-base">Book an edit</Link></div></motion.div>
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="overflow-hidden rounded-[1.5rem] border border-white bg-white p-2 shadow-[0_24px_70px_rgba(82,59,171,.14)] sm:rounded-[2rem] sm:p-3"><Image src={videoPortfolioImg} alt="Professional video editing portfolio" priority className="h-[285px] w-full rounded-[1.1rem] object-cover sm:h-[420px] sm:rounded-[1.4rem] lg:h-[500px]" /></motion.div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-5"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#633CFF] sm:text-sm sm:tracking-[.18em]">Browse by format</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:mt-4 sm:text-4xl">A different rhythm for every story.</h2></div><p className="max-w-md text-sm leading-6 text-[#686868] sm:text-base">Choose a category to jump directly into the relevant edit collection.</p></div><div className="-mx-5 mt-8 flex gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:px-0 sm:pb-0 lg:grid-cols-4">{categories.map((category, index) => <a href={category.href} key={category.label} className="group w-[72vw] max-w-[250px] shrink-0 overflow-hidden rounded-2xl border border-[#E8E8EE] bg-white p-2.5 sm:w-auto sm:max-w-none sm:p-3"><div className="overflow-hidden rounded-xl bg-[#F0F0F5]"><Image src={category.image} alt={category.label} loading={index === 0 ? 'eager' : 'lazy'} className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-48" /></div><div className="flex items-end justify-between p-2 pt-4 sm:p-3 sm:pt-5"><div><h3 className="font-semibold">{category.label}</h3><p className="mt-1 text-xs text-[#686868] sm:text-sm">{category.detail}</p></div><ArrowRight className="h-4 w-4 text-[#633CFF]" /></div></a>)}</div></section>

      <section className="border-y border-[#E8E8EE] bg-white py-10 sm:py-20"><div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-2.5 px-5 sm:gap-5 sm:px-8 md:grid-cols-4 lg:px-10">{[[Clapperboard, 'Story & pacing'], [Palette, 'Color treatment'], [Volume2, 'Sound design'], [Captions, 'Titles & captions']].map(([Icon, text]) => { const C = Icon as typeof Clapperboard; return <div key={text as string} className="flex flex-col gap-3 rounded-xl bg-[#F8F9FC] p-4 sm:flex-row sm:items-center sm:p-5"><C className="h-5 w-5 text-[#633CFF]" /><span className="text-sm font-medium sm:text-base">{text as string}</span></div> })}</div></section>

      <div className="mx-auto max-w-[1380px] px-5 py-8 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <Frame editName="Podcast" id="podcast" videos={[urls[0].pd2, urls[0].pd1, urls[0].pd3, urls[0].pd4, urls[0].pd5, urls[0].pd6, urls[0].pd7]} items={[{ number: '4.', type: 'Clean multi-cam cuts' }, { number: '5.', type: 'Engaging pacing' }, { number: '6.', type: 'Social-ready clips' }]} />
        <Frame editName="Social" id="simple" videos={[urls[0].simple1, urls[0].simple2, urls[0].simple3]} />
        <Frame editName="Motion Graphics" id="motion" videos={[urls[0].motion1, urls[0].motion3, urls[0].motion2]} items={[{ number: '4.', type: 'Dynamic visual hooks' }, { number: '5.', type: 'Custom transitions' }, { number: '6.', type: 'High-impact animation' }]} />
        <Frame editName="Commercial" id="commercial" videos={[urls[0].ad1, urls[0].ad2, urls[0].ad3]} items={[{ number: '4.', type: 'Brand-led storytelling' }, { number: '5.', type: 'Advanced color grading' }, { number: '6.', type: 'Ad-focused sequencing' }]} />
      </div>

      <section className="bg-[#EEE9FF] py-8 sm:py-16"><Tools /></section>
      <section className="mx-auto max-w-[1100px] px-5 py-20 text-center sm:px-8 sm:py-28"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#633CFF] sm:text-sm sm:tracking-[.18em]">Your footage, elevated</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Ready for an edit that earns attention?</h2><Link href="/contact-us" className="portfolio-button mt-7 gap-2 sm:mt-8">Discuss your video <ArrowRight className="h-4 w-4" /></Link></section>
    </main>
  );
}
