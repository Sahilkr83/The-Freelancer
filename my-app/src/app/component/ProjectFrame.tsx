import Image from 'next/image';
import React from 'react';

interface InnerProject {
  id: number;
  title: string;
  description: string;
  feature?: boolean;
  date: string;
  img: string;
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

  const getWidthClass = () => (projects.length === 2 ? 'w-full md:w-[70%]' : 'w-full');

  return (
    <section id={id} className="my-20 px-4">
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      {description && <p className="text-gray-300 mb-6">{description}</p>}

      <div className={`grid gap-6 justify-items-center ${gridCols}`}>
        {projects.map((item, idx) => (
          <div
            key={item.id}
            className={`${getWidthClass()} bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-3 group animate-fadeInUp`}
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            <div className="relative">
              <Image
                src={item.img}
                alt={item.title}
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-auto object-cover transition duration-300 group-hover:opacity-90"
              />
              {item.feature && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                  Featured
                </span>
              )}
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-3 bg-black/40 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  aria-label="Open Project"
                  onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5a4 4 0 005.656-5.656l-3-3a4 4 0 00-5.656 5.656 1 1 0 001.414 1.414 2 2 0 012.828 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-5 text-white">
              <div className="mb-2">
                <span className="px-3 py-1 bg-blue-900 text-blue-200 text-xs rounded-full">
                  Website
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-gray-300 mb-4">{item.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{item.date}</span>
                <button
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-500"
                  onClick={() => window.open(item.url, '_blank')}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3a2 2 0 012.828 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Visit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectFrame;
