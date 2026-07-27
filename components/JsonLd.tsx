interface JsonLdPerson {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url: string;
  sameAs?: string[];
  jobTitle?: string;
  description?: string;
  image?: string;
}

interface JsonLdWebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  author?: {
    "@type": "Person";
    name: string;
  };
  inLanguage?: string;
}

interface JsonLdOrganization {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

interface JsonLdArticle {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": "Person";
    name: string;
    url?: string;
  };
  publisher?: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage:
    | {
        "@type": "WebPage";
        "@id": string;
      }
    | string;
}

interface JsonLdBreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

type JsonLdSchema =
  | JsonLdPerson
  | JsonLdWebSite
  | JsonLdOrganization
  | JsonLdArticle
  | JsonLdBreadcrumbList;

interface JsonLdProps {
  data: JsonLdSchema | JsonLdSchema[];
}

export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          schemas.length === 1 ? schemas[0] : schemas,
          null,
          0
        ),
      }}
    />
  );
}

export type {
  JsonLdPerson,
  JsonLdWebSite,
  JsonLdOrganization,
  JsonLdArticle,
  JsonLdBreadcrumbList,
  JsonLdSchema,
};

const SITE_URL = "https://afikri.online";

export function PersonJsonLd() {
  const person: JsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Afikri",
    url: SITE_URL,
    jobTitle: "Full-Stack Developer",
    description:
      "Developer building clean, fast web experiences with TypeScript, React, and intentional design.",
    sameAs: [
      "https://github.com/afikri",
      "https://linkedin.com/in/afikri",
    ],
  };

  const website: JsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Afikri",
    url: SITE_URL,
    description:
      "Developer building clean, fast web experiences with TypeScript, React, and intentional design.",
    author: {
      "@type": "Person",
      name: "Afikri",
    },
    inLanguage: "en-US",
  };

  return <JsonLd data={[person, website]} />;
}

export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  url,
}: {
  title: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}) {
  const article: JsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: "afikri",
    },
    publisher: {
      "@type": "Organization",
      name: "afikri.online",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return <JsonLd data={article} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url?: string }>;
}) {
  const breadcrumb: JsonLdBreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };

  return <JsonLd data={breadcrumb} />;
}
