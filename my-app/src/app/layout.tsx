import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import LayoutWrapper from "./(app)/LayoutWrapper";
import AppContextProvider from "@/context/AppContext";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Freelancer Shop – Video Editing & Web Design Services",
  description: "Expert freelance video editing, motion graphics, and modern responsive web design services to elevate your brand and digital presence.",
  icons: {
    apple: '/apple-touch-icon.png',  
  },
  keywords: [
    "professional video editing",
    "pro video editor",
    "video editing services",
    "freelance video editor",
    "motion graphics",
    "commercial video editing",
    "YouTube video editing",
    "video post production",
    "web design services",
    "professional web design",
    "responsive web design",
    "modern web design",
    "React web developer",
    "Next.js developer",
    "Tailwind CSS",
    "full stack web developer",
    "freelance web designer",
    "freelance web developer",
    "SEO friendly websites",
    "creative digital solutions",
    "The Freelancer Shop",
  ],
  authors: [{ name: "The Freelancer Shop" }],
  openGraph: {
    title: "The Freelancer Shop – Video Editing & Web Design Services",
    description: "Transform your content with professional video editing and build sleek, SEO-friendly websites using React and Next.js.",
    url: "https://thefreelancer.shop/",
    siteName: "The Freelancer Shop",
    type: "website",
    images: [
      {
        url: "https://thefreelancer.shop/assets/home-banner.png",
        width: 1200,
        height: 630,
        alt: "The Freelancer Shop Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Freelancer Shop – Video Editing & Web Design Services",
    description: "Expert freelance video editing, motion graphics, and web design services tailored to grow your brand and online presence.",
    images: ["https://thefreelancer.shop/assets/home-banner.png"],
    site: "@thefreelancer27",
  },
  metadataBase: new URL("https://thefreelancer.shop/"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en" suppressHydrationWarning>
  <head>
    {/* ✅ Google Analytics */}
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-HJ9BJPTM79"
    />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HJ9BJPTM79');
      `}
    </Script>
    <meta name="google-adsense-account" content="ca-pub-5488328565550611"></meta>
  </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-['Rajdhani',_sans-serif]`}>
      <AuthProvider>
        <LayoutWrapper>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </LayoutWrapper>
      </AuthProvider>
    </body>
  </html>

  );
}
