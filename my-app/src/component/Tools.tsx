import React from 'react';
import prLogo from '@/assets/logo/Adobe_Premiere logo.webp';
import aeLogo from '@/assets/logo/Adobe After logo.webp';
import davinciResolve from '@/assets/logo/davinci-resolve logo.webp';
import filmora from '@/assets/logo/Filmora logo.webp';
import Logo from './Logo';
import { motion } from 'framer-motion';

const Tools = () => {
  const tools = [
    { logo: prLogo, appName: 'Adobe Premiere Pro' },
    { logo: aeLogo, appName: 'Adobe After Effects' },
    { logo: davinciResolve, appName: 'DaVinci Resolve' },
    { logo: filmora, appName: 'Filmora' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 sm:py-16 lg:px-10"
    >
      <h3 className="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-4xl">
        Professional toolset
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
        {tools.map(({ logo, appName }, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            viewport={{ once: true }}
            className="portfolio-surface flex min-h-36 flex-col items-center justify-center rounded-2xl p-4 text-center sm:min-h-0 sm:p-6"
          >
            <Logo logo={logo} appName={appName} />
            {/* <p className="mt-4 text-base font-semibold">{appName}</p> */}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Tools;

