import VideoPageClient from './video-client';

export const metadata = {
  title: 'Professional Video Editing Services – The Freelancer Shop',
  description: 'High-quality video editing services including motion graphics, color grading, audio enhancement, and cinematic storytelling. Perfect for YouTube, social media, and business projects.',
  keywords: [
    "video editing services",
    "professional video editor",
    "motion graphics",
    "color grading",
    "cinematic video editing",
    "social media video editing",
    "YouTube video editing",
    "video production",
    "corporate video editing",
    "promo video editing",
    "freelance video editor",
    "video post-production",
    "The Freelancer Shop",
  ],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "Professional Video Editing Services – The Freelancer Shop",
    description: "From cinematic storytelling to engaging social media clips, The Freelancer Shop delivers professional, polished video edits tailored to your needs.",
    url: "https://thefreelancer.shop/video-editing",
    siteName: "The Freelancer Shop",
    type: "website",
    images: [
      {
        url: "https://thefreelancer.shop/assets/video-editing-og-banner.webp",
        width: 1200,
        height: 630,
        alt: "The Freelancer Shop Video Editing Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Video Editing Services – The Freelancer Shop",
    description: "Motion graphics, cinematic storytelling, and flawless editing for YouTube, social media, and businesses.",
    images: ["https://thefreelancer.shop/assets/video-editing-twitter-banner.webp"],
  },
  metadataBase: new URL("https://thefreelancer.shop/")
};

export default function VideoPage() {
  return <VideoPageClient />;
}

