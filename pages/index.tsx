"use client";

import { MainFooter, NavbarLanding, YouTubePlayer} from "@/components";
import FooterV2 from "@/components/FooterV2";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Play,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  MapPin,
  Target,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

/**
 * 10/10 Landing Page - Budget Ndio Story
 * 
 * A modern, trustworthy, emotionally resonant, and conversion-focused
 * landing page for a youth-led Kenyan civic education platform.
 * 
 * Features:
 * - Hero-first emotional hook with video background
 * - Trust & transparency with E-E-A-T principles
 * - Youth energy with bold colors and large typography
 * - Conversion flow with layered CTAs
 * - Performance & accessibility optimizations
 * - Storytelling arc: Problem → Verification → Impact → Action
 */

// YouTube video ID for featured video (replace with actual video)
const FEATURED_VIDEO_ID = "dQw4w9WgXcQ"; // Replace with real Budget Ndio Story video

export default function VideoLanding() {
  const [year, setYear] = useState(2026);
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First FAQ open by default
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Set video start time after video loads
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 5;
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Quick Actions with stats
  const quickActions = [
    {
      icon: <Play size={24} />,
      title: "Latest Story",
      desc: "Watch our newest budget breakdown",
      href: "/stories",
      color: "#00aa55",
      bgColor: "bg-[#00aa55]/10",
      stat: "50+ Stories",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Budget Tracker",
      desc: "Follow the money in real-time",
      href: "/tracker",
      color: "#ffffff",
      bgColor: "bg-white/10",
      stat: "Live Updates",
    },
    {
      icon: <FileText size={24} />,
      title: "Field Reports",
      desc: "Stories from the ground",
      href: "/participate",
      color: "#ff2f55",
      bgColor: "bg-[#ff2f55]/10",
      stat: "12 Counties",
    },
    {
      icon: <Users size={24} />,
      title: "Join Movement",
      desc: "Become part of the change",
      href: "/participate",
      color: "#00aa55",
      bgColor: "bg-[#00aa55]/10",
      stat: "10K+ Youth",
    },
  ];

  // Process steps with proof
  const processSteps = [
    {
      step: "01",
      title: "Research",
      desc: "We analyze official budget documents, procurement records, and spending reports from national and county governments.",
      proof: "Analyzed 200+ documents in 2025",
    },
    {
      step: "02",
      title: "Verify",
      desc: "Our team visits project sites, interviews local communities, and cross-references data with on-ground reality.",
      proof: "Visited 47 projects across 8 counties",
    },
    {
      step: "03",
      title: "Act",
      desc: "We transform findings into accessible videos, articles, and interactive tools that empower citizens to act.",
      proof: "10K+ youth reached & engaged",
    },
  ];

  // Expanded FAQ with more questions
  const faqs = [
    {
      question: "What is Budget Ndio Story?",
      answer:
        "Budget Ndio Story is a youth-led civic education platform that translates complex national and county budgets into simple, engaging stories. We help citizens understand where public money goes and how they can participate in budget processes. Our work bridges the gap between government data and community understanding.",
    },
    {
      question: "How do you verify budget information?",
      answer:
        "Our verification process combines desktop research with on-ground investigation. We analyze official budget documents from the National Treasury and county governments, cross-reference procurement records, and conduct field visits to verify project implementation. Every story we publish includes our data sources and verification methodology.",
    },
    {
      question: "How often is data updated?",
      answer:
        "We update our budget tracker and data stories monthly during the budget cycle (typically February-July) and quarterly during other periods. Major findings from field verification are published as soon as they're confirmed, typically within 2-3 weeks of our site visits.",
    },
    {
      question: "How can I get involved?",
      answer:
        "There are many ways to get involved! You can subscribe to our newsletter for updates, share our stories on social media, join our community discussions, volunteer for field verification visits, or reach out to us for partnership opportunities. Visit our /participate page for more details.",
    },
    {
      question: "Is the information on your site free to use?",
      answer:
        "Yes! All our content is freely available for educational and civic purposes under Creative Commons Attribution 4.0 International (CC BY 4.0). We encourage sharing and redistribution with attribution to Budget Ndio Story. Our data is sourced from official government documents and our own field verification.",
    },
    {
      question: "Can I use this in school or community group?",
      answer:
        "Absolutely! Our stories, videos, and data visualizations are designed for educational use. We have lesson plans and discussion guides available for teachers and community facilitators. Contact us for tailored materials for your institution or group.",
    },
  ];

  // Trust badges for featured story
  const trustBadges = [
    { icon: <CheckCircle size={16} />, text: "Verified on-ground" },
    { icon: <FileText size={16} />, text: "Sources: National Treasury" },
    { icon: <MapPin size={16} />, text: "Naku County" },
  ];

  return (
    <>
      <Head>
        <title>Budget Ndio Story | Youth Civic Education on Kenya Budgets 2026</title>
        <meta
          name="description"
          content="Your Taxes. Their Stories. Understand where Kenya's money really goes through youth-led storytelling that turns complex budgets into real talk — because mwananchi deserves the truth."
        />
        <meta property="og:title" content="Budget Ndio Story | Youth Civic Education" />
        <meta
          property="og:description"
          content="Bridging the budget literacy gap for youth through storytelling. Join 10,000+ young Kenyans demanding transparency."
        />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark" />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Budget Ndio Story",
              url: "https://budgetndiostory.org",
              description: "Youth-led civic education platform translating Kenya's budget into stories",
              foundingDate: "2024",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressRegion: "nairobi",
                addressCountry: "KE",
              },
              sameAs: [
                "https://www.youtube.com/@BudgetNdioStory",
                "https://twitter.com/BudgetNdioStory",
                "https://www.instagram.com/budgetndiostory",
              ],
            }),
          }}
        />
        {/* Hidden H1 for SEO - screen readers only */}
        <h1 className="sr-only">Budget Ndio Story - Youth Civic Education Through Budget Storytelling</h1>
      </Head>

      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#00aa55] focus:text-black"
      >
        Skip to main content
      </a>

      <div className="bg-[#0a0a0a] text-white min-h-screen selection:bg-[#00aa55] selection:text-black">
        {/* Navigation */}
        <NavbarLanding />

        {/* HERO SECTION - Full-Screen Immersive */}
        <section className="relative w-full h-screen overflow-hidden" role="banner">
          {/* Video Background - with fallback */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
            onLoadedData={() => setIsVideoLoaded(true)}
            poster="/hero-poster.jpg"
          >
            <source src="/bnsoo1.mp4" type="video/mp4" />
          </video>
          
          {/* Loading placeholder */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-[#00aa55] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]/90" />

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center max-w-4xl"
            >
              {/* Tagline */}
              {/* <span className="inline-block px-4 py-1.5 bg-[#00aa55]/20 border border-[#00aa55]/30 rounded-full text-[#00aa55] text-xs font-NeueMontreal uppercase tracking-[0.15em] mb-6">
                Youth-Led Civic Education
              </span> */}

              {/* Main Headline - Founders Grotesk Bold */}
              <h1 className="font-FoundersGrotesk text-[clamp(36px,7vw,80px)] font-bold tracking-tight leading-[1.05] mb-5">
                Our Taxes, Our Story.
                <br />
                {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00aa55] to-[#00cc66]">
                  The Kenyan Budget.
                </span> */}
              </h1>

              {/* Subheadline - Neue Montreal */}
              <p className="font-NeueMontreal text-[clamp(14px,2vw,18px)] text-white/80 leading-relaxed max-w-2xl mx-auto  mb-10">
                Youth-led storytelling that turns complex budgets into real talk — because{" "}
                <span className="text-[#00aa55] font-medium">mwananchi</span> deserves the truth.
              </p>

              {/* Primary CTA - Explore the Data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center "
              >
                {/* <Link
                  href="/learn"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00aa55] text-black rounded-full font-NeueMontreal font-medium text-base uppercase tracking-wider hover:bg-[#00cc66] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00aa55]/25"
                >
                  Budget Ndio Story
                  <ArrowRight size={18} />
                </Link> */}
              </motion.div>

              {/* Impact Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap justify-center gap-8 mt-12"
              >
                <div className="text-center">
                  <p className="font-FoundersGrotesk text-3xl font-bold text-[#00aa55]">KSh 4.3 Trillion</p>
                  <p className="font-NeueMontreal text-white/60 text-xs uppercase tracking-wider mt-1">Budget</p>
                </div>
                <div className="w-px h-10 bg-white/20 hidden sm:block" />
                {/* <div className="text-center">
                  <p className="font-FoundersGrotesk text-3xl font-bold text-[#ce1010]">~11.814 Trillion+</p>
                  <p className="font-NeueMontreal text-[#ce1010] text-xs uppercase tracking-wider mt-1">DEBT</p>
                </div> */}
                <div className="w-px h-10 bg-white/20 hidden sm:block" />
                <div className="text-center">
                  <p className="font-FoundersGrotesk text-3xl font-bold text-white">~58.6 million</p>
                  <p className="font-NeueMontreal text-white/60 text-xs uppercase tracking-wider mt-1">KENYANS</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-px h-14 bg-gradient-to-b from-white/50 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-NeueMontreal animate-pulse">
                Scroll to Discover
              </span>
            </div>
          </motion.div>
        </section>

        <main id="main-content">
         
          {/* FEATURED IMPACT STORY - Emotional Core */}
          {/* FEATURED IMPACT STORY - Positive Government Success */}
<section id="featured-story" className="padding-x py-16" aria-labelledby="featured-story-heading">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-gradient-to-br from-[#00aa55]/15 via-[#0a0a0a] to-[#00aa55]/15 border border-white/10 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: Story Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#00aa55]/20 text-[#00aa55] text-xs font-medium uppercase tracking-wider rounded-full">
              Featured  Story
            </span>
            <span className="text-white/50 text-xs uppercase tracking-wider">
              Government Digital Inclusion
            </span>
          </div>
          <h2 id="featured-story-heading" className="font-FoundersGrotesk text-2xl lg:text-4xl font-semibold tracking-tight mt-3">
            How the Government is Bringing Digital Education to Every Child
          </h2>
          <p className="font-NeueMontreal text-white/70 mt-5 leading-relaxed text-lg">
            Through the Digital Literacy Programme (DigiSchool), the Kenyan government has delivered over 1.2 million tablets and laptops to public primary schools nationwide — connecting more than 20,000 schools to high-speed internet and transforming classrooms across all 47 counties.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { icon: <CheckCircle size={16} />, text: "Government-Led" },
              { icon: <FileText size={16} />, text: "Ministry of ICT & Education" },
              { icon: <MapPin size={16} />, text: "All 47 Counties" },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex font-NeueMontreal items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full"
              >
                <span className="text-[#00aa55]">{badge.icon}</span>
                <span className="text-white/70 text-xs font-medium">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal font-medium text-sm uppercase tracking-wider hover:bg-[#00cc66] hover:scale-105 transition-all duration-300"
            >
               Success Stories <ArrowRight size={16} />
            </Link>
           
          </div>
        </div>

        {/* Right: Impact Numbers */}
        <div className="bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {/* Devices Distributed */}
            <div className="rounded-2xl bg-[#00aa55]/10 border border-[#00aa55]/30 p-6 flex flex-col justify-center">
              <p className="text-xs font-NeueMontreal text-[#00aa55]/70 uppercase tracking-wider mb-2">
                Delivered
              </p>
              <p className="font-FoundersGrotesk text-4xl font-bold text-[#00aa55]">
                1.2M+
              </p>
              <p className="font-NeueMontreal text-white/60 text-sm mt-2">
                Tablets & Laptops to Schools
              </p>
            </div>

            {/* Schools Connected */}
            <div className="rounded-2xl bg-white/10 border border-white/20 p-6 flex flex-col justify-center">
              <p className="text-xs font-NeueMontreal text-white/60 uppercase tracking-wider mb-2">
                Connected
              </p>
              <p className="font-FoundersGrotesk text-4xl font-bold text-white">
                20,000+
              </p>
              <p className="font-NeueMontreal text-white/60 text-sm mt-2">
                Public Primary Schools
              </p>
            </div>

            {/* Reach & Impact */}
            <div className="rounded-2xl bg-[#00aa55]/10 border border-[#00aa55]/30 p-6 sm:col-span-2">
              <div className="flex items-start gap-3">
               
                <div>
                  <p className="text-xs font-NeueMontreal text-[#00aa55]/70 uppercase tracking-wider mb-1">
                    Real Impact
                  </p>
                  <p className="font-NeueMontreal text-white/80 leading-relaxed">
                    Millions of pupils now access digital learning, teachers use modern tools, and rural schools bridge the digital divide — building a brighter, tech-ready future for Kenya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

          {/* OUR PROCESS - Timeline Style */}
          <section className="padding-x py-20" aria-labelledby="process-heading">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55] font-medium">
                  Our Process
                </span>
                <h2 id="process-heading" className="font-FoundersGrotesk text-3xl lg:text-5xl font-semibold tracking-tight mt-4">
                  From Numbers to Narratives
                </h2>
                <p className="font-NeueMontreal text-white/60 mt-4 max-w-2xl mx-auto">
                  A rigorous three-step process that combines data analysis with on-ground verification
                </p>
              </motion.div>

              {/* Timeline */}
              <div className="relative">
                {/* Connecting Line - Hidden on mobile */}
                <div className="absolute top-32 left-1/2 -translate-x-1/2 w-px h-[calc(100%-160px)] bg-gradient-to-b from-[#00aa55]/50 via-[#00aa55]/20 to-transparent hidden lg:block" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {processSteps.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className="relative"
                    >
                      {/* Timeline Node - Hidden on mobile */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#0a0a0a] border-2 border-[#00aa55] rounded-full hidden lg:flex items-center justify-center z-10">
                        <div className="w-3 h-3 bg-[#00aa55] rounded-full" />
                      </div>

                      <div className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 h-full">
                        <span className="text-xs font-FoundersGrotesk text-[#00aa55] font-bold uppercase tracking-wider mb-4 block">
                          Step {item.step}
                        </span>
                        <h3 className="font-FoundersGrotesk text-xl font-semibold text-white mt-2">
                          {item.title}
                        </h3>
                        <p className="font-NeueMontreal text-white/60 mt-3 leading-relaxed">
                          {item.desc}
                        </p>
                        
                        {/* Proof Badge */}
                        <div className="flex items-center gap-2 mt-5 pt-5 border-t border-white/10">
                          <Clock size={14} className="text-[#00aa55]" />
                          <span className="text-xs font-NeueMontreal text-white/70">
                            {item.proof}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FEATURED VIDEO SECTION - YouTube Embed */}
          <section className="padding-x py-20" aria-labelledby="video-heading">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55] font-medium">
                  Featured Video
                </span>
                <h2 id="video-heading" className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold tracking-tight mt-3">
                  Understanding the Budget
                </h2>
                <p className="font-NeueMontreal text-white/60 mt-4 max-w-2xl mx-auto">
                  Watch our latest breakdown of how public funds are allocated and where your tax money really goes
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-video"
              >
                <YouTubePlayer videoId={FEATURED_VIDEO_ID} autoplay={false} />
              </motion.div>

              {/* Video Thumbnail Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4 mt-8"
              >
                <Link
                  href="/stories"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/20 transition-colors whitespace-nowrap"
                >
                  <Play size={16} /> Watch All Stories
                </Link>
                <Link
                  href="https://www.youtube.com/@BudgetNdioStory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff2f55]/10 border border-[#ff2f55]/20 text-[#ff2f55] rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-[#ff2f55]/20 transition-colors whitespace-nowrap"
                >
                  Subscribe on YouTube
                </Link>
              </motion.div>
            </div>
          </section>

          {/* FAQ SECTION - Expanded */}
          <section className="padding-x py-20" aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55] font-medium">
                  FAQ
                </span>
                <h2 id="faq-heading" className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold tracking-tight mt-3">
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
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      aria-expanded={openFaq === i}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#00aa55] focus:ring-inset"
                    >
                      <span className="font-FoundersGrotesk text-lg font-medium text-white pr-4">
                        {faq.question}
                      </span>
                      {openFaq === i ? (
                        <ChevronUp size={20} className="text-[#00aa55] flex-shrink-0" />
                      ) : (
                        <ChevronDown size={20} className="text-white/60 flex-shrink-0" />
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

          {/* FINAL CTA BAND - Gradient with Social Proof */}
          <section id="subscribe" className="padding-x py-20" aria-labelledby="cta-heading">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl bg-gradient-to-br from-[#00aa55]/20 via-[#0a0a0a] to-[#ff2f55]/20 border border-white/10 p-10 lg:p-16 text-center relative overflow-hidden"
              >
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#00aa55]/20 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#ff2f55]/20 rounded-full blur-3xl translate-y-1/2" />

                <div className="relative z-10">
                  <span className=" font-NeueMontreal inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/70 text-xs font-medium uppercase tracking-wider mb-6">
                    <Users size={14} /> Join 10,000+ Young Kenyans
                  </span>
                  
                  <h2 id="cta-heading" className="font-FoundersGrotesk text-3xl lg:text-5xl font-semibold tracking-tight">
                    Be Part of the <span className="text-[#00aa55]">Change</span>
                  </h2>
                  
                  <p className="font-NeueMontreal text-white/70 mt-5 max-w-xl mx-auto text-lg">
                    Demand transparency. Understand your rights. Make your voice heard. 
                    Join a movement of young Kenyans transforming civic engagement.
                  </p>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap justify-center gap-6 mt-8">
                    <div className="flex items-center gap-2 font-NeueMontreal text-white/60 text-sm">
                      <CheckCircle size={16} className="text-[#00aa55]" />
                      Free to join
                    </div>
                    <div className="flex font-NeueMontreal items-center gap-2 text-white/60 text-sm">
                      <Clock size={16} className="text-[#00aa55]" />
                      2 min to subscribe
                    </div>
                    <div className="flex font-NeueMontreal items-center gap-2 text-white/60 text-sm">
                      <MapPin size={16} className="text-[#00aa55]" />
                       Kenya
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                    <Link
                      href="#subscribe"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00aa55] text-black rounded-full font-NeueMontreal font-medium text-base uppercase tracking-wider hover:bg-[#00cc66] hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00aa55]/25"
                    >
                      Subscribe Now
                      <ArrowRight size={18} />
                    </Link>
                    {/* <Link
                      href="/tracker"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-NeueMontreal font-medium text-base uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
                    >
                      Explore the Tracker
                    </Link> */}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* FOOTER - Trust Anchor */}
       
        <MainFooter/>
      </div>
    </>
  );
}
