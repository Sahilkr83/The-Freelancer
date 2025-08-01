import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    subject: '',
    help: '',
  });
  const { register } = useForm();
  const form = useRef();

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const sendEmail = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', number: '', subject: '', help: '' });

    emailjs
      .sendForm('service_1wkykx4', 'template_5zil37u', form.current, {
        publicKey: 'xAMcVpwEtgkUjpzOb',
      })
      .then(
        () => console.log('SUCCESS!'),
        (error) => console.log('FAILED...', error.text)
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className="w-11/12 max-w-[1350px] mx-auto pt-[100px] pb-[140px] px-[10px] text-white relative z-20">
      <Helmet>
        <title>Contact Us – Let’s Collaborate on Your Next Project</title>
        <meta name="description" content="Get in touch with The Freelancer Shop for professional video editing and web design services." />
        <link rel="canonical" href="https://thefreelancer.shop/contactus" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us – The Freelancer Shop" />
        <meta property="og:description" content="Reach out for professional video editing, motion graphics, and website development support." />
        <meta property="og:url" content="https://thefreelancer.shop/contactus" />
        <meta property="og:image" content="https://thefreelancer.shop/assets/contact-banner.png" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us – The Freelancer Shop" />
        <meta name="twitter:description" content="Let’s collaborate! Contact us for creative video editing and web services." />
        <meta name="twitter:image" content="https://thefreelancer.shop/assets/contact-banner.png" />
        <meta name="twitter:site" content="@thefreelancer27" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "url": "https://thefreelancer.shop/contactus",
              "name": "Contact Us – The Freelancer Shop",
              "description": "Reach out to us for professional video editing or web design help.",
              "mainEntity": {
                "@type": "Organization",
                "name": "The Freelancer Shop",
                "url": "https://thefreelancer.shop",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-7004505998",
                  "contactType": "customer service",
                  "email": "thefreelancers27@gmail.com"
                }
              }
            }
          `}
        </script>
      </Helmet>

      <div>
        <p className="text-[20px] text-[#a8e3f5]">Get In Touch _____</p>
        <h1 className="md:text-[51px] text-[39px] font-semibold">Send Us a Message So We Can Work Together & Make Something Happen</h1>
        <div className=" pt-5">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Whether you need a promotional video, YouTube content, a cinematic masterpiece, or high-quality visuals for your website — we’re here to transform your ideas into stunning, professional-grade videos.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Our expert editors specialize in storytelling that connects with your audience, delivering custom edits that match your brand and goals. From social media reels to full-scale cinematic projects, we offer fast, reliable, and creative video editing services.
        </p>
        </div>
      </div>

      <div className="pt-24 flex w-full md:flex-row flex-col">
        <div className="max-w-[405px] w-11/12 pr-[2.5rem] font-semibold">
          <h2 className="text-[2rem]">Drop Us a Line</h2>
          <div className="h-[2.5rem]" />

          <address itemScope itemType="http://schema.org/Organization">
          <h2 className="text-[1.5rem]">Email Address</h2>
          <a className="text-base" href="mailto:thefreelancers27@gmail.com" itemProp="email">thefreelancers27@gmail.com</a>

          <div className="h-[2.5rem]" />

          <h2 className="text-[1.5rem]">Call/Whatsapp</h2>
          <a className="text-base" href="tel:+917004505998" itemProp="telephone">(+91) 70045 05998</a>
          </address>
          <div className="h-[2.5rem]" />
        </div>

        <div className="md:pl-[60px] pt-2 w-11/12">
          <form ref={form} onSubmit={sendEmail} className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-6 md:flex-row flex-col">
              <input {...register("name")} className="input" name="name" type="text" value={formData.name} placeholder="Your Name" onChange={changeHandler} />
              <input {...register("email")} className="input" name="email" type="email" value={formData.email} placeholder="Your Email" onChange={changeHandler} />
            </div>

            <div className="w-full flex gap-6 md:flex-row flex-col">
              <input {...register("number")} className="input" name="number" type="tel" value={formData.number} placeholder="Your Number" onChange={changeHandler} />
              <input {...register("subject")} className="input" name="subject" type="text" value={formData.subject} placeholder="Subject" onChange={changeHandler} />
            </div>

            <textarea {...register("help")} className="textarea max-w-[865px]" rows="10" name="help" value={formData.help} placeholder="How can we help you?" onChange={changeHandler} />

            <button className="py-5 px-[45px] text-[15px] md:w-fit bg-[#a8e3f5] text-black rounded-[35px] font-semibold">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default ContactUs;