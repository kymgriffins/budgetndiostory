"use client";

import { useState } from "react";

interface SiteConfig {
  site: {
    name: string;
    tagline: string;
    description: string;
    logo: string;
    favicon: string;
    language: string;
    timezone: string;
  };
  social: {
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    whatsapp: string;
  };
  features: {
    newsletter: boolean;
    comments: boolean;
    socialSharing: boolean;
    analytics: boolean;
    rss: boolean;
    search: boolean;
  };
  content: {
    postsPerPage: number;
    relatedPosts: number;
    showAuthorBio: boolean;
    showShareButtons: boolean;
    enableComments: boolean;
    moderateComments: boolean;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    siteUrl: string;
    ogImage: string;
  };
  email: {
    fromName: string;
    fromEmail: string;
    notifyOnNewComment: boolean;
    notifyOnNewSubscriber: boolean;
    weeklyDigest: boolean;
  };
  moderation: {
    autoApproveComments: boolean;
    requireEmailVerification: boolean;
    blockBadWords: boolean;
    maxLinksInComment: number;
  };
}

interface AdminConfigClientProps {
  config: SiteConfig;
}

type ConfigSection = "site" | "social" | "contact" | "features" | "content" | "seo" | "email" | "moderation";

export default function AdminConfigClient({ config: initialConfig }: AdminConfigClientProps) {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [activeSection, setActiveSection] = useState<ConfigSection>("site");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateConfig = (section: keyof SiteConfig, key: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const sections = [
    { id: "site", label: "Site Info", icon: "🏢", description: "Basic site information" },
    { id: "social", label: "Social Media", icon: "📱", description: "Social media links" },
    { id: "contact", label: "Contact", icon: "📧", description: "Contact information" },
    { id: "features", label: "Features", icon: "⚡", description: "Enable/disable features" },
    { id: "content", label: "Content", icon: "📝", description: "Content settings" },
    { id: "seo", label: "SEO", icon: "🔍", description: "Search optimization" },
    { id: "email", label: "Email", icon: "✉️", description: "Email notifications" },
    { id: "moderation", label: "Moderation", icon: "🛡️", description: "Comment moderation" },
  ] as const;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-FoundersGrotesk font-bold text-gray-900">Site Configuration</h1>
        <p className="text-gray-500 font-NeueMontreal mt-1">
          Manage your website settings and preferences. Changes are saved automatically when you click "Save Changes".
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="bg-white rounded-xl border border-gray-100 p-2 space-y-1 sticky top-24">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as ConfigSection)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeSection === section.id
                    ? "bg-[#1a1a2e] text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <div>
                  <p className="font-FoundersGrotesk font-medium text-sm">{section.label}</p>
                  <p className={`text-xs ${activeSection === section.id ? "text-gray-300" : "text-gray-400"}`}>
                    {section.description}
                  </p>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            {/* Site Info Section */}
            {activeSection === "site" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-FoundersGrotesk font-semibold text-gray-900 mb-4">Site Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={config.site.name}
                        onChange={(e) => updateConfig("site", "name", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={config.site.tagline}
                        onChange={(e) => updateConfig("site", "tagline", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={config.site.description}
                        onChange={(e) => updateConfig("site", "description", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Language
                      </label>
                      <select
                        value={config.site.language}
                        onChange={(e) => updateConfig("site", "language", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="sw">Swahili</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <select
                        value={config.site.timezone}
                        onChange={(e) => updateConfig("site", "timezone", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      >
                        <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Section */}
            {activeSection === "social" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-FoundersGrotesk font-semibold text-gray-900 mb-4">Social Media Links</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Twitter / X
                      </label>
                      <input
                        type="url"
                        value={config.social.twitter}
                        onChange={(e) => updateConfig("social", "twitter", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Facebook
                      </label>
                      <input
                        type="url"
                        value={config.social.facebook}
                        onChange={(e) => updateConfig("social", "facebook", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        placeholder="https://facebook.com/page"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instagram
                      </label>
                      <input
                        type="url"
                        value={config.social.instagram}
                        onChange={(e) => updateConfig("social", "instagram", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        YouTube
                      </label>
                      <input
                        type="url"
                        value={config.social.youtube}
                        onChange={(e) => updateConfig("social", "youtube", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        placeholder="https://youtube.com/@username"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={config.social.linkedin}
                        onChange={(e) => updateConfig("social", "linkedin", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        placeholder="https://linkedin.com/company/name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Section */}
            {activeSection === "contact" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-FoundersGrotesk font-semibold text-gray-900 mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={config.contact.email}
                        onChange={(e) => updateConfig("contact", "email", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={config.contact.phone}
                        onChange={(e) => updateConfig("contact", "phone", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={config.contact.whatsapp}
                        onChange={(e) => updateConfig("contact", "whatsapp", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={config.contact.address}
                        onChange={(e) => updateConfig("contact", "address", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Section */}
            {activeSection === "features" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-FoundersGrotesk font-semibold text-gray-900 mb-4">Feature Toggles</h2>
                  <div className="space-y-4">
                    {[
                      { key: "newsletter", label: "Newsletter", desc: "Enable newsletter subscription" },
                      { key: "comments", label: "Comments", desc: "Allow visitors to comment on articles" },
                      { key: "socialSharing", label: "Social Sharing", desc: "Show share buttons on articles" },
                      { key: "analytics", label: "Analytics", desc: "Track visitor statistics" },
                      { key: "rss", label: "RSS Feed", desc: "Enable RSS feed for content" },
                      { key: "search", label: "Search", desc: "Enable site-wide search" },
                    ].map((feature) => (
                      <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{feature.label}</p>
                          <p className="text-sm text-gray-500">{feature.desc}</p>
                        </div>
                        <button
                          onClick={() => updateConfig("features", feature.key, !config.features[feature.key as keyof typeof config.features])}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            config.features[feature.key as keyof typeof config.features] ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              config.features[feature.key as keyof typeof config.features] ? "translate-x-7" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Content Section */}
            {activeSection === "content" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-FoundersGrotesk font-semibold text-gray-900 mb-4">Content Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Posts Per Page
                      </label>
                      <input
                        type="number"
                        value={config.content.postsPerPage}
                        onChange={(e) => updateConfig("content", "postsPerPage", parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        min={1}
                        max={50}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Related Posts
                      </label>
                      <input
                        type="number"
                        value={config.content.relatedPosts}
                        onChange={(e) => updateConfig("content", "relatedPosts", parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        min={0}
                        max={10}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { key: "showAuthorBio", label: "Show Author Bio", desc: "Display author information at end of articles" },
                      { key: "showShareButtons", label: "Share Buttons", desc: "Show social sharing buttons" },
                      { key: "enableComments", label: "Enable Comments", desc: "Allow comments on articles" },
                      { key: "moderateComments", label: "Moderate Comments", desc: "Review comments before publishing" },
                    ].map((feature) => (
                      <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{feature.label}</p>
                          <p className="text-sm text-gray-500">{feature.desc}</p>
                        </div>
                        <button
                          onClick={() => updateConfig("content", feature.key, !config.content[feature.key as keyof typeof config.content])}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            config.content[feature.key as keyof typeof config.content] ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              config.content[feature.key as keyof typeof config.content] ? "translate-x-7" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SEO Section */}
            {activeSection === "seo" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-FoundersGrotesk font-semibold text-gray-900 mb-4">SEO Settings</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Default Page Title
                      </label>
                      <input
                        type="text"
                        value={config.seo.defaultTitle}
                        onChange={(e) => updateConfig("seo", "defaultTitle", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Default Meta Description
                      </label>
                      <textarea
                        value={config.seo.defaultDescription}
                        onChange={(e) => updateConfig("seo", "defaultDescription", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Site URL
                      </label>
                      <input
                        type="url"
                        value={config.seo.siteUrl}
                        onChange={(e) => updateConfig("seo", "siteUrl", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Default OG Image URL
                      </label>
                      <input
                        type="url"
                        value={config.seo.ogImage}
                        onChange={(e) => updateConfig("seo", "ogImage", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        placeholder="/og-image.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Section */}
            {activeSection === "email" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Name
                      </label>
                      <input
                        type="text"
                        value={config.email.fromName}
                        onChange={(e) => updateConfig("email", "fromName", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Email
                      </label>
                      <input
                        type="email"
                        value={config.email.fromEmail}
                        onChange={(e) => updateConfig("email", "fromEmail", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { key: "notifyOnNewComment", label: "New Comment Notifications", desc: "Get notified when someone comments" },
                      { key: "notifyOnNewSubscriber", label: "New Subscriber Notifications", desc: "Get notified when someone subscribes" },
                      { key: "weeklyDigest", label: "Weekly Digest", desc: "Send weekly summary emails" },
                    ].map((feature) => (
                      <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{feature.label}</p>
                          <p className="text-sm text-gray-500">{feature.desc}</p>
                        </div>
                        <button
                          onClick={() => updateConfig("email", feature.key, !config.email[feature.key as keyof typeof config.email])}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            config.email[feature.key as keyof typeof config.email] ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              config.email[feature.key as keyof typeof config.email] ? "translate-x-7" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Moderation Section */}
            {activeSection === "moderation" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Comment Moderation</h2>
                  <div className="space-y-4 mb-6">
                    {[
                      { key: "autoApproveComments", label: "Auto-Approve Comments", desc: "Publish comments without review" },
                      { key: "requireEmailVerification", label: "Require Email Verification", desc: "Users must verify email to comment" },
                      { key: "blockBadWords", label: "Block Bad Words", desc: "Filter inappropriate language" },
                    ].map((feature) => (
                      <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{feature.label}</p>
                          <p className="text-sm text-gray-500">{feature.desc}</p>
                        </div>
                        <button
                          onClick={() => updateConfig("moderation", feature.key, !config.moderation[feature.key as keyof typeof config.moderation])}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            config.moderation[feature.key as keyof typeof config.moderation] ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              config.moderation[feature.key as keyof typeof config.moderation] ? "translate-x-7" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Links in Comment
                      </label>
                      <input
                        type="number"
                        value={config.moderation.maxLinksInComment}
                        onChange={(e) => updateConfig("moderation", "maxLinksInComment", parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        min={0}
                        max={10}
                      />
                      <p className="text-xs text-gray-500 mt-1">Set to 0 to disable links entirely</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {saved ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Settings saved successfully!
                  </span>
                ) : (
                  "Make changes to save"
                )}
              </p>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-[#1a1a2e] text-white rounded-lg font-medium hover:bg-[#16213e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
