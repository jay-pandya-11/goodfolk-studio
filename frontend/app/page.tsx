import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaCompass,
  FaLayerGroup,
  FaSearch,
} from "react-icons/fa";

const coreServices = [
  {
    number: "01",
    id: "brand-strategy",
    title: "Brand Strategy & Identity",
    icon: FaCompass,
    description:
      "Clarify your market position, articulate your unique value, and craft a distinctive visual system that commands attention.",
    deliverables: ["Visual Identity Systems", "Brand Guidelines", "Positioning & Messaging"],
  },
  {
    number: "02",
    id: "digital-design",
    title: "Websites & Digital UX/UI",
    icon: FaLayerGroup,
    description:
      "Design fast, accessible, conversion-focused websites and digital products built with modern engineering frameworks.",
    deliverables: ["Bespoke Web Design", "Design Systems", "Conversion Optimization"],
  },
  {
    number: "03",
    id: "software-development",
    title: "Custom Software Engineering",
    icon: FaCode,
    description:
      "Build scalable, reliable web applications and internal tools designed specifically around your operational workflows.",
    deliverables: ["Full-Stack Next.js Apps", "Cloud Integration", "API & Database Systems"],
  },
  {
    number: "04",
    id: "seo",
    title: "Search & Growth Architecture",
    icon: FaSearch,
    description:
      "Strengthen your organic discovery through technical SEO audits, site speed optimization, and strategic content planning.",
    deliverables: ["Technical SEO", "Speed & Core Web Vitals", "Search Content Planning"],
  },
];

const capabilityHighlights = [
  "Brand Identity",
  "Custom Web Apps",
  "React 19 & Next.js",
  "Technical SEO",
  "Content Strategy",
  "High-Performance UX",
];

const studioStories = [
  {
    src: "/images/creative-planning.jpg",
    alt: "Designer analyzing digital layout sketches and brand wireframes",
    category: "Identity & Direction",
    title: "Brand Strategy Built on Substance",
    description:
      "We replace guesswork with focused research, defining visual identities that resonate with your most valuable clients.",
  },
  {
    src: "/images/collaboration.jpg",
    alt: "Modern bright collaborative studio space for agile design reviews",
    category: "Design & UX Engineering",
    title: "Websites That Turn Visitors into Clients",
    description:
      "Every page is structured around clear communication, seamless navigation, and frictionless conversion paths.",
  },
  {
    src: "/images/digital-work.jpg",
    alt: "Engineer reviewing production code and digital analytics on a laptop",
    category: "Software & Search",
    title: "Robust Code & Organic Search Foundations",
    description:
      "Engineered from day one for speed, accessibility, and high visibility across search engines and modern browsers.",
  },
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-hidden">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 border-b border-slate-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="page-shell relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Value Proposition (7 cols) */}
            <div className="lg:col-span-7">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-xs mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                <span>Creative Studio &middot; Bhavnagar, Gujarat</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl sm:leading-tight">
                Crafting memorable brands, modern websites &amp;{" "}
                <span className="text-blue-600">custom software.</span>
              </h1>

              {/* Supporting Value Proposition */}
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Goodfolk helps ambitious businesses bring their brand identity, web experience, and search presence into sharp focus. We combine thoughtful strategy with clean, modern engineering.
              </p>

              {/* Key Highlights */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-lg">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <FaCheckCircle className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
                  <span>Bespoke Code &amp; Design Systems</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <FaCheckCircle className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
                  <span>Direct Senior Collaboration</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <FaCheckCircle className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
                  <span>Search &amp; Speed Optimized</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <FaCheckCircle className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
                  <span>100% Transparent Communication</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <span>Start a Conversation</span>
                  <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-xs transition-all duration-150 hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  <span>Explore Our Capabilities</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Imagery with Clean Framing (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-xl">
                  <Image
                    src="/images/digital-work.jpg"
                    alt="Laptop displaying analytics and clean web application dashboards"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Glassmorphism Badge */}
                  <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-slate-900/80 p-4 text-white backdrop-blur-md shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
                          Goodfolk Studio
                        </p>
                        <p className="text-sm font-bold text-white mt-0.5">
                          Strategy meets modern execution.
                        </p>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">
                        &uarr;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Capabilities Strip */}
      <section className="border-b border-slate-200 bg-slate-50/70 py-6" aria-label="Key Capabilities">
        <div className="page-shell">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span className="text-slate-900 font-bold">Studio Focus:</span>
            {capabilityHighlights.map((cap) => (
              <span key={cap} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span>{cap}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Services Grid Section */}
      <section className="py-20 sm:py-28 bg-white" id="services">
        <div className="page-shell">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-slate-200">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Connected Services
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                End-to-end design &amp; software engineering.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              Whether launching a new business or redesigning an established digital presence, we adapt our expertise to your concrete goals.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.number}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xs transition-all duration-200 hover:border-blue-300 hover:shadow-lg"
                >
                  <div>
                    {/* Header: Number & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold tracking-wider text-slate-400">
                        {service.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Link */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <Link
                      href={`/about#${service.id}`}
                      className="inline-flex items-center gap-1.5 hover:text-blue-800 transition-colors"
                    >
                      <span>Explore {service.title}</span>
                      <FaArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              <span>View full service breakdown and delivery methodology</span>
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Visual Studio Stories / Philosophy */}
      <section className="bg-slate-50 py-20 sm:py-28 border-y border-slate-200">
        <div className="page-shell">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Studio Methodology
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Built for substance, speed, and real outcomes.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Every detail of our process is designed to deliver clarity, eliminate confusion, and build enduring digital assets for your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {studioStories.map((story) => (
              <article
                key={story.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-200 hover:shadow-md"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                  <Image
                    src={story.src}
                    alt={story.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                    {story.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {story.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      {story.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Modern Conversion CTA Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="page-shell">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-16 sm:px-16 sm:py-20 text-white shadow-2xl">
            {/* Subtle Gradient Glow Background */}
            <div
              className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3.5 py-1 text-xs font-semibold text-blue-400 border border-slate-700">
                <span>Start Your Next Project</span>
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to elevate your brand and digital presence?
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-300">
                Share your ideas, challenges, or requirements with us. We will review your goals and schedule a focused introductory conversation.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-blue-700 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <span>Request a Project Quote</span>
                  <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-4 text-sm font-semibold text-slate-200 transition-all duration-150 hover:bg-slate-750 hover:text-white"
                >
                  <span>Learn About Our Studio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
