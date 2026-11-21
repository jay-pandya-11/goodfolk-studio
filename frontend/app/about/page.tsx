import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCompass,
  FaCode,
  FaLayerGroup,
  FaSearch,
  FaShareAlt,
  FaPenNib,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Us | Goodfolk Studio — Strategy, Design & Software",
  description:
    "Learn about Goodfolk Studio, an independent brand and digital engineering studio in Bhavnagar, Gujarat, specializing in branding, custom web applications, social media, and SEO.",
};

const services = [
  {
    id: "brand-strategy",
    number: "01",
    tag: "Brand Identity",
    title: "Brand Strategy & Identity",
    icon: FaCompass,
    description:
      "Clarify your audience, positioning, and core messaging. We develop timeless visual identities, logo marks, typography scales, and practical brand design guidelines that keep your company consistent across every touchpoint.",
    deliverables: [
      "Market & Competitor Positioning",
      "Visual Identity Systems & Logos",
      "Comprehensive Brand Styleguides",
      "Typography & Color Palettes",
    ],
  },
  {
    id: "digital-design",
    number: "02",
    tag: "Digital Experience",
    title: "Website & Digital Product Design",
    icon: FaLayerGroup,
    description:
      "Transform complex ideas into intuitive, high-converting digital products. We structure websites and software UI/UX to ensure clear communication, seamless user journeys, and maximum accessibility.",
    deliverables: [
      "Responsive Web & UI/UX Design",
      "Design Systems & Component Libraries",
      "Wireframing & Interactive Prototypes",
      "Accessibility & Usability Audits",
    ],
  },
  {
    id: "software-development",
    number: "03",
    tag: "Full-Stack Code",
    title: "Custom Software Development",
    icon: FaCode,
    description:
      "Build scalable, maintainable web applications and custom software tools designed to optimize real business workflows. Built using modern stacks including React 19, Next.js, TypeScript, and modern cloud architectures.",
    deliverables: [
      "Full-Stack Next.js Applications",
      "Custom Web Portals & Dashboards",
      "API Integrations & Backend Services",
      "Clean, Documented Architecture",
    ],
  },
  {
    id: "seo",
    number: "04",
    tag: "Search Visibility",
    title: "Search Engine Optimization (SEO)",
    icon: FaSearch,
    description:
      "Elevate your visibility on Google and modern search engines. We implement rigorous technical SEO, site speed enhancements, structural schema data, and search-driven content plans that attract qualified traffic.",
    deliverables: [
      "Technical SEO Audits & Remediation",
      "Core Web Vitals & Speed Optimization",
      "On-Page Content & Metadata Strategy",
      "Local & National Search Foundation",
    ],
  },
  {
    id: "social-strategy",
    number: "05",
    tag: "Social Media",
    title: "Social Media Strategy",
    icon: FaShareAlt,
    description:
      "Establish a purposeful, consistent social presence. We identify the right channels for your audience, create content themes, and formulate sustainable scheduling workflows that build genuine brand credibility.",
    deliverables: [
      "Channel Selection & Optimization",
      "Content Calendar & Editorial Framework",
      "Visual Templates for Social Posts",
      "Engagement & Growth Tactics",
    ],
  },
  {
    id: "content-creation",
    number: "06",
    tag: "Content Strategy",
    title: "Content Creation & Copywriting",
    icon: FaPenNib,
    description:
      "Engage your target audience with sharp, compelling messaging. We craft high-impact website copy, campaign storylines, and editorial content that clearly articulates what makes your business extraordinary.",
    deliverables: [
      "Website Copywriting & Value Propositions",
      "Campaign Messaging & Taglines",
      "Content Marketing Assets",
      "Brand Voice & Tone Guidelines",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discover & Align",
    description:
      "We begin by understanding your business model, target audience, and key performance objectives. The right strategy always starts with deep listening rather than generic templates.",
  },
  {
    step: "02",
    title: "Architect & Design",
    description:
      "We plan the system architecture, refine the user experience, and design high-fidelity visual directions with clear checkpoints for your review and feedback.",
  },
  {
    step: "03",
    title: "Engineer & Deliver",
    description:
      "We write clean, production-ready code with meticulous attention to performance, responsiveness, and SEO before conducting rigorous QA testing and launching your project.",
  },
];

const coreValues = [
  {
    title: "Substance Over Trend",
    description:
      "We build design systems and software that solve real business problems, avoiding superficial gimmicks that date quickly.",
  },
  {
    title: "Precision in Execution",
    description:
      "From typography kerning to server response times, we treat every micro-detail as an essential element of your brand.",
  },
  {
    title: "Transparent Collaboration",
    description:
      "You collaborate directly with senior specialists. We communicate openly, meet agreed deadlines, and respect your budget.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-hidden">
      {/* 1. Header Section */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-slate-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
        <div className="page-shell relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-6">
              <span>About Goodfolk Studio</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              We shape brands and software that{" "}
              <span className="text-blue-600">stand the test of time.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Goodfolk Studio is an independent creative and engineering consultancy based in Bhavnagar, Gujarat. We partner with founders, teams, and growing enterprises to craft coherent brand identities and performant digital applications.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Studio Story & Values Split */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="page-shell">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Photo Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <Image
                  src="/images/collaboration.jpg"
                  alt="Creative team workspace inside Goodfolk Studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Bhavnagar Studio
                  </p>
                  <p className="text-base font-bold text-white mt-1">
                    Focused, collaborative, and purpose-driven work.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Column (7 cols) */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Our Philosophy
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                One dedicated studio for your complete digital ecosystem.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Too often, branding and software development happen in isolated silos. Designers create visuals disconnected from technical reality, while developers build systems without user empathy.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                At Goodfolk, we unite brand strategy, UX design, and robust full-stack engineering under one roof. The result is a unified experience that looks remarkable, runs blisteringly fast, and genuinely moves your business forward.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-xs">
                  <span className="block text-2xl font-extrabold text-blue-600">6</span>
                  <span className="mt-1 block text-xs font-semibold text-slate-600">Core Disciplines</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-xs">
                  <span className="block text-2xl font-extrabold text-blue-600">100%</span>
                  <span className="mt-1 block text-xs font-semibold text-slate-600">Custom Engineering</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-xs">
                  <span className="block text-2xl font-extrabold text-blue-600">Direct</span>
                  <span className="mt-1 block text-xs font-semibold text-slate-600">Partner Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Services Breakdown Section */}
      <section className="py-20 sm:py-28 bg-white" id="services">
        <div className="page-shell">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Services &amp; Capabilities
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Comprehensive capabilities tailored to your goals.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Every service is delivered with dedicated attention, transparent milestones, and measurable deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition-all duration-200 hover:border-blue-300 hover:shadow-lg scroll-mt-24"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-500">
                        {service.number}
                      </span>
                    </div>

                    <span className="mt-5 block text-xs font-bold uppercase tracking-wider text-blue-600">
                      {service.tag}
                    </span>

                    <h3 className="mt-1 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      {service.description}
                    </p>

                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Key Deliverables
                      </span>
                      <ul className="space-y-1.5">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-xs text-slate-700"
                          >
                            <FaCheckCircle className="h-3 w-3 text-blue-600 shrink-0" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span>Inquire about this service</span>
                      <FaArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 3-Step Process Section */}
      <section className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200" id="process">
        <div className="page-shell">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Delivery Framework
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              How we work together.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              A structured, collaborative roadmap that eliminates ambiguity and ensures consistent quality at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-xs"
              >
                <div>
                  <span className="text-3xl font-extrabold text-blue-600/80">
                    {step.step}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core Values Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="page-shell">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Guiding Principles
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              What matters most to us.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {coreValues.map((val) => (
              <div
                key={val.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-8 shadow-xs"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  {val.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {val.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick CTA strip */}
          <div className="mt-16 rounded-2xl bg-blue-600 px-8 py-10 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">
                Have a project or idea in mind?
              </h3>
              <p className="text-sm text-blue-100 mt-1">
                Let&apos;s talk through your goals and find the most impactful next step.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-colors shrink-0"
            >
              <span>Get in Touch with Studio</span>
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
