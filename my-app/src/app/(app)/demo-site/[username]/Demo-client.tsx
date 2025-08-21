
'use client'
import React, { useState, useEffect } from "react";

  type Style = {
  color: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
};

type TextContent = {
  text: string;
  style: Style;
};

type FeatureService = {
  title: TextContent;
  description: TextContent;
};

type Content = {
  heroTitle: TextContent;
  heroSubtitle: TextContent;
  features: FeatureService[];
  about: TextContent;
  services: FeatureService[];
  contact: TextContent;
};
interface Props {
  username: string;
}

export default function DemoSitePage({username}:Props) {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/content?username=${encodeURIComponent(username)}`)
      .then((res) => res.json())
      .then((data: Content) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching content:", err));
  }, [username]);

    if (loading || !content) return(
      <div className="text-white pt-7 lg:px-7 z-20 mx-auto max-w-[1460px] w-11/12 min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinning loader */}
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold tracking-wide">Loading...</p>
        </div>
      </div>
    )
      // const handleTextChange = (field: keyof Content, value: string) => {
      // setContent({ ...content, [field]: { ...content[field], text: value } });
    // };

  return (
    <main className="font-sans text-gray-900 bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 px-6 text-center">
        <h1 className=" mb-4" style={{ ...content.heroTitle.style }}>{content.heroTitle.text}</h1>
        <p className=" max-w-2xl mx-auto" style={{ ...content.heroSubtitle.style }}>
          {content.heroSubtitle.text}
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2" style={{ ...feature.title.style }}>{feature.title.text}</h3>
            <p style={{ ...feature.description.style }}>{feature.description.text}</p>
          </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About</h2>
          <p className="text-lg text-gray-700 leading-relaxed" style={{ ...content.about.style }}>
            {content.about.text}
          </p>
        </div>
      </section>

      {/* Services / Projects Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            
              <h3 className=" font-semibold mb-2" style={{ ...service.title.style }}>{service.title.text}</h3>
              <p style={{ ...service.description.style }}>{service.description.text}</p>
            
          </div> 
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contact & Support</h2>
          <p className="text-gray-700 mb-4" style={{ ...content.contact.style }}>
            {content.contact.text}
          </p>
          <a
            href="mailto:demo@example.com"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-200 text-gray-600 text-center text-sm">
        &copy; {new Date().getFullYear()} Demo Site. All rights reserved.
      </footer>
    </main>
  );
}
