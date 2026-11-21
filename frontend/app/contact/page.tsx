import Link from "next/link";
import type { Metadata } from "next";
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaCheckCircle,
} from "react-icons/fa";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us | Goodfolk Studio — Inquire About Your Project",
  description:
    "Start a conversation with Goodfolk Studio in Bhavnagar, Gujarat. Inquire about brand identity, custom website design, software engineering, social media, or SEO.",
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-hidden">
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-20 border-b border-slate-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
        <div className="page-shell relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-5">
              <span>Start a Project</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Let&apos;s build something{" "}
              <span className="text-blue-600">remarkable together.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
              Tell us about your company, your objectives, and where you need a dedicated partner. We will review your brief and schedule an introductory session.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column Interactive Contact Grid */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="page-shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Direct Coordinates & Details (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Studio Coordinates
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Prefer direct communication? Reach out through any of our official studio channels.
                </p>

                {/* Direct Channel Cards */}
                <div className="mt-8 space-y-4">
                  {/* Email */}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-150 hover:border-blue-300 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FaEnvelope className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Email Address
                      </span>
                      <span className="mt-1 block text-sm font-bold text-slate-900 group-hover:text-blue-600 break-all">
                        {siteConfig.email}
                      </span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${siteConfig.phoneInternational}`}
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-150 hover:border-blue-300 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FaPhoneAlt className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Direct Phone Line
                      </span>
                      <span className="mt-1 block text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        {siteConfig.phoneDisplay}
                      </span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-150 hover:border-emerald-300 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        WhatsApp Chat
                      </span>
                      <span className="mt-1 block text-sm font-bold text-slate-900 group-hover:text-emerald-600">
                        Quick Message via WhatsApp &rarr;
                      </span>
                    </div>
                  </a>

                  {/* Location & Hours Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                        <FaMapMarkerAlt className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Studio Location
                        </span>
                        <span className="mt-1 block text-sm font-bold text-slate-900">
                          {siteConfig.location}
                        </span>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                          <FaClock className="h-3 w-3 text-slate-400" aria-hidden="true" />
                          <span>{siteConfig.businessHours} (Indian Standard Time)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Happens Next Card */}
              <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/70 p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  What Happens Next?
                </span>
                <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-slate-700">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>We review your requirements within 24 business hours.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>We schedule an initial discovery call to clarify scope &amp; timelines.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>You receive a transparent, itemized proposal with clear milestones.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Inquiry Form Card (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-lg">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Project Brief
                  </span>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                    Tell us about your project.
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Fill out the form below. When submitted, your default email application will open with your pre-formatted enquiry ready to send.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Reassurance & Portfolio Link */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="page-shell flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <span>
            Looking to explore our methodology first?
          </span>
          <Link
            href="/about"
            className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read about our studio philosophy &amp; capabilities &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
