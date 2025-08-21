import WebDevPageClient from './web-client';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Web Development Portfolio – Frontend & Full-Stack Projects',
  description:'Explore cutting-edge web development projects by The Freelancer Shop, including frontend designs, backend APIs, and full-stack applications.',
  keywords: [
    "web design services",
    "ux/ui design services",
    "freelance web developer",
    "portfolio website design",
    "personal branding website",
    "creative digital portfolio",
    "modern website design",
    "website optimization",
    "seo for portfolios",
    "frontend web development",
    "web animation and motion graphics",
    "landing page design",
    "the Freelancer Shop",
  ],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "Web Development Portfolio – The Freelancer Shop",
    description: "Frontend and full-stack projects using React, Node.js, MongoDB, and more. Optimized, responsive, and SEO-friendly solutions tailored to your business.",
    url: "https://thefreelancer.shop/web-development",
    siteName: "The Freelancer Shop",
    type: "website",
    images: [
      {
        url: "https://thefreelancer.shop/assets/webdev-og-banner.webp",
        width: 1200,
        height: 630,
        alt: "The Freelancer Shop Web Development Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Portfolio – The Freelancer Shop",
    description: "Explore modern frontend and full-stack web apps created by The Freelancer Shop.",
    images: ["https://thefreelancer.shop/assets/webdev-twitter-banner.webp"],
  },
  metadataBase: new URL("https://thefreelancer.shop/")
};

export default function WebDevPage() {
  return <WebDevPageClient />;
}

