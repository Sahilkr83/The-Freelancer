import SignInPageClient from './sign-in-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In to Your Freelancer Account – Secure Access',
  description:'',
  keywords: [''],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "",
    description: "",
    url: "https://thefreelancer.shop/auth/sign-in",
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

export default function SignInPage() {
  return <SignInPageClient />;
}

