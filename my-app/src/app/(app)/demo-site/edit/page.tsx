import EditPageClient from './edit-client';
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Edit Demo Site | The Freelancer Shop',
  description: 'Edit your demo website with The Freelancer Shop platform. Customize content and style in real-time.',
  keywords: [''],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "",
    description: "",
    url: "https://thefreelancer.shop/demo-site/edit",
    siteName: "The Freelancer Shop",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "",
    description: "",
    images: [],
  },
   robots: {
    index: false,
    follow: false,
  },
  metadataBase: new URL("https://thefreelancer.shop/")
};

export default function EditPage() {
  return <EditPageClient />;
}


