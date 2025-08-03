'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const form = useRef<HTMLFormElement>(null);
  const { register } = useForm();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    subject: '',
    help: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs.sendForm('service_1wkykx4', 'template_5zil37u', form.current!, {
      publicKey: 'xAMcVpwEtgkUjpzOb',
    }).then(
      () => console.log('SUCCESS!'),
      (error) => console.error('FAILED...', error.text)
    );

    setFormData({ name: '', email: '', number: '', subject: '', help: '' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <div className="w-11/12 max-w-[1350px] mx-auto pt-[140px] pb-[140px] text-white">
        <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="text-[20px] text-[#a8e3f5]">
          Get In Touch _____
        </motion.p>

        <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="md:text-[51px] text-[39px] font-bold pt-4">
          Send Us a Message So We Can Work Together & Make Something Happen
        </motion.h1>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="pt-5 text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          <p>
            Whether you need a promotional video, YouTube content, a cinematic masterpiece, or high-quality visuals for your website — we’re here to transform your ideas into stunning, professional-grade videos.
          </p>
          <p className="mt-4">
            Our expert editors specialize in storytelling that connects with your audience, delivering custom edits that match your brand and goals.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="pt-24 flex flex-col md:flex-row">
          <div className="max-w-[405px] pr-[2.5rem] font-semibold">
            <h2  className="text-[2rem]">Drop Us a Line</h2>

            <div className="h-[2.5rem]" />

            <address itemScope itemType="http://schema.org/Organization">
              <h2 className="text-[1.5rem]">Email Address</h2>
              <a  className="text-base" href="mailto:thefreelancers27@gmail.com" itemProp="email">
                thefreelancers27@gmail.com
              </a>

              <div className="h-[2.5rem]" />

              <h2  className="text-[1.5rem]">Call/Whatsapp</h2>
              <a  className="text-base" href="tel:+917004505998" itemProp="telephone">
                (+91) 70045 05998
              </a>
            </address>
          </div>

          <div className="md:pl-[60px] pt-2 w-full pr-8 md:pr-0 lg:pr-0">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
              <div className="flex gap-6 flex-col md:flex-row">
                <input  {...register('name')} className="input" name="name" type="text" value={formData.name} placeholder="Your Name" onChange={handleChange} />
                <input  {...register('email')} className="input" name="email" type="email" value={formData.email} placeholder="Your Email" onChange={handleChange} />
              </div>

              <div className="flex gap-6 flex-col md:flex-row">
                <input  {...register('number')} className="input" name="number" type="tel" value={formData.number} placeholder="Your Number" onChange={handleChange} />
                <input  {...register('subject')} className="input" name="subject" type="text" value={formData.subject} placeholder="Subject" onChange={handleChange} />
              </div>

              <textarea
                {...register('help')}
                className="textarea max-w-[865px]"
                rows={10}
                name="help"
                value={formData.help}
                placeholder="How can we help you?"
                onChange={handleChange}
              />

              <button type="submit" className="py-5 px-[45px] text-[15px] md:w-fit bg-[#a8e3f5] text-black rounded-[35px] font-semibold">
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
