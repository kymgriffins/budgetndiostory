"use client";

import { NavbarLanding } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isDark, setIsDark] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactInfo = [
    {
      icon: <Mail size={20} strokeWidth={1.5} />,
      label: "Email",
      value: "hello@budgetndiostory.org",
      href: "mailto:hello@budgetndiostory.org",
    },
    {
      icon: <Phone size={20} strokeWidth={1.5} />,
      label: "Phone",
      value: "+254 700 000 000",
      href: "tel:+254700000000",
    },
    {
      icon: <MapPin size={20} strokeWidth={1.5} />,
      label: "Location",
      value: "Nairobi, Kenya",
      href: "#",
    },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "YouTube", href: "https://youtube.com" },
  ];

  const faqs = [
    {
      question: "How can I collaborate with Budget Ndio Story?",
      answer:
        "We welcome partnerships with civic organizations, media houses, and research institutions. Email us at hello@budgetndiostory.org to discuss collaboration opportunities.",
    },
    {
      question: "Can I request a custom investigation?",
      answer:
        "Yes! If you have information about a budget project that needs investigation, we'd love to hear from you. Send us details and we'll assess feasibility.",
    },
    {
      question: "Do you offer workshops or training?",
      answer:
        "We offer workshops on budget literacy and civic engagement for schools, universities, and community organizations. Contact us to schedule a session.",
    },
  ];

  return (
    <>
      <Head>
        <title>Contact - Budget Ndio Story</title>
        <meta
          name="description"
          content="Get in touch with Budget Ndio Story for questions about budgets, collaboration, or general inquiries."
        />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
        {/* Navigation */}
        <NavbarLanding />

        <main>
          {/* HERO */}
          <section className="px-4 sm:px-6 lg:px-8 pt-32 pb-12">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-NeueMontreal text-white/70 mb-6">
                  <Mail size={16} className="text-[#00aa55]" />
                  Get in Touch
                </span>

                <h1 className="font-FoundersGrotesk text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight uppercase leading-tight">
                  We'd Love to <span className="text-[#00aa55]">Hear From</span>{" "}
                  You
                </h1>

                <p className="mt-4 text-lg font-NeueMontreal text-white/60 max-w-xl leading-relaxed">
                  Have a question about budgets, want to collaborate on a
                  project, or just want to say hello? We'd love to hear from
                  you.
                </p>
              </motion.div>
            </div>
          </section>

          {/* CONTACT GRID */}
          <section className="px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {submitted ? (
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
                      <span className="text-5xl mb-4 block">✅</span>
                      <h2 className="font-FoundersGrotesk text-2xl font-semibold">
                        Message Sent!
                      </h2>
                      <p className="font-NeueMontreal text-white/60 mt-2">
                        Thank you for reaching out. We'll get back to you as
                        soon as possible.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 px-6 py-3 rounded-full bg-white/10 border border-white/10 text-sm font-NeueMontreal hover:bg-white/20 transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-NeueMontreal text-white/70 mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-NeueMontreal text-white/70 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-NeueMontreal text-white/70 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What's this about?"
                          required
                          className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-NeueMontreal text-white/70 mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more..."
                          required
                          rows={5}
                          className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-4 rounded-full bg-[#00aa55] text-black font-NeueMontreal text-sm uppercase tracking-wider hover:bg-[#00cc66] transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  )}
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="font-FoundersGrotesk text-2xl font-semibold uppercase mb-6">
                      Contact Info
                    </h2>
                    <div className="space-y-4">
                      {contactInfo.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <div className="text-white/60">{item.icon}</div>
                          <div>
                            <p className="text-xs font-NeueMontreal text-white/50">
                              {item.label}
                            </p>
                            <p className="text-sm font-NeueMontreal text-white/80">
                              {item.value}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-FoundersGrotesk text-2xl font-semibold uppercase mb-6">
                      Follow Us
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((social, index) => (
                        <Link
                          key={index}
                          href={social.href}
                          className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-NeueMontreal text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                        >
                          {social.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-FoundersGrotesk text-2xl font-semibold uppercase mb-4">
                      Newsletter
                    </h2>
                    <p className="text-sm font-NeueMontreal text-white/60 mb-4">
                      Subscribe to our newsletter for budget insights and
                      updates.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                      />
                      <button className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-sm font-NeueMontreal hover:bg-white/20 transition-colors">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  FAQ
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold tracking-tight mt-3">
                  Frequently Asked Questions
                </h2>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                    >
                      <span className="font-FoundersGrotesk text-lg font-medium">
                        {faq.question}
                      </span>
                      {openFaq === i ? (
                        <ChevronUp size={20} className="text-white/60" />
                      ) : (
                        <ChevronDown size={20} className="text-white/60" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5">
                            <p className="font-NeueMontreal text-white/70 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="font-FoundersGrotesk text-lg font-medium text-white uppercase mb-6">
                  Contact Info
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-white/60" />
                    <div>
                      <p className="text-xs font-NeueMontreal text-white/50 mb-0.5">
                        Email
                      </p>
                      <Link
                        href="mailto:hello@budgetndiostory.org"
                        className="text-sm font-NeueMontreal text-white/80 hover:text-white transition-colors"
                      >
                        hello@budgetndiostory.org
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-white/60" />
                    <div>
                      <p className="text-xs font-NeueMontreal text-white/50 mb-0.5">
                        Location
                      </p>
                      <p className="text-sm font-NeueMontreal text-white/80">
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-FoundersGrotesk text-lg font-medium text-white uppercase mb-6">
                  Quick Links
                </h3>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/tracker"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Budget Tracker
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/learn"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Learn
                  </Link>
                  <Link
                    href="/edustories"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Edu Stories
                  </Link>
                </div>
              </div>

              {/* Theme Toggle */}
              <div>
                <h3 className="font-FoundersGrotesk text-lg font-medium text-white uppercase mb-6">
                  Appearance
                </h3>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-sm font-NeueMontreal text-white/50">
                © {new Date().getFullYear()} Budget Ndio Story. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
