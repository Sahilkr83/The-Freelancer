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
      className="max-w-[1460px] w-11/12 mx-auto py-20 text-white"
    >
      <h3 className="text-3xl sm:text-4xl font-extrabold mb-12 text-center">
        Tools We <span className="text-indigo-400">Use</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {tools.map(({ logo, appName }, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            viewport={{ once: true }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-indigo-500/30"
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

