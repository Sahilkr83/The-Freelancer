import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariant, cardVariant } from '@/lib/animationVariants';

interface InnerProject {
  id: number;
  title: string;
  description: string;
  feature?: boolean;
  date: string;
  img: string | StaticImageData;
  url: string;
}

interface ProjectFrameProps {
  id: string;
  title: string;
  description: string;
  projects: InnerProject[];
}

const ProjectFrame: React.FC<ProjectFrameProps> = ({ id, title, description, projects }) => {
  const gridCols =
    projects.length === 2
      ? 'sm:grid-cols-2'
      : projects.length >= 3
      ? 'sm:grid-cols-2 md:grid-cols-3'
      : 'grid-cols-1';

  const getWidthClass = () => (projects.length === 2 ? 'w-full md:w-[85%]' : 'w-full');

  return (
    <motion.section
      id={id}
      className="my-24 px-4 sm:px-10 max-w-[1400px] mx-auto"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariant}
    >
      <div className="text-center mb-16 space-y-3">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{title}</h3>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
          {description}
        </p>
      </div>

      <div className={`grid gap-10 justify-items-center ${gridCols}`}>
        {projects.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariant}
            whileHover={{ scale: 1.03, y: -5 }}
            viewport={{ once: true }}
            // transition={{ type: 'spring', stiffness: 100 }}
            className={`${getWidthClass()} bg-[#1f1f2f] rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-indigo-500 transition-all group
              flex flex-col
            `}
          >
            <div className="relative">
              <Image
                src={item.img}
                alt={item.title}
                width={800}
                height={600}
                className="w-full h-60 object-cover group-hover:opacity-90 transition-opacity duration-300"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNkZGQiLz48L3N2Zz4="
                loading="lazy"
              />

              {item.feature && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg animate-pulse ring-2 ring-yellow-300">
                  🚀 Featured
                </span>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <button
                  onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur"
                  aria-label="Open Project"
                >
                   <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                </button>
              </div>
            </div>

            <div className="p-6 text-white space-y-4 flex flex-col flex-grow">
              <span className="inline-block px-3 py-1 bg-blue-900 text-blue-200 text-xs font-medium rounded-full shadow-sm w-16">
                Website
              </span>

              <h4 className="text-2xl font-semibold group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h4>

              <p className="text-sm text-gray-300 leading-relaxed flex-grow">
                {item.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700 mt-4">
                <span>{item.date}</span>
                <button
                  className="flex items-center gap-1 text-indigo-400 hover:text-indigo-500 transition-all font-medium"
                  onClick={() => window.open(item.url, '_blank')}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Visit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectFrame;
