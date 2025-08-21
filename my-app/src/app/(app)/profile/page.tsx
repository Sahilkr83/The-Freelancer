import ProfilePageClient from './profile-client';
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Profile – Manage Projects & Account Details',
  description:'',
  keywords: [''],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "",
    description: "",
    url: "https://thefreelancer.shop/profile",
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

export default function ProfilePage() {
  return <ProfilePageClient />;
}


