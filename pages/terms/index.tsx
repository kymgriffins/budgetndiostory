"use client";

import { MainFooter, NavbarLanding } from "@/components";
import { motion } from "framer-motion";
import { FileText, Mail, ArrowLeft } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Use | Budget Ndio Story</title>
        <meta
          name="description"
          content="Terms of Use governing the access and use of Budget Ndio Story website."
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
                <FileText size={32} className="text-[#00aa55]" />
                <h1 className="font-FoundersGrotesk text-4xl font-semibold">
                  Terms of Use
                </h1>
              </div>

              <p className="font-NeueMontreal text-white/60 mb-8">
                Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>

              <div className="prose prose-invert prose-white max-w-none font-NeueMontreal">
                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    By accessing and using Budget Ndio Story's website, you accept and agree
                    to be bound by the terms and provisions of this agreement. If you do not
                    agree to abide by these terms, please do not use this website.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    2. Use of Content
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    All content provided on this website is for informational and educational
                    purposes only. You may:
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                    <li>Read and view our content for personal, non-commercial use</li>
                    <li>Share our articles with proper attribution</li>
                    <li>Link to our content from other websites</li>
                  </ul>
                  <p className="text-white/70 leading-relaxed mt-4">
                    You may not:
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                    <li>Reproduce, distribute, or modify content without permission</li>
                    <li>Use our content for commercial purposes without consent</li>
                    <li>Remove any copyright or proprietary notices</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    3. Intellectual Property
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    All content, including but not limited to articles, graphics, logos,
                    icons, images, audio clips, and software, is the property of Budget
                    Ndio Story or its content suppliers and is protected by copyright and
                    other intellectual property laws.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    4. Accuracy of Information
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    We strive to provide accurate and up-to-date information on budget
                    data, but we cannot guarantee the completeness, accuracy, or reliability
                    of any content. Budget information may change, and we recommend verifying
                    with official sources.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    5. Disclaimer
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    This website is provided "as is" without any representations or
                    warranties, express or implied. Budget Ndio Story makes no
                    representations or warranties in relation to this website or the
                    information and materials provided.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    6. Limitation of Liability
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    Budget Ndio Story shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, or any loss of profits
                    or revenues, whether incurred directly or indirectly, or any loss of
                    data, use, goodwill, or other intangible losses resulting from your
                    use of this website.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    7. Third-Party Links
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    Our website may contain links to third-party websites. These links
                    are provided for your convenience and do not imply endorsement. We
                    have no control over third-party websites and are not responsible
                    for their content or privacy practices.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    8. User Conduct
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    When using our website, you agree not to:
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                    <li>Post or transmit any unlawful, threatening, or defamatory content</li>
                    <li>Impersonate any person or entity</li>
                    <li>Interfere with or disrupt the website's operation</li>
                    <li>Attempt to gain unauthorized access to any part of the website</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    9. Changes to Terms
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    We reserve the right to modify or replace these Terms of Use at any
                    time. Your continued use of the website after any changes constitutes
                    acceptance of the new terms.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    10. Governing Law
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    These terms and conditions are governed by and construed in accordance
                    with the laws of Kenya, and you irrevocably submit to the exclusive
                    jurisdiction of the courts in that State or location.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="font-FoundersGrotesk text-xl font-semibold mb-4 text-white">
                    11. Contact Information
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    If you have any questions about these Terms of Use, please contact us:
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
