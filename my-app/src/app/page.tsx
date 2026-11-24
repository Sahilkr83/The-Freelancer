"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code2,
  Film,
  Layers3,
  Sparkles,
} from "lucide-react";
import homePageImg from "@/assets/homePageImg.webp";
import razorpayImg from "@/assets/web-client/Razorpay Landing Page Clone.webp";
import eCommerceCartImg from "@/assets/web-client/React E-commerce Cart System.webp";
import freelancerAgencyImg from "@/assets/web-client/Freelancer Agency Platform.webp";
import ProjectFrame from "@/component/ProjectFrame";

interface Project {
  id: number;
  title: string;
  description: string;
  feature?: boolean;
  date: string;
  img: string | StaticImageData;
  url: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Razorpay Landing Page Clone",
    description:
      "A precise, responsive product experience built with React and Tailwind CSS.",
    feature: true,
    date: "25/07/2025",
    img: razorpayImg,
    url: "https://sahils-razorpay-clone.netlify.app",
  },
  {
    id: 2,
    title: "Freelancer Agency Platform",
    description:
      "A full-stack showcase platform with authentication and real-time data.",
    feature: true,
    date: "19/03/2025",
    img: freelancerAgencyImg,
    url: "https://freelancer-agency.netlify.app/",
  },
  {
    id: 3,
    title: "React E-commerce Cart",
    description:
      "A polished commerce interface with context-powered state management.",
    date: "02/04/2025",
    img: eCommerceCartImg,
    url: "https://shopping-cart-first.netlify.app",
  },
];

const services = [
  {
    icon: Code2,
    title: "Web development",
    text: "Fast, accessible websites and full-stack products engineered around business goals.",
  },
  {
    icon: Film,
    title: "Video post-production",
    text: "Sharp edits, motion graphics, sound, and pacing built to retain attention.",
  },
  {
    icon: Layers3,
    title: "Digital direction",
    text: "One cohesive creative and technical partner from initial idea to final delivery.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden pt-24">
      <section className="mx-auto grid min-h-[760px] max-w-[1380px] items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#DDD5FF] bg-[#F4F1FF] px-4 py-2 text-sm font-semibold text-[#633CFF]">
            <Sparkles className="h-4 w-4" /> Creative development studio
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.055em] text-[#151515] sm:text-6xl lg:text-[5.25rem]">
            Digital work designed to be{" "}
            <span className="text-[#633CFF]">remembered.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#686868]">
            I combine full-stack engineering and cinematic post-production to
            help ambitious brands look credible, move faster, and connect with
            their audience.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/web-development" className="portfolio-button gap-2">
              Explore selected work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact-us" className="portfolio-button-secondary">
              Start a project
            </Link>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-3 border-t border-[#E8E8EE] pt-7">
            {[
              ["250+", "Projects"],
              ["3+", "Years"],
              ["4.9/5", "Rating"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-2xl font-semibold text-[#151515]">{value}</p>
                <p className="mt-1 text-sm text-[#686868]">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="relative"
        >
          <div className="absolute -inset-5 -z-10 rounded-[3rem] bg-[#EEE9FF]" />
          <div className="overflow-hidden rounded-[2.25rem] border border-white bg-white p-3 shadow-[0_30px_90px_rgba(46,32,99,.16)]">
            <Image
              src={homePageImg}
              alt="Selected web and video work by The Freelancer"
              priority
              className="min-h-[500px] w-full rounded-[1.65rem] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-5 rounded-2xl border border-[#E8E8EE] bg-white p-5 shadow-xl sm:left-[-2rem]">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8A8A8A]">
              Now booking
            </p>
            <p className="mt-1 font-semibold text-[#151515]">
              New projects & collaborations
            </p>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-[#E8E8EE] bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">
                What I do
              </p>
              <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight tracking-[-.04em]">
                Strategy, craft, and technology in one place.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#686868] lg:justify-self-end">
              No handoffs between disconnected specialists. Every project is
              shaped with a consistent eye for story, usability, performance,
              and the details that make a brand feel premium.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {services.map(({ icon: Icon, title, text }, index) => (
              <motion.article
                key={title}
                whileHover={{ y: -6 }}
                className="rounded-[1.5rem] border border-[#E8E8EE] bg-[#F8F9FC] p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEE9FF] text-[#633CFF]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-9 text-sm text-[#8A8A8A]">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-[#686868]">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-6 py-28 lg:px-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">
              Selected work
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">
              Projects built for real use.
            </h2>
          </div>
          <Link
            href="/web-development"
            className="inline-flex items-center gap-2 font-semibold text-[#633CFF]"
          >
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProjectFrame
          id="featured-projects"
          title=""
          description=""
          projects={projects}
        />
      </section>

      <section className="bg-[#151515] py-28 text-white">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#A992FF]">
              How I work
            </p>
            <h2 className="mt-4 max-w-lg text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">
              Clear thinking before polished execution.
            </h2>
            <p className="mt-6 max-w-lg leading-7 text-white/60">
              A practical process that keeps decisions visible, feedback useful,
              and delivery predictable.
            </p>
          </div>
          <ol className="space-y-3">
            {[
              [
                "Discover",
                "Understand the audience, objective, constraints, and definition of success.",
              ],
              [
                "Define",
                "Turn research into a focused scope, visual direction, and delivery plan.",
              ],
              [
                "Create",
                "Design, build, edit, and iterate with frequent progress checkpoints.",
              ],
              [
                "Deliver",
                "Polish, test, optimize, and provide everything needed to launch confidently.",
              ],
            ].map(([title, text], index) => (
              <li
                key={title}
                className="grid grid-cols-[3rem_1fr] gap-4 rounded-2xl border border-white/10 p-5"
              >
                <span className="text-sm text-[#A992FF]">0{index + 1}</span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-28 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#633CFF]">
              Capabilities
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">
              Tools chosen for the work—not the trend.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-[#686868]">
              A modern stack for responsive products and a professional editing
              workflow for high-impact content.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Frontend", ["React", "Next.js", "TypeScript", "Tailwind CSS"]],
              [
                "Backend",
                ["Node.js", "MongoDB", "REST APIs", "Authentication"],
              ],
              [
                "Post-production",
                ["Premiere Pro", "After Effects", "DaVinci Resolve", "Filmora"],
              ],
              [
                "Standards",
                ["Responsive UI", "Accessibility", "SEO", "Performance"],
              ],
            ].map(([title, items]) => (
              <article
                key={title as string}
                className="rounded-2xl border border-[#E8E8EE] bg-white p-6"
              >
                <h3 className="font-semibold">{title as string}</h3>
                <ul className="mt-5 space-y-3">
                  {(items as string[]).map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-[#686868]"
                    >
                      <Check className="h-4 w-4 text-[#633CFF]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-28 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#633CFF] px-7 py-16 text-center text-white sm:px-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-white/70">
            Have a project in mind?
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-.04em] sm:text-5xl">
            Let&apos;s make something clear, useful, and impossible to ignore.
          </h2>
          <Link
            href="/contact-us"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-[#151515]"
          >
            Tell me about it <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
