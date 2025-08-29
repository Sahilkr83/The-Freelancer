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
      () => alert('Message sent successfully!'),
      (error) => alert(`Failed to send message: ${error.text}`)
    );

    setFormData({ name: '', email: '', number: '', subject: '', help: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="min-h-screen  py-12 px-6 sm:px-8 lg:px-20"
    >
      <div className="max-w-6xl mx-auto my-20 flex flex-col gap-20 leading-7">
        {/* Intro Section */}
        <section>
          <h2 className="text-indigo-400 text-lg font-semibold uppercase tracking-widest mb-2">Get In Touch</h2>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight">
            Contact Us — Send a Message to <span className="text-indigo-400">The Freelancer Shop</span>
          </h1>

          <div className="space-y-6   text-base sm:text-lg leading-relaxed mb-8">
            <p>
              Whether you’re looking for professional <strong>video editing</strong> to bring your story to life or expert <strong>web development</strong> to create a stunning, responsive online presence, we’re here to help turn your vision into reality.
            </p>
            <p>
              Our team delivers custom video edits—from promotional clips to cinematic content—while also crafting modern, high-performance websites tailored to your unique goals.
            </p>
            <p>
              Combining creative storytelling and cutting-edge technology, we use industry-leading tools like Adobe Premiere Pro, After Effects, DaVinci Resolve, React, Next.js, and Tailwind CSS to produce engaging digital experiences.
            </p>
            <p>
              Let us support your brand’s growth by creating captivating videos and seamless web applications designed to engage and impress your audience.
            </p>
          </div>

          <address
            className="not-italic space-y-5 text-gray-400"
            itemScope
            itemType="http://schema.org/Organization"
          >
            <div>
              <h2 className="text-xl font-semibold text-indigo-400 mb-1">Email Address</h2>
              <a href="mailto:thefreelancers27@gmail.com" itemProp="email" className="hover:underline break-words">
                thefreelancers27@gmail.com
              </a>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-indigo-400 mb-1">Call / WhatsApp</h2>
              <a href="tel:+917004505998" itemProp="telephone" className="hover:underline">
                (+91) 70045 05998
              </a>
            </div>
          </address>
        </section>


        {/* Our Services */}
        <section className=" rounded-3xl p-8 sm:p-10 shadow-xl shadow-indigo-900/50">
          <h2 className="text-indigo-400 text-2xl font-bold mb-6">Our Services</h2>

          <div className="mb-8">
            <h3 className=" text-indigo-400 text-xl font-semibold mb-4">Video Editing</h3>
            <ul className="list-disc list-inside   space-y-3">
              <li><strong>Corporate & Promo Videos:</strong> Professional videos tailored to your brand identity.</li>
              <li><strong>Social Media Reels:</strong> Dynamic short videos for Instagram, TikTok, and Facebook.</li>
              <li><strong>YouTube Content:</strong> Full edits including cuts, color grading, and sound design.</li>
              <li><strong>Event Highlights:</strong> Stunning recaps for weddings, conferences, and special occasions.</li>
              <li><strong>Motion Graphics & Effects:</strong> Custom animations and cinematic touches using After Effects.</li>
            </ul>
          </div>

          <div>
            <h3 className=" text-indigo-400 text-xl font-semibold mb-4">Web Development</h3>
            <ul className="list-disc list-inside   space-y-3">
              <li><strong>Custom Websites:</strong> Responsive, SEO-friendly sites built with React and Next.js.</li>
              <li><strong>E-commerce Solutions:</strong> Secure online stores with seamless user experience.</li>
              <li><strong>Portfolio & Business Sites:</strong> Showcasing your brand professionally and attractively.</li>
              <li><strong>API Integration & Backend:</strong> Full-stack capabilities for dynamic web applications.</li>
              <li><strong>Maintenance & Optimization:</strong> Ensuring fast load times and smooth performance.</li>
            </ul>
          </div>
        </section>

        {/* How We Work */}
        <section className=" rounded-3xl p-8 sm:p-10 shadow-xl shadow-indigo-900/50">
          <h2 className="text-indigo-400 text-2xl font-bold mb-6">How We Work</h2>
          <ol className="list-decimal list-inside   space-y-3">
            <li><strong>Consultation:</strong> We listen to understand your vision, goals, and requirements.</li>
            <li><strong>Planning:</strong> We map out timelines, workflows, and deliverables for clarity.</li>
            <li><strong>Creation:</strong> We develop your videos or websites with attention to detail and creativity.</li>
            <li><strong>Review:</strong> We collaborate with you to gather feedback and iterate.</li>
            <li><strong>Delivery & Support:</strong> We provide final assets and ongoing support as needed.</li>
          </ol>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-indigo-400 text-2xl font-bold mb-6">What Our Clients Say</h2>
          <div className="space-y-8  ">
            <blockquote className="border-l-4 border-indigo-400 pl-6 italic">
              “The Freelancer Shop created a stunning promotional video that boosted our brand awareness significantly.”
              <footer className="mt-2 font-semibold  text-indigo-400">— Priya K., Video Client</footer>
            </blockquote>

            <blockquote className="border-l-4 border-indigo-400 pl-6 italic">
              “Their web development skills are top-notch. Our new website is fast, beautiful, and drives more customers.”
              <footer className="mt-2 font-semibold  text-indigo-400">— Rahul S., Web Dev Client</footer>
            </blockquote>

            <blockquote className="border-l-4 border-indigo-400 pl-6 italic">
              “Excellent communication and quick turnaround on both video edits and website fixes. Highly recommended.”
              <footer className="mt-2 font-semibold  text-indigo-400">— Ayesha & Sameer, Happy Clients</footer>
            </blockquote>
          </div>
        </section>

        {/* FAQ Section */}
        <section className=" rounded-3xl p-8 sm:p-10 shadow-xl shadow-indigo-900/50">
          <h2 className="text-indigo-400 text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6  ">
            <div>
              <h3 className="font-semibold text-lg  text-indigo-400">What video formats do you deliver?</h3>
              <p>We deliver MP4, MOV, AVI, and other formats optimized for your platform or use case.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg  text-indigo-400">How long does web development usually take?</h3>
              <p>Typically 2-6 weeks depending on project scope, with regular updates and reviews.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg  text-indigo-400">Do you offer website maintenance?</h3>
              <p>Yes! We offer ongoing support and optimization packages to keep your site running smoothly.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg  text-indigo-400">Can you help with scriptwriting or storyboarding for videos?</h3>
              <p>Absolutely, we assist with creative planning to ensure your video’s story is clear and impactful.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg  text-indigo-400">What if I need revisions?</h3>
              <p>We provide multiple rounds of revisions on both video and web projects to ensure your satisfaction.</p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className=" rounded-3xl p-8 sm:p-10 shadow-xl shadow-indigo-900/50">
          <h4 className="text-indigo-400 text-2xl font-bold mb-6">Send Us a Message</h4>
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                {...register('name')}
                name="name"
                type="text"
                value={formData.name}
                placeholder="Your Name"
                onChange={handleChange}
                required
                className="input-primary flex-1"
              />
              <input
                {...register('email')}
                name="email"
                type="email"
                value={formData.email}
                placeholder="Your Email"
                onChange={handleChange}
                required
                className="input-primary flex-1"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                {...register('number')}
                name="number"
                type="tel"
                value={formData.number}
                placeholder="Your Number"
                onChange={handleChange}
                className="input-primary flex-1"
              />
              <input
                {...register('subject')}
                name="subject"
                type="text"
                value={formData.subject}
                placeholder="Subject"
                onChange={handleChange}
                className="input-primary flex-1"
              />
            </div>

            <textarea
              {...register('help')}
              name="help"
              rows={6}
              value={formData.help}
              placeholder="How can we help you?"
              onChange={handleChange}
              required
              className="textarea-primary"
            />

            <button
              type="submit"
              className="mt-4 py-4 bg-indigo-500 hover:bg-indigo-600 transition rounded-full font-semibold text-lg text-white shadow-md shadow-indigo-700/40"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Closing encouragement */}
        <section className="text-center text-gray-400 mt-12 mb-24">
          <p className="text-lg max-w-xl mx-auto">
            Ready to start your next video or web project? Reach out today and let’s create something amazing together.
          </p>
        </section>
      </div>

      {/* Tailwind CSS for inputs and textarea */}
      <style jsx>{`
        
      `}</style>
    </motion.div>
  );
};

export default ContactPage;
