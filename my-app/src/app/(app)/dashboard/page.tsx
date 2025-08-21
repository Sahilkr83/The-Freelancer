import DashboardPageClient from './dashboard-client';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard – Manage Projects',
  description:'',
  keywords: [''],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "",
    description: "",
    url: "https://thefreelancer.shop/dashboard",
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

export default function DashboardPage() {
  return <DashboardPageClient />;
}


