"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Footer";
import FloatingParticles from "@/component/FloatingParticles";
import { Toaster } from "react-hot-toast";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isDomeSite = pathname.includes("demo-site");

  return (
    <>
      {!isDomeSite && <FloatingParticles />}
      <div className="relative min-h-screen overflow-x-hidden">
        {!isDomeSite && <NavBar />}
        {!isDomeSite && (
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
            }}
          />
        )}

        <div className="relative z-10">{children}</div>

        {!isDomeSite && <Footer />}
      </div>
    </>
  );
}
