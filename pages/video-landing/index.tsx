"use client";

import { NavbarLanding, VideoHeroLanding } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  MapPin,
  Moon,
  Phone,
  Play,
  Sun,
  TrendingUp,
  Users,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Video Landing Page
 * Purposeful budget storytelling landing page
 *
 * Features:
 * - Full-screen video hero
 * - Minimalist navbar (Tracker hidden)
 * - Purposeful content sections
 * - FAQ section with accordion
 * - New footer with theme toggler
 */
export default function VideoLanding() {
  const [year, setYear] = useState(2026);
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
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

  const quickActions = [
    {
      icon: <Play size={20} />,
      title: "Latest Story",
      desc: "Watch our newest budget breakdown",
      href: "/blog",
      color: "#00aa55",
      bgColor: "bg-[#00aa55]/10",
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Budget Tracker",
      desc: "Follow the money in real-time",
      href: "/tracker",
      color: "#212121",
      bgColor: "bg-white/10",
    },
    {
      icon: <FileText size={20} />,
      title: "Field Reports",
      desc: "Stories from the ground",
      href: "/edustories",
      color: "#ff2f55",
      bgColor: "bg-[#ff2f55]/10",
    },
    {
      icon: <Users size={20} />,
      title: "Community",
      desc: "Join the conversation",
      href: "/contact",
      color: "#00aa55",
      bgColor: "bg-[#00aa55]/10",
    },
  ];

  const faqs = [
    {
      question: "What is Budget Ndio Story?",
      answer:
        "Budget Ndio Story is a civic initiative that translates complex national and county budgets into simple, engaging stories. We help citizens understand where public money goes and how they can participate in budget processes.",
    },
    {
      question: "How do you verify budget information?",
      answer:
        "Our team analyzes official budget documents, procurement records, and spending reports. We then cross-reference this data by visiting project sites and interviewing local communities to verify what's actually happening on the ground.",
    },
    {
      question: "How can I get involved?",
      answer:
        "There are many ways to get involved! You can subscribe to our newsletter for updates, share our stories on social media, join our community discussions, or reach out to us for partnership opportunities.",
    },
    {
      question: "Is the information on your site free to use?",
      answer:
        "Yes! All our content is freely available for educational and civic purposes. We encourage sharing and redistribution with attribution to Budget Ndio Story.",
    },
  ];

  return (
    <>
      <Head>
        <title>Budget Ndio Story — The Kenyan Budget, Told Clearly</title>
        <meta
          name="description"
          content="Budget Ndio Story translates national and county budgets into short, verifiable stories that help citizens understand where public money goes and how to act."
        />
        <meta property="og:title" content="Budget Ndio Story" />
        <meta
          property="og:description"
          content="Bridging the budget literacy gap for youth through storytelling."
        />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen">
        {/* Navigation */}
        <NavbarLanding />

        {/* Video Hero */}
        <VideoHeroLanding />

        <main>
          {/* QUICK ACTIONS - Responsive grid */}
          <section className="padding-x pt-16 pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      href={action.href}
                      className="block rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-all duration-300 group h-full"
                    >
                      <div
                        className={`w-10 h-10 rounded-full ${action.bgColor} flex items-center justify-center mb-3`}
                      >
                        <div style={{ color: action.color }}>{action.icon}</div>
                      </div>
                      <p className="font-FoundersGrotesk text-lg font-medium">
                        {action.title}
                      </p>
                      <p className="font-NeueMontreal text-white/60 text-sm mt-1">
                        {action.desc}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURED STORY - Quote card style */}
          <section className="padding-x py-12">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl bg-gradient-to-br from-[#00aa55]/20 via-white/5 to-[#ff2f55]/20 border border-white/10 p-6 lg:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                      Featured Story
                    </span>
                    <h2 className="font-FoundersGrotesk text-2xl lg:text-4xl font-semibold tracking-tight mt-3">
                      Where did the
                      <br />
                      <span className="text-[#00aa55]">health budget</span> go?
                    </h2>
                    <p className="font-NeueMontreal text-white/70 mt-4 leading-relaxed">
                      We traced KSh 12 billion allocated for county health
                      facilities. Here's what we found on the ground versus
                      what's in the records.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00aa55] text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-[#00cc66] transition-colors whitespace-nowrap"
                      >
                        Read Full Story <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#00aa55]/20 border border-[#00aa55]/30 p-4">
                      <p className="text-xs font-NeueMontreal text-[#00aa55]/70 uppercase tracking-wider">
                        Budgeted
                      </p>
                      <p className="font-FoundersGrotesk text-2xl font-medium mt-1">
                        KSh 12B
                      </p>
                      <p className="font-NeueMontreal text-white/60 text-sm mt-1">
                        What was promised
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/10 border border-white/20 p-4">
                      <p className="text-xs font-NeueMontreal text-white/60 uppercase tracking-wider">
                        Verified
                      </p>
                      <p className="font-FoundersGrotesk text-2xl font-medium mt-1">
                        KSh 4.2B
                      </p>
                      <p className="font-NeueMontreal text-white/60 text-sm mt-1">
                        What we found
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[#ff2f55]/20 border border-[#ff2f55]/30 p-4 sm:col-span-2">
                      <p className="text-xs font-NeueMontreal text-[#ff2f55]/70 uppercase tracking-wider">
                        Action Needed
                      </p>
                      <p className="font-NeueMontreal text-white/80 mt-2">
                        3 facilities in Nakuru County require immediate
                        accountability review. Sign the petition to demand
                        transparency.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="padding-x py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Our Process
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold tracking-tight mt-3">
                  From numbers to narratives
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: "01",
                    title: "Research",
                    desc: "We analyze budget documents, procurement records, and spending reports from national and county governments.",
                  },
                  {
                    step: "02",
                    title: "Verify",
                    desc: "Our team visits project sites, interviews local communities, and cross-references data with on-ground reality.",
                  },
                  {
                    step: "03",
                    title: "Act",
                    desc: "We transform findings into accessible videos, articles, and interactive tools that empower citizens to act.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-xs font-NeueMontreal text-[#00aa55] uppercase tracking-wider">
                      {item.step}
                    </span>
                    <h3 className="font-FoundersGrotesk text-xl font-medium mt-3">
                      {item.title}
                    </h3>
                    <p className="font-NeueMontreal text-white/60 mt-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="padding-x py-16">
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

          {/* CTA Section */}
          <section className="padding-x py-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl bg-gradient-to-br from-[#00aa55]/20 via-white/5 to-transparent border border-white/10 p-8 lg:p-12 text-center"
              >
                <h2 className="font-FoundersGrotesk text-2xl lg:text-4xl font-semibold tracking-tight">
                  Your tax money.
                  <br />
                  <span className="text-white/60">Your right to know.</span>
                </h2>
                <p className="font-NeueMontreal text-white/70 mt-4 max-w-xl mx-auto">
                  Join thousands of Kenyans who are demanding accountability.
                  Learn how your money is being spent and what you can do about
                  it.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/90 transition-colors whitespace-nowrap"
                  >
                    Start Learning
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    Get Involved
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-16 px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="font-FoundersGrotesk text-lg font-medium text-white uppercase mb-6">
                  Contact Info
                </h3>
                <div className="flex flex-col gap-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-white/60">{item.icon}</div>
                      <div>
                        <p className="text-xs font-NeueMontreal text-white/50 mb-0.5">
                          {item.label}
                        </p>
                        <Link
                          href={item.href}
                          className="text-sm font-NeueMontreal text-white/80 hover:text-white transition-colors"
                        >
                          {item.value}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-FoundersGrotesk text-lg font-medium text-white uppercase mb-6">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                    >
                      {social.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter & Theme Toggle */}
              <div>
                <h3 className="font-FoundersGrotesk text-lg font-medium text-white uppercase mb-6">
                  Stay Updated
                </h3>
                <p className="text-sm font-NeueMontreal text-white/60 mb-4">
                  Subscribe to our newsletter for budget insights and updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mb-6">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 text-sm font-NeueMontreal text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button className="px-4 py-2 text-sm font-NeueMontreal text-white bg-white/10 border border-white/10 rounded-lg hover:bg-white/20 transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 mt-12 border-t border-white/10">
              <p className="text-sm font-NeueMontreal text-white/50">
                © {year} Budget Ndio Story. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/privacy"
                  className="text-sm font-NeueMontreal text-white/50 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm font-NeueMontreal text-white/50 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
