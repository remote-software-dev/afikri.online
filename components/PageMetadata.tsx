import type { Metadata } from "next";
import {
  JsonLd,
  type JsonLdSchema,
} from "./JsonLd";

const SITE_URL = "https://afikri.online";
const SITE_NAME = "afikri.online";

interface PageMetadataConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  jsonLd?: JsonLdSchema | JsonLdSchema[];
  breadcrumbs?: Array<{ name: string; url?: string }>;
}

export function generatePageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetadataConfig): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? `${SITE_URL}/opengraph-image.png`;

  const openGraphBase = {
    title,
    description,
    url,
    siteName: SITE_NAME,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };

  if (type === "article" && publishedTime) {
    return {
      title,
      description,
      robots: {
        index: !noIndex,
        follow: true,
        googleBot: {
          index: !noIndex,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: url,
      },
      openGraph: {
        ...openGraphBase,
        type: "article",
        publishedTime,
        modifiedTime: modifiedTime ?? publishedTime,
        authors: ["afikri"],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  }

  return {
    title,
    description,
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...openGraphBase,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

interface PageMetadataProps {
  jsonLd?: JsonLdSchema | JsonLdSchema[];
  breadcrumbs?: Array<{ name: string; url?: string }>;
  article?: {
    title: string;
    description?: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    url: string;
  };
}

export function PageMetadata({
  jsonLd,
  breadcrumbs,
  article,
}: PageMetadataProps) {
  const schemas: JsonLdSchema[] = [];

  if (jsonLd) {
    const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    schemas.push(...items);
  }

  if (article) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      image: article.image,
      datePublished: article.datePublished,
      dateModified: article.dateModified ?? article.datePublished,
      author: {
        "@type": "Person",
        name: "afikri",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": article.url,
      },
    });
  }

  if (breadcrumbs) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem" as const,
        position: index + 1,
        name: item.name,
        ...(item.url ? { item: item.url } : {}),
      })),
    });
  }

  if (schemas.length === 0) {
    return null;
  }

  return <JsonLd data={schemas} />;
}
