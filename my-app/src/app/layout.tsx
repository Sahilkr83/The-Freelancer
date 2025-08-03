import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppContextProvider from "./context/AppContext";
import NavBar from "@/app/component/NavBar";
import Footer from "./component/Footer";
import { Toaster } from "react-hot-toast";
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
  description: "Professional video editing, motion graphics, and responsive web design to elevate your brand. Hire freelance editors today!",
  icons: {
    icon: '/fivicon.ico',             // your favicon
    apple: '/apple-touch-icon.png',  // apple touch icon for iOS devices
  },
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
    title: "The Freelancer Shop – Video Editing & Web Design Services",
    description: "Elevate your brand with professional video editing, motion graphics, and creative web design services.",
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
    description: "Transform your content into stunning visuals and interactive websites with expert freelance services.",
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
<html lang="en">
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white font-['Rajdhani',_sans-serif]`}>
    <AppContextProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Layered radial glow effect */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 -top-36 bg-[radial-gradient(circle_600px_at_50%_200px,#444cf7_30%,transparent_80%)] opacity-40 blur-2xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_80%_100px,#4f46e5,transparent)] opacity-20 blur-xl"></div>
        </div>

        {/* Main layout */}
        <div className="relative z-10">
          <NavBar />
          <Toaster
            position="top-center"
            toastOptions={{
              className: 'custom-toast',
                style: {
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                },
              success: {
                style: {
                  background: 'linear-gradient(135deg, #4ade80, #22c55e)', // green gradient
                  color: '#fff',
                  boxShadow: '0 8px 25px rgba(34, 197, 94, 0.5)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                },
                className: 'custom-toast',
              },
              error: {
                style: {
                  background: 'linear-gradient(135deg, #f87171, #ef4444)', // red gradient
                  color: '#fff',
                  boxShadow: '0 8px 25px rgba(239, 68, 68, 0.5)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                },
                className: 'custom-toast',
              },
            }}
          />
          {children}
          <Footer />
        </div>
      </div>
    </AppContextProvider>
  </body>
</html>

  );
}
