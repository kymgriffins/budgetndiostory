import AdminConfigClient from "./AdminConfigClient";

// Site configuration data (mock - would come from database in production)
const defaultConfig = {
  site: {
    name: "Budget Ndio Story",
    tagline: "Tracking Kenya's Public Funds",
    description: "Investigative journalism tracking how public money is spent in Kenya",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    language: "en",
    timezone: "Africa/Nairobi",
  },
  social: {
    twitter: "https://twitter.com/budgetndiostory",
    facebook: "https://facebook.com/budgetndiostory",
    instagram: "https://instagram.com/budgetndiostory",
    youtube: "https://youtube.com/@budgetndiostory",
    linkedin: "https://linkedin.com/company/budgetndiostory",
  },
  contact: {
    email: "info@budgetndiostory.org",
    phone: "+254 700 000 000",
    address: "Nairobi, Kenya",
    whatsapp: "+254 700 000 000",
  },
  features: {
    newsletter: true,
    comments: true,
    socialSharing: true,
    analytics: true,
    rss: true,
    search: true,
  },
  content: {
    postsPerPage: 10,
    relatedPosts: 3,
    showAuthorBio: true,
    showShareButtons: true,
    enableComments: true,
    moderateComments: true,
  },
  seo: {
    defaultTitle: "Budget Ndio Story - Tracking Kenya's Public Funds",
    defaultDescription: "Investigative journalism tracking how public money is spent in Kenya",
    siteUrl: "https://budgetndiostory.org",
    ogImage: "/og-image.jpg",
  },
  email: {
    fromName: "Budget Ndio Story",
    fromEmail: "noreply@budgetndiostory.org",
    notifyOnNewComment: true,
    notifyOnNewSubscriber: true,
    weeklyDigest: true,
  },
  moderation: {
    autoApproveComments: false,
    requireEmailVerification: true,
    blockBadWords: true,
    maxLinksInComment: 3,
  },
};

export default async function AdminConfigPage() {
  return <AdminConfigClient config={defaultConfig} />;
}
