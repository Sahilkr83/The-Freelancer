import AboutUsPageClient from './about-us-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – Meet The Freelancer Shop Team',
  description:
    "Discover the creative minds behind The Freelancer Shop. We specialize in video editing, motion graphics, and web development.",
  keywords: [
    "About The Freelancer Shop",
    "video editors team",
    "motion designers",
    "web developers",
    "creative agency",
    "freelance video editors",
    "The Freelancer Shop",
  ],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "About Us – The Freelancer Shop",
    description:
      "Learn about our team, mission, and the creative process behind our video editing and web design services.",
    url: "https://thefreelancer.shop/about-us",
    siteName: "The Freelancer Shop",
    type: "website",
    images: [
      {
        url: "https://thefreelancer.shop/assets/about-banner.png", 
        width: 1200,
        height: 630,
        alt: "The Freelancer Shop About Us Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us – The Freelancer Shop",
    description:
      "Get to know our team and how we bring brands to life with design and video.",
    images: ["https://thefreelancer.shop/assets/about-banner.png"],
  },
  metadataBase: new URL("https://thefreelancer.shop/"),
};

export default function AboutUsPage() {
  return <AboutUsPageClient />;
}
