import type Article from "@/app/types/Article";
import type Photo from "@/app/types/Photo";
import type Project from "@/app/types/Project";
import type SkillCategory from "@/app/types/SkillCategory";

const siteUrl = "https://www.neelparpia.dev";

const person = {
  "@type": "Person",
  name: "Neel Parpia",
  url: siteUrl,
  image: `${siteUrl}/codern_pfp.jpeg`,
  sameAs: [
    "https://github.com/CoderN-P",
    "https://www.linkedin.com/in/neel-parpia-17a04721b/",
  ],
};

function breadcrumb(items: Array<{ name: string; url: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getArticleStructuredData(article: Article) {
  const url = `${siteUrl}/articles/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb([
        { name: "Home", url: siteUrl },
        { name: "Articles", url: `${siteUrl}/articles` },
        { name: article.name, url },
      ]),
      {
        "@type": "BlogPosting",
        headline: article.name,
        description: article.shortDescription,
        image: article.image
          ? `${siteUrl}${article.image}`
          : `${siteUrl}/codern_pfp.jpeg`,
        datePublished: article.lastUpdated,
        dateModified: article.lastUpdated,
        author: person,
        publisher: {
          "@type": "Organization",
          name: "Neel Parpia's Portfolio",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/codern_pfp.jpeg`,
          },
        },
        keywords: article.tags,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
    ],
  };
}

export function getCollectionStructuredData({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: Array<{
    name: string;
    url: string;
    image?: string;
    description?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name,
        description,
        url,
        isPartOf: {
          "@type": "WebSite",
          name: "Neel Parpia's Portfolio",
          url: siteUrl,
        },
        author: person,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: item.url,
            name: item.name,
            item: {
              "@type": "CreativeWork",
              name: item.name,
              url: item.url,
              description: item.description,
              ...(item.image ? { image: `${siteUrl}${item.image}` } : {}),
            },
          })),
        },
      },
      breadcrumb([
        { name: "Home", url: siteUrl },
        { name, url },
      ]),
    ],
  };
}

export function getGalleryStructuredData(photos: Photo[]) {
  const url = `${siteUrl}/gallery`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        name: "Gallery | Neel Parpia",
        description:
          "A collection of moments captured during travels and hikes.",
        url,
        author: person,
        image: photos.map((photo) => ({
          "@type": "ImageObject",
          contentUrl: `${siteUrl}${photo.src}`,
          name: photo.title,
          description: photo.description,
          caption: photo.alt,
        })),
      },
      breadcrumb([
        { name: "Home", url: siteUrl },
        { name: "Gallery", url },
      ]),
    ],
  };
}

export function getSkillsStructuredData(categories: SkillCategory[]) {
  const items = categories.flatMap((category) =>
    category.skills.map((skill) => ({
      name: skill.name,
      url: `${siteUrl}/skills#${encodeURIComponent(skill.name.toLowerCase().replace(/\s+/g, "-"))}`,
      description: `${skill.name} skill`,
    })),
  );

  return getCollectionStructuredData({
    name: "Skills & Technologies | Neel Parpia",
    description:
      "Technologies and tools used to build projects and solve problems.",
    url: `${siteUrl}/skills`,
    items,
  });
}

export function getHomeStructuredData(
  projects: Project[],
  articles: Article[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Neel Parpia's Portfolio",
        url: siteUrl,
        description:
          "Portfolio of Neel Parpia, a developer focused on AI, web development, and robotics.",
        author: person,
      },
      person,
      {
        "@type": "ItemList",
        name: "Featured projects and articles",
        itemListElement: [...projects, ...articles]
          .sort((a, b) => b.importance - a.importance)
          .slice(0, 10)
          .map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: `${siteUrl}/${"github" in item ? "writeups" : "articles"}/${item.slug}`,
          })),
      },
    ],
  };
}
