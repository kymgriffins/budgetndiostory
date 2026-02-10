import { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://budgetndiostory.org";

/**
 * Generate page metadata with SEO best practices
 */
export function generatePageMetadata(
  title: string,
  description: string,
  options: {
    image?: string;
    path?: string;
    keywords?: string[];
    noIndex?: boolean;
    noFollow?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  } = {},
): Metadata {
  const {
    image = "/og-image.jpg",
    path = "",
    keywords = [],
    noIndex = false,
    noFollow = false,
    publishedTime,
    modifiedTime,
    authors = ["Budget Ndio Story"],
    section,
    tags = [],
  } = options;

  const fullUrl = `${siteUrl}${path}`;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
      template: "%s | Budget Ndio Story",
      default: "Budget Ndio Story - Creative Digital Agency",
    },
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: authors.map((name) => ({ name })),
    creator: "Budget Ndio Story",
    publisher: "Budget Ndio Story",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        en: siteUrl,
        sw: `${siteUrl}/sw`,
      },
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: fullUrl,
      siteName: "Budget Ndio Story",
      title,
      description,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          url: fullImage,
          width: 800,
          height: 600,
          alt: title,
        },
        {
          url: fullImage,
          width: 180,
          height: 180,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImage],
      creator: "@budgetndiostory",
      site: "@budgetndiostory",
    },
    facebook: {
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION,
    },
    category: "Creative Agency",
  };

  // Add optional article-specific metadata
  if (publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      publishedTime,
    } as Metadata["openGraph"];
  }
  if (modifiedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      modifiedTime,
    } as Metadata["openGraph"];
  }
  if (authors.length > 0) {
    metadata.openGraph = {
      ...metadata.openGraph,
      authors: authors,
    } as Metadata["openGraph"];
  }
  if (section) {
    metadata.openGraph = {
      ...metadata.openGraph,
      section,
    } as Metadata["openGraph"];
  }
  if (tags.length > 0) {
    metadata.openGraph = {
      ...metadata.openGraph,
      tags,
    } as Metadata["openGraph"];
  }

  return metadata;
}

/**
 * Organization schema for structured data
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Budget Ndio Story",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://www.facebook.com/profile.php?id=61586898487932",
      "https://www.tiktok.com/@budget.ndio.story",
      "https://www.instagram.com/budgetndiostory",
      "https://x.com/BudgetNdioStory",
      "https://www.linkedin.com/company/budgetndiostory",
      "https://www.youtube.com/@BudgetNdioStory",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254711106814",
      contactType: "customer service",
      availableLanguage: ["English", "Swahili"],
    },
    foundingDate: "2020",
    description:
      "Budget Ndio Story is a creative digital agency specializing in web design, development, and digital storytelling.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
  };
}

/**
 * Website schema for structured data
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Budget Ndio Story",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Breadcrumb schema for structured data
 */
export function getBreadcrumbSchema(
  breadcrumbs: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith("http") ? crumb.url : `${siteUrl}${crumb.url}`,
    })),
  };
}

/**
 * Article schema for blog posts
 */
export function getArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image.startsWith("http")
      ? article.image
      : `${siteUrl}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Budget Ndio Story",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/articles`,
    },
    keywords: article.tags?.join(", "),
    articleSection: "Blog",
    inLanguage: "en-US",
  };
}

/**
 * Course schema for educational content
 */
export function getCourseSchema(course: {
  title: string;
  description: string;
  image: string;
  provider: string;
  offers?: {
    price: string;
    currency: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    image: course.image.startsWith("http")
      ? course.image
      : `${siteUrl}${course.image}`,
    provider: {
      "@type": "Organization",
      name: course.provider,
      sameAs: siteUrl,
    },
    offers: course.offers
      ? {
          "@type": "Offer",
          price: course.offers.price,
          priceCurrency: course.offers.currency,
        }
      : undefined,
  };
}

/**
 * Generate sitemap entries for static routes
 */
export function generateSitemapEntries(
  routes: {
    path: string;
    priority: number;
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
  }[],
) {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
