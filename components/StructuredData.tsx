"use client";

import { useMemo } from "react";

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Component to render JSON-LD structured data
 */
export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = useMemo(() => {
    return JSON.stringify(data);
  }, [data]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}

/**
 * Organization structured data component
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Budget Ndio Story",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://budgetndiostory.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://budgetndiostory.com"}/logo.png`,
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

  return <StructuredData data={schema} />;
}

/**
 * Website structured data component
 */
export function WebsiteSchema() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://budgetndiostory.com";

  const schema = {
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

  return <StructuredData data={schema} />;
}

/**
 * Breadcrumb structured data component
 */
interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://budgetndiostory.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };

  return <StructuredData data={schema} />;
}

/**
 * Article structured data component
 */
interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  tags?: string[];
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  tags,
}: ArticleSchemaProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://budgetndiostory.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image.startsWith("http") ? image : `${siteUrl}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
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
    keywords: tags?.join(", "),
  };

  return <StructuredData data={schema} />;
}

/**
 * FAQ schema component
 */
interface FAQSchemaProps {
  questions: { question: string; answer: string }[];
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return <StructuredData data={schema} />;
}

/**
 * Local Business schema component
 */
interface LocalBusinessSchemaProps {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  phone: string;
  openingHours?: string[];
  priceRange?: string;
}

export function LocalBusinessSchema({
  name,
  address,
  phone,
  openingHours,
  priceRange,
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    telephone: phone,
    ...(openingHours && { openingHours }),
    ...(priceRange && { priceRange }),
  };

  return <StructuredData data={schema} />;
}

/**
 * Service schema component
 */
interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  url?: string;
}

export function ServiceSchema({
  name,
  description,
  provider,
  areaServed,
  url,
}: ServiceSchemaProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://budgetndiostory.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: siteUrl,
    },
    ...(areaServed && { areaServed }),
    ...(url && { url }),
  };

  return <StructuredData data={schema} />;
}

// Default export
export default StructuredData;
