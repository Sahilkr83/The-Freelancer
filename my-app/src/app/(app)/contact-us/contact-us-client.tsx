'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const { register } = useForm();
  const [formData, setFormData] = useState({ name: '', email: '', number: '', subject: '', help: '' });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    emailjs.sendForm('service_1wkykx4', 'template_5zil37u', form.current!, { publicKey: 'xAMcVpwEtgkUjpzOb' }).then(() => alert('Message sent successfully!'), error => alert(`Failed to send message: ${error.text}`));
    setFormData({ name: '', email: '', number: '', subject: '', help: '' });
  };

  return (
    <main className="pt-24">
      <section className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">Contact</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-[-.055em] sm:text-6xl lg:text-7xl">Let&apos;s turn your next idea into work that performs.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#686868]">Tell me about the project, the goal, and where you need help. You&apos;ll receive a clear, practical response—not a generic sales pitch.</p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <aside className="h-fit rounded-[1.75rem] bg-[#151515] p-7 text-white sm:p-9 lg:sticky lg:top-28">
            <h2 className="text-2xl font-semibold">Contact details</h2>
            <div className="mt-9 space-y-7">
              <a href="mailto:thefreelancers27@gmail.com" className="flex items-start gap-4"><Mail className="mt-1 h-5 w-5 text-[#A992FF]" /><span><span className="block text-xs uppercase tracking-wider text-white/45">Email</span><span className="mt-1 block">thefreelancers27@gmail.com</span></span></a>
              <a href="tel:+917004505998" className="flex items-start gap-4"><Phone className="mt-1 h-5 w-5 text-[#A992FF]" /><span><span className="block text-xs uppercase tracking-wider text-white/45">Phone / WhatsApp</span><span className="mt-1 block">(+91) 700 450 5998</span></span></a>
              <div className="flex items-start gap-4"><MapPin className="mt-1 h-5 w-5 text-[#A992FF]" /><span><span className="block text-xs uppercase tracking-wider text-white/45">Location</span><span className="mt-1 block">India · Working worldwide</span></span></div>
              <div className="flex items-start gap-4"><Clock3 className="mt-1 h-5 w-5 text-[#A992FF]" /><span><span className="block text-xs uppercase tracking-wider text-white/45">Typical response</span><span className="mt-1 block">Within one business day</span></span></div>
            </div>
            <div className="mt-12 border-t border-white/10 pt-7"><p className="text-sm leading-6 text-white/55">Available for website builds, product interfaces, video editing, motion graphics, and ongoing creative partnerships.</p></div>
          </aside>

          <section className="rounded-[1.75rem] border border-[#E8E8EE] bg-white p-7 shadow-[0_24px_70px_rgba(21,21,21,.07)] sm:p-10">
            <div className="flex items-end justify-between gap-5"><div><p className="text-sm font-semibold text-[#633CFF]">Project enquiry</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Tell me what you&apos;re building.</h2></div><ArrowUpRight className="hidden h-8 w-8 text-[#633CFF] sm:block" /></div>
            <form ref={form} onSubmit={sendEmail} className="mt-9 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">Your name<input {...register('name')} name="name" value={formData.name} onChange={handleChange} required className="input-primary mt-2 w-full" placeholder="Full name" /></label>
              <label className="text-sm font-medium">Email address<input {...register('email')} name="email" type="email" value={formData.email} onChange={handleChange} required className="input-primary mt-2 w-full" placeholder="you@company.com" /></label>
              <label className="text-sm font-medium">Phone number<input {...register('number')} name="number" type="tel" value={formData.number} onChange={handleChange} className="input-primary mt-2 w-full" placeholder="Optional" /></label>
              <label className="text-sm font-medium">Project type<input {...register('subject')} name="subject" value={formData.subject} onChange={handleChange} className="input-primary mt-2 w-full" placeholder="Website, video, or both" /></label>
              <label className="text-sm font-medium sm:col-span-2">Project details<textarea {...register('help')} name="help" value={formData.help} onChange={handleChange} required className="textarea-primary mt-2 w-full" placeholder="What are you trying to achieve, and when do you need it?" /></label>
              <button type="submit" className="portfolio-button mt-2 sm:col-span-2">Send project enquiry</button>
            </form>
          </section>
        </div>
      </section>

      <section className="border-y border-[#E8E8EE] bg-white py-24"><div className="mx-auto max-w-[1180px] px-6 lg:px-10"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">Before you ask</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">A few useful answers.</h2></div><div>{[['How quickly can we start?', 'Most projects can begin within one to two weeks, depending on scope and current availability.'], ['How long does a website take?', 'Focused portfolio and business sites usually take two to six weeks. Larger applications are planned in phases.'], ['Are revisions included?', 'Yes. Every proposal defines clear review points and revision rounds before work begins.'], ['Do you provide ongoing support?', 'Yes. Maintenance, optimization, and retained creative support are available after launch.']].map(([q, a]) => <div key={q} className="border-t border-[#E8E8EE] py-6"><h3 className="font-semibold">{q}</h3><p className="mt-2 leading-7 text-[#686868]">{a}</p></div>)}</div></div></div></section>
    </main>
  );
}
