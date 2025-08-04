'use client';

import { useRef, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useRouter } from "next/navigation";
import href from "@/urlfiles/links";
import { usePathname } from "next/navigation";

const Footer = () => {
  const hideLayoutRoutes = ['/login', '/signup', '/contactus', '/profile', '/change-password', '/forget-password'];
  const pathname = usePathname();
  const contactOn = hideLayoutRoutes.includes(pathname);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter()
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((e) => console.warn("Autoplay prevented:", e));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-black text-white w-full relative overflow-hidden z-10 pb-8">
      {/* ==== CTA VIDEO SECTION ==== */}
      {!contactOn && (
        <section className="relative w-full h-[400px] overflow-hidden" aria-label="Video Background Section">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
            loop
            autoPlay
            preload="auto"
            src="https://res.cloudinary.com/dxp7dcmvr/video/upload/q_auto,f_auto/v1735458285/background_video_dbrrbr.mp4"
          >
            <track kind="captions" srcLang="en" label="No captions available" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex items-center justify-center px-6 text-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                Ready To Capture Your <br />
                Brand Vision?
              </h2>
              <p className="text-gray-300 text-sm md:text-base mb-6">
                We blend creativity and precision to tell your story with stunning visuals that leave a lasting impression.
              </p>
              <button
                onClick={() => router.push("/contactus")}
                className="inline-block bg-[#a8e3f5] text-black px-6 py-2 font-semibold rounded-md hover:bg-[#89d8f0] transition duration-300"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ==== MAIN FOOTER CONTENT ==== */}
      <section  className="px-6 pt-8 flex flex-col justify-between max-w-[1350px] mx-auto w-11/12" aria-label="Footer Information">
         <div className="flex justify-between pb-[100px] footer">
          <address className="not-italic text-sm space-y-2 footer-last" itemScope itemType="http://schema.org/Organization">
            <h3 className="text-[#a8e3f5] font-bold footer-second-heading pb-4" itemProp="name">  The Freelancer_ </h3>
            <p className="text-base">
              <a href="mailto:thefreelancers27@gmail.com" className="text-gray-300 hover:underline" itemProp="email">
                thefreelancers27@gmail.com
              </a>
            </p>
            <p className="text-base">
              <a href="tel:+917004505998" className="text-gray-300 hover:underline" itemProp="telephone">
                (+91) 700 450 5998
              </a>
            </p>
          </address>

          {/* Social Media Icons */}
          <nav aria-label="Social Media" className="flex gap-5 pt-6 text-[#a8e3f5] md:text-3xl ">
            {[
              { href: href[0].facebook, icon: <FaFacebookF />, label: "Facebook" },
              { href: href[0].instagram, icon: <FaInstagram />, label: "Instagram" },
              { href: href[0].youtube, icon: <FaYoutube />, label: "YouTube" },
              { href: href[0].twitter, icon: <FaTwitter />, label: "Twitter" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label={`Visit us on ${social.label}`}
              >
                {social.icon}
              </a>
            ))}
          </nav>
        </div>

        <hr className="border-gray-700 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 gap-2 text-center">
          <p>Video Production Agency by The Freelancer</p>
          <p>© 2024 All rights reserved</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
