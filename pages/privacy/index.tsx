"use client";

import { MainFooter, NavbarLanding } from "@/components";
import { motion } from "framer-motion";
import { Shield, Mail, ArrowLeft } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Budget Ndio Story</title>
        <meta
          name="description"
          content="Learn about how Budget Ndio Story collects, uses, and protects your personal information."
        />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
        <NavbarLanding />

        <main className="flex-1 px-4 py-24">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield size={32} className="text-[#00aa55]" />
                <h1 className="font-FoundersGrotesk text-4xl font-semibold">
                  Privacy Policy
                </h1>
              </div>

              <p className="font-NeueMontreal text-white/60 mb-8">
                Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>

              <div className="prose prose-invert prose-white max-w-none font-NeueMontreal">
                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    1. Introduction
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    Welcome to Budget Ndio Story ("we," "our," or "us"). We are committed to
                    protecting your privacy and ensuring the security of your personal
                    information. This Privacy Policy explains how we collect, use, disclose,
                    and safeguard your information when you visit our website.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    2. Information We Collect
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    We may collect personal information that you voluntarily provide to us
                    when you:
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us through our forms</li>
                    <li>Participate in surveys or feedback</li>
                    <li>Engage with our content</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    3. How We Use Your Information
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                    <li>Send you newsletters and updates</li>
                    <li>Respond to your inquiries</li>
                    <li>Improve our website and services</li>
                    <li>Analyze website traffic and usage</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    4. Cookies and Tracking Technologies
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    Our website may use cookies and similar tracking technologies to
                    enhance your experience. You can control cookies through your
                    browser settings.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    5. Data Security
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    We implement appropriate security measures to protect your personal
                    information from unauthorized access, alteration, disclosure, or
                    destruction.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    6. Third-Party Services
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    We may use third-party services (such as analytics providers) that
                    collect information about your browsing habits. These third parties
                    have their own privacy policies addressing how they use such
                    information.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    7. Your Rights
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                    <li>Access and receive a copy of your personal data</li>
                    <li>Rectify inaccurate personal data</li>
                    <li>Request deletion of your personal data</li>
                    <li>Opt-out of communications</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    8. Children's Privacy
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    Our website is not intended for children under the age of 13. We do
                    not knowingly collect personal information from children.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    9. Changes to This Policy
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify
                    you of any changes by posting the new Privacy Policy on this page.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    10. Contact Us
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy, please contact
                    us:
                  </p>
                  <div className="flex items-center gap-2 text-white/70">
                    <Mail size={16} className="text-[#00aa55]" />
                    <span>info@budgetndiostory.org</span>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </main>

        <MainFooter />
      </div>
    </>
  );
}
