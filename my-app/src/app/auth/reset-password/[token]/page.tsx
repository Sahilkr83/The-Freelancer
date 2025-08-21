// src/app/auth/reset-password/[token]/page.tsx
import ResetPasswordClient from './ResetPasswordClient';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ token: string }>; // params is now a Promise
}

export const metadata: Metadata = {
  title: 'Change Your Password – The Freelancer Shop',
  description:'',
  keywords: [''],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "",
    description: "",
    url: "https://thefreelancer.shop/signup",
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

const ResetPasswordPage = async ({ params }: PageProps) => {
  const resolvedParams = await params; // unwrap the promise
  const token = resolvedParams.token;

  return <ResetPasswordClient token={token} />;
};

export default ResetPasswordPage;
