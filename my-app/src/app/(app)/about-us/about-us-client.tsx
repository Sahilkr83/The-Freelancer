'use client'
import { motion} from "framer-motion";
import { useInView } from 'react-intersection-observer'
import Image from "next/image";
import Link from "next/link";
import CountUpNumber from '@/component/CountUpNumber';
const AboutUs = () => {
const { ref: achievementsRef, inView: achievementsInView } = useInView({
  threshold: 0.3, // Adjust as needed
});

  return (
    <section
      className="py-24  pt-36 px-6 sm:px-12 lg:px-20 max-w-[1400px] mx-auto  space-y-24"
      id="about"
      aria-label="About The Freelancer Shop"
    >
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            {/* Image */}
            <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            >
            <Image
                src="https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5"
                alt="Creative video editors and web designers collaborating"
                width={800}
                height={600}
                className="rounded-3xl shadow-2xl object-cover w-full h-auto"
                priority
            />
            </motion.div>

            {/* Content */}
            <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            >
            <p className="uppercase text-sm font-semibold tracking-widest text-indigo-400 mb-2">
                Who We Are
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold  mb-6 leading-tight">
                About <span className="text-indigo-400">The Freelancer Shop</span>
            </h1>

            <p className="mb-6 text-lg sm:text-xl leading-relaxed ">
                <strong className=" ">The Freelancer Shop</strong> is your all-in-one creative partner for premium{" "}
                <span className="  font-semibold">video editing</span>,{" "}
                <span className="  font-semibold">motion graphics</span>, and{" "}
                <span className="  font-semibold">web development</span>. We turn your ideas into powerful visuals and high-performance websites.
            </p>

            <p className="text-lg sm:text-xl leading-relaxed mb-6">
                Our expert team blends artistic creativity with cutting-edge tools like{" "}
                <span className="  font-semibold">Adobe After Effects</span>,{" "}
                <span className="  font-semibold">Premiere Pro</span>,{" "}
                <span className="  font-semibold">React</span>, and{" "}
                <span className="  font-semibold">Next.js</span>. Whether it’s a fast-paced ad,
                cinematic trailer, or interactive portfolio — we build digital experiences that engage
                and convert.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm sm:text-base  ">
                {[
                "Custom Video Editing",
                "Motion Graphics & Animation",
                "Modern Web Design",
                "Full-Stack Development",
                ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="text-indigo-400">✔</span>
                    {item}
                </div>
                ))}
            </div>

            <Link
                href="/web-development"
                className="inline-block text-white bg-indigo-500 hover:bg-indigo-600 transition-colors  px-6 py-3 rounded-full text-base font-semibold shadow-lg"
            >
                Explore Our Work
            </Link>
            </motion.div>
        </div>

        {/* Mission & Vision */}
        <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold  mb-4">Our Mission & Vision</h2>
            <p className="text-lg   leading-relaxed">
            We’re on a mission to empower individuals, brands, and businesses with impactful digital
            solutions that tell their stories with clarity and creativity. Our vision is to be the
            go-to creative tech partner for high-performing digital content and web solutions.
            </p>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            {[
            { label: "Creative Expertise", desc: "10+ years combined experience" },
            { label: "Fast Turnaround", desc: "Quick delivery without compromise" },
            { label: "Client First", desc: "Tailored approach for every project" },
            { label: "Scalable Results", desc: "From startups to large brands" },
            ].map(({ label, desc }, i) => (
            <div
                key={i}
                className="p-6 rounded-2xl bg-[#1e1e2f] border border-gray-700 hover:border-indigo-500 transition-colors"
            >
                <h3 className="text-xl font-semibold  mb-2">{label}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
            </div>
            ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h3 className="text-3xl font-bold  mb-4">Tech We Use</h3>
            <p className="  max-w-3xl mx-auto mb-6">
            From frontend frameworks to industry-standard creative tools, we choose the best
            technologies to deliver results that impress and perform.
            </p>
            <div className="flex flex-wrap justify-center gap-4  text-sm sm:text-base">
            {[
                "Adobe After Effects",
                "Premiere Pro",
                "Figma",
                "Next.js",
                "React",
                "Tailwind CSS",
                "Framer Motion",
                "Node.js",
                "MongoDB",
                "Git & GitHub",
            ].map((tech, idx) => (
                <span
                key={idx}
                className="bg-indigo-600/20 border border-indigo-500 px-4 py-2 rounded-full"
                >
                {tech}
                </span>
            ))}
            </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
            ref={achievementsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            {[
            { count: 120, label: "Clients", suffix: "+" },
            { count: 250, label: "Projects Completed", suffix: "+" },
            { count: 4.9, label: "Client Rating", suffix: "/5" },
            { count: 3, label: "Years Experience", suffix: "+" },
            ].map(({ count, label, suffix }, idx) => (
            <div key={idx}>
            <p className="text-4xl font-extrabold ">
            {achievementsInView ? (
            <CountUpNumber key={`count-${idx}-${Date.now()}`} end={count} suffix={suffix} />
            ) : (
            `0${suffix}`
            )}
            </p>
            <p className="text-gray-400 text-sm mt-1">{label}</p>
            </div>
            ))}
        </motion.div>


        {/* Our Journey */}
        <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h3 className="text-3xl font-bold  text-center mb-10">Our Journey</h3>
            <ol className="relative border-l border-indigo-400 pl-6 space-y-10">
            {[
                {
                year: "2022",
                event: "Founded with a vision to simplify creative freelancing for brands and creators.",
                },
                {
                year: "2023",
                event: "Expanded into full-stack development & launched over 100 projects.",
                },
                {
                year: "2024",
                event: "Built long-term collaborations with global clients and marketing agencies.",
                },
                {
                year: "2025",
                event: "Launched The Freelancer Shop 2.0 — full-service video, design, and web stack.",
                },
            ].map((item, idx) => (
                <li key={idx} className="ml-4">
                <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-1.5 mt-1.5" />
                <time className="text-sm text-indigo-400 font-semibold">{item.year}</time>
                <p className="  text-base mt-1">{item.event}</p>
                </li>
            ))}
            </ol>
        </motion.div>

        {/* Testimonials */}
        {/* <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-3xl font-bold  mb-10">What Clients Say</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
                {
                name: "Sophia W.",
                role: "Content Creator",
                quote: "The Freelancer Shop brought my ideas to life. From the first cut to final polish—absolutely stellar work.",
                },
                {
                name: "David K.",
                role: "Startup Founder",
                quote: "Their web development is top-tier. Performance, design, UX—it all works beautifully.",
                },
                {
                name: "Priya S.",
                role: "Marketing Head",
                quote: "Our video campaigns now look professional and feel premium. Highly recommend their services.",
                },
            ].map((testimonial, i) => (
                <div key={i} className="bg-[#1f1f2f] p-6 rounded-xl shadow-md border border-gray-700">
                <p className="  italic mb-4">“{testimonial.quote}”</p>
                <p className="  font-semibold">{testimonial.name}</p>
                <p className="text-indigo-400 text-sm">{testimonial.role}</p>
                </div>
            ))}
            </div>
        </motion.div> */}

        {/* Trusted By Logos */}
        {/* <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-2xl font-semibold  mb-4">Trusted By</h3>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-80 grayscale hover:grayscale-0 transition-all">
            {[
                "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            ].map((logo, index) => (
                <Image
                key={index}
                src={logo}
                alt="Client logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                />
            ))}
            </div>
        </motion.div> */}

        {/* CTA */}
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h3 className="text-2xl sm:text-3xl font-bold  mb-4">
            Ready to bring your vision to life?
            </h3>
            <Link
            href="/contact-us"
            className="inline-block bg-indigo-500 hover:bg-indigo-600  px-8 py-3 rounded-full font-medium shadow-md transition-all text-white"
            >
            Contact Us Today
            </Link>
        </motion.div>
    </section>
  );
};

export default AboutUs;