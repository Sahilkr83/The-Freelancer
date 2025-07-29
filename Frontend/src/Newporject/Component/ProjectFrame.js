import React from 'react';

export default function ProjectFrame({
  id,
  img1,
  img2,
  img3,
  editName,
  video1,
  video2,
  video3,
  description,
  demoDescriptions = [],
}) {
  // Combine only valid media pairs
  const mediaItems = [
    { video: video1, img: img1, desc: demoDescriptions[0] },
    { video: video2, img: img2, desc: demoDescriptions[1] },
    { video: video3, img: img3, desc: demoDescriptions[2] },
  ].filter(item => item.video && item.img);

  // Dynamically decide grid class based on number of items
  let gridCols = 'grid-cols-1';
  if (mediaItems.length === 2) {
    gridCols = 'sm:grid-cols-2';
  } else if (mediaItems.length >= 3) {
    gridCols = 'sm:grid-cols-2 md:grid-cols-3';
  }

  return (
    <section id={id} className="my-20">
      <h3 className="text-2xl font-bold mb-5">{editName}</h3>
      {description && <p className="mb-5">{description}</p>}

      <div className={`grid gap-4 justify-items-center ${gridCols}`}>
        {mediaItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-md p-2 text-center w-full"
          >
            <a href={item.video.url} target="_blank" rel="noreferrer">
              <img
                src={item.img}
                alt={`Demo ${idx + 1}`}
                className="w-full h-auto rounded hover:opacity-90 transition duration-300"
              />
            </a>
            {item.desc && (
              <p className="text-base text-white my-2">{item.desc}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
