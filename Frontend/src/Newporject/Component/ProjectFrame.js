import React from 'react';

export default function ProjectFrame({ id, title, description, projects = [] }) {
  let gridCols = 'grid-cols-1';
  if (projects.length === 2) {
    gridCols = 'sm:grid-cols-2';
  } else if (projects.length >= 3) {
    gridCols = 'sm:grid-cols-2 md:grid-cols-3';
  }

  // Width logic
  const getWidthClass = () => {
    if (projects.length === 2) return 'w-full md:w-[70%]';
    return 'w-full';
  };

  return (
    <section id={id} className="my-20 px-4">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {description && <p className="text-gray-300 mb-6">{description}</p>}

      <div className={`grid gap-6 justify-items-center ${gridCols}`}>
        {projects.map((item, idx) => (
          <div
            key={idx}
            className={`${getWidthClass()} bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-3 group animate-fadeInUp`}
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.title || `Project ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-auto rounded object-cover transition duration-300 group-hover:opacity-90"
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
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(item.url, '_blank', 'noopener,noreferrer');
                    }}
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
            </a>

            <div className="p-5 text-white">
              <div className="flex items-center mb-2">
                <span className="px-3 py-1 bg-blue-900 text-blue-200 text-xs rounded-full">
                  Website
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300 mb-4">{item.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{item.date}</span>
                <button
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-500"
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
          </div>
        ))}
      </div>
    </section>
  );
}
