import { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://budgetndiostory.com";

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
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImage],
      creator: "@budgetndiostory",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
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
      "https://twitter.com/budgetndiostory",
      "https://instagram.com/budgetndiostory",
      "https://linkedin.com/company/budgetndiostory",
      "https://youtube.com/@budgetndiostory",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254-700-000-000",
      contactType: "customer service",
      availableLanguage: ["English", "Swahili"],
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
