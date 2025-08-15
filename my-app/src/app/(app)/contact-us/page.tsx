import ContactupPageClient from './contact-us-client'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us – Let’s Collaborate on Your Next Project',
  description:"Get in touch with The Freelancer Shop for professional video editing and web design services." ,
  keywords: [
    "video editing",
    "freelance editor",
    "motion graphics",
    "commercial video editing",
    "YouTube editing",
    "web design services",
    "The Freelancer Shop",
  ],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "Contact Us – The Freelancer Shop",
    description: "Reach out for professional video editing, motion graphics, and website development support.",
    url: "https://thefreelancer.shop/contact-us",
    siteName: "The Freelancer Shop",
    type: "website",
    images: [
      {
        url: "https://thefreelancer.shop/assets/contact-banner.png",
        width: 1200,
        height: 630,
        alt: "The Freelancer Shop Contact Us Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us – The Freelancer Shop",
    description: "Let’s collaborate! Contact us for creative video editing and web services.",
    images: ["https://thefreelancer.shop/assets/contact-banner.png"],
  },
  metadataBase: new URL("https://thefreelancer.shop/"),
};

export default function ContactusPage() {
  return <ContactupPageClient/>;
}
