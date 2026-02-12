"use client";

import { MainFooter, NavbarLanding } from "@/components";
import { motion } from "framer-motion";
import { Check, Mail, ArrowRight } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function NewsletterSuccessPage() {
  return (
    <>
      <Head>
        <title>Thank You for Subscribing | Budget Ndio Story</title>
        <meta
          name="description"
          content="Thank you for subscribing to our newsletter. You'll receive budget insights and updates."
        />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        <NavbarLanding />

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-[#00aa55]/10 rounded-full flex items-center justify-center mb-6">
                <Check size={48} className="text-[#00aa55]" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-FoundersGrotesk text-4xl md:text-5xl font-semibold mb-4"
            >
              You're Subscribed!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-NeueMontreal text-white/60 text-lg max-w-lg mx-auto mb-8"
            >
              Thank you for subscribing to our newsletter. Check your inbox for a
              confirmation email and get ready to receive budget insights, stories,
              and updates.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Mail size={20} className="text-[#00aa55]" />
                <span className="font-NeueMontreal font-medium">
                  What to expect
                </span>
              </div>
              <ul className="font-NeueMontreal text-white/60 text-sm space-y-2">
                <li>✓ Monthly budget breakdowns and analysis</li>
                <li>✓ Exclusive stories from our team</li>
                <li>✓ Updates on new podcasts and videos</li>
                <li>✓ Opportunities to participate in civic engagement</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal text-sm uppercase hover:bg-[#00cc66] transition-colors"
              >
                <ArrowRight size={16} />
                Back to Home
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full font-NeueMontreal text-sm uppercase hover:bg-white/10 transition-colors"
              >
                Read Stories
              </Link>
              <Link
                href="/tracker"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full font-NeueMontreal text-sm uppercase hover:bg-white/10 transition-colors"
              >
                Explore Tracker
              </Link>
            </motion.div>
          </div>
        </main>

        <MainFooter />
      </div>
    </>
  );
}
