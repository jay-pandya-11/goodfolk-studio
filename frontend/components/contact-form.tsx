"use client";

import { useState, type FormEvent } from "react";
import { FaPaperPlane, FaCheckCircle, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import { siteConfig } from "@/lib/site-config";
import { api } from "@/lib/api-client";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = ((formData.get("phone") as string) || "").trim();
    const service = (formData.get("service") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    try {
      // 1. Send inquiry to backend REST API
      const res = await api.submitContact({
        name,
        email,
        phone,
        service,
        message,
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        // Fallback: If backend returns validation errors or fails
        if (res.errors && res.errors.length > 0) {
          setErrorMessage(res.errors.map((e) => e.message).join(", "));
        } else {
          // Fallback to mailto if API returned error
          triggerMailtoFallback(name, email, phone, service, message);
          setSubmitted(true);
        }
      }
    } catch {
      // Fallback to mailto if network connection fails
      triggerMailtoFallback(name, email, phone, service, message);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  function triggerMailtoFallback(
    name: string,
    email: string,
    phone: string,
    service: string,
    message: string
  ) {
    const details = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Service Required: ${service}`,
      "",
      "Project Details & Objectives:",
      message,
    ].join("\n");

    const subject = encodeURIComponent(`Project Inquiry: ${name} (${service})`);
    const body = encodeURIComponent(details);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center transition-all">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <FaCheckCircle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">
          Inquiry Successfully Sent
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-md mx-auto">
          Thank you for reaching out! Your brief has been dispatched directly to our studio desk at{" "}
          <strong className="text-slate-900">{siteConfig.email}</strong>. We review all briefs within 24 business hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 border border-slate-300 shadow-xs hover:bg-slate-50 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700 flex items-center gap-2">
          <FaExclamationCircle className="h-4 w-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Your Name <span className="text-blue-600">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Alex Patel"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Email Address <span className="text-blue-600">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Phone */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Phone Number <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Service */}
        <div>
          <label
            htmlFor="contact-service"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Service Interest <span className="text-blue-600">*</span>
          </label>
          <select
            id="contact-service"
            name="service"
            required
            defaultValue=""
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-xs transition-all focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-100"
          >
            <option disabled value="">
              Choose a discipline
            </option>
            <option value="Brand strategy and identity">Brand Strategy &amp; Identity</option>
            <option value="Website and digital design">Website &amp; Digital UX/UI</option>
            <option value="Software development">Custom Software Development</option>
            <option value="Search engine optimization (SEO)">Search Engine Optimization (SEO)</option>
            <option value="Social media strategy">Social Media &amp; Content Strategy</option>
            <option value="Complete digital transformation">Full Studio Partnership (Brand + Web + Code)</option>
            <option value="Other">Other / General Question</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
        >
          Tell Us About Your Project <span className="text-blue-600">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Briefly describe what you are looking to build, your timeline, or any key objectives..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all focus:border-blue-600 focus:outline-hidden focus:ring-4 focus:ring-blue-100 resize-y"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <span>Send Project Inquiry</span>
            <FaPaperPlane className="h-3.5 w-3.5" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-500">
        Inquiries sent directly to{" "}
        <span className="font-medium text-slate-700">{siteConfig.email}</span>. We respond within 24 hours.
      </p>
    </form>
  );
}
