import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaEnvelope,
  FaWhatsapp,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";
import { CurrentYear } from "@/components/current-year";
import { siteConfig } from "@/lib/site-config";

const services = [
  { label: "Brand Strategy & Identity", id: "brand-strategy" },
  { label: "Social Media Strategy", id: "social-strategy" },
  { label: "Content Creation", id: "content-creation" },
  { label: "Website & Digital Design", id: "digital-design" },
  { label: "Custom Software Development", id: "software-development" },
  { label: "Search Engine Optimization (SEO)", id: "seo" },
];

const allSocialLinks = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: FaLinkedinIn },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FaFacebookF },
  { label: "WhatsApp", href: `https://wa.me/${siteConfig.whatsappNumber}`, Icon: FaWhatsapp },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: FaInstagram },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: FaYoutube },
];

export function SiteFooter() {
  // Only render active/configured social links
  const activeSocials = allSocialLinks.filter((item) => Boolean(item.href));

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800" aria-label="Site footer">
      <div className="page-shell py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="group inline-flex items-center gap-3.5 focus-visible:outline-hidden"
                aria-label={`${siteConfig.name} Home`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg shadow-sm">
                  <span>G</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-white">
                    {siteConfig.name}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                    Brand &amp; Engineering Studio
                  </span>
                </div>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                Independent creative and engineering studio based in {siteConfig.location}.
                We partner with ambitious founders and businesses to build memorable brand identities, modern web applications, and search-driven digital experiences.
              </p>

              {/* Status Pill */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Accepting new client projects</span>
              </div>
            </div>

            {/* Configured Social Icons */}
            {activeSocials.length > 0 && (
              <div className="mt-8">
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase block mb-3">
                  Connect With Us
                </span>
                <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Social media profiles">
                  {activeSocials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-all duration-150 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-500"
                      aria-label={`${label} profile (opens in new tab)`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links Column (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-wider text-slate-200 uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  About Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/about#process"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column (3 cols with clean right padding) */}
          <div className="lg:col-span-3 lg:pr-4">
            <h3 className="text-xs font-semibold tracking-wider text-slate-200 uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/about#${service.id}`}
                    className="inline-block text-slate-400 transition-colors hover:text-white leading-snug"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column (3 cols with generous left breathing room) */}
          <div className="lg:col-span-3 lg:pl-6 xl:pl-10">
            <h3 className="text-xs font-semibold tracking-wider text-slate-200 uppercase mb-4">
              Studio Coordinates
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-3 text-slate-400 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FaEnvelope className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-slate-500">Email Inquiries</span>
                    <span className="font-medium text-slate-200 group-hover:text-white break-all">
                      {siteConfig.email}
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href={`tel:${siteConfig.phoneInternational}`}
                  className="group flex items-start gap-3 text-slate-400 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FaPhoneAlt className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-slate-500">Direct Line</span>
                    <span className="font-medium text-slate-200 group-hover:text-white">
                      {siteConfig.phoneDisplay}
                    </span>
                  </div>
                </a>
              </li>

              <li className="flex items-start gap-3 text-slate-400">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-blue-400">
                  <FaMapMarkerAlt className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-slate-500">Studio Location</span>
                  <span className="font-medium text-slate-200">
                    {siteConfig.location}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3 text-slate-400">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-blue-400">
                  <FaClock className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-slate-500">Working Hours</span>
                  <span className="font-medium text-slate-200">
                    {siteConfig.businessHours} (IST)
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">
              Designed with precision &middot; Bhavnagar, Gujarat
            </span>
            <a
              href="#main-content"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <FaArrowUp className="h-2.5 w-2.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
