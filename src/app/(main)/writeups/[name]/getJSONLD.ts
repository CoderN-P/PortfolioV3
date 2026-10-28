import Project from "@/app/types/Project";

export default function getJSONLD(project: Project) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.neelparpia.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Writeups",
            item: "https://www.neelparpia.dev/writeups",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.name,
            item: `https://www.neelparpia.dev/writeups/${project.slug}`,
          },
        ],
      },
      {
        "@type": "BlogPosting", // Better than TechArticle for writeups
        headline: project.name,
        description: project.shortDescription,
        image: project.image || "https://www.neelparpia.dev/codern_pfp.jpeg",
        datePublished: project.lastUpdated,
        dateModified: project.lastUpdated,
        author: {
          "@type": "Person",
          name: "Neel Parpia",
          url: "https://www.neelparpia.dev",
        },
        publisher: {
          "@type": "Organization",
          name: "Neel Parpia's Portfolio",
          logo: {
            "@type": "ImageObject",
            url: "https://www.neelparpia.dev/codern_pfp.jpeg",
          },
        },
        keywords: project.tags, // Use array
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.neelparpia.dev/writeups/${project.slug}`,
        },
      },
      {
        "@type": "Person",
        name: "Neel Parpia",
        url: "https://www.neelparpia.dev",
        image: "https://www.neelparpia.dev/codern_pfp.jpeg",
        sameAs: [
          project.github || "https://github.com/CoderN-P",
          "https://www.linkedin.com/in/neel-parpia-17a04721b/",
        ],
        jobTitle: "Student",
        knowsAbout: project.tags,
      },
      {
        "@type": "WebPage",
        "@id": `https://www.neelparpia.dev/writeups/${project.slug}`,
        url: `https://www.neelparpia.dev/writeups/${project.slug}`,
        name: `${project.name} | Neel Parpia`,
        description: project.shortDescription,
        datePublished: project.lastUpdated,
        dateModified: project.lastUpdated,
        isPartOf: {
          "@type": "WebSite",
          name: "Neel Parpia's Portfolio",
          url: "https://www.neelparpia.dev",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: project.image || "https://www.neelparpia.dev/codern_pfp.jpeg",
        },
      },
    ],
  };
}
