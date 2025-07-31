import Project from "@/app/types/Project";

export default function getJSONLD(project: Project) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.neelparpia.me" },
                    { "@type": "ListItem", position: 2, name: "Writeups", item: "https://www.neelparpia.me/writeups" },
                    { "@type": "ListItem", position: 3, name: project.name, item: `https://www.neelparpia.me/writeups/${project.slug}` }
                ]
            },
            {
                "@type": "BlogPosting", // Better than TechArticle for writeups
                headline: project.name,
                description: project.shortDescription,
                image: project.image || "https://www.neelparpia.me/codern_pfp.jpeg",
                datePublished: project.lastUpdated,
                dateModified: project.lastUpdated,
                author: {
                    "@type": "Person",
                    name: "Neel Parpia",
                    url: "https://www.neelparpia.me"
                },
                publisher: {
                    "@type": "Organization",
                    name: "Neel Parpia's Portfolio",
                    logo: {
                        "@type": "ImageObject",
                        url: "https://www.neelparpia.me/codern_pfp.jpeg"
                    }
                },
                keywords: project.tags, // Use array
                mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `https://www.neelparpia.me/writeups/${project.slug}`
                }
            },
            {
                "@type": "Person",
                name: "Neel Parpia",
                url: "https://www.neelparpia.me",
                image: "https://www.neelparpia.me/codern_pfp.jpeg",
                sameAs: [
                    project.github || "https://github.com/CoderN-P",
                    "https://www.linkedin.com/in/neel-parpia-17a04721b/"
                ],
                jobTitle: "Student",
                knowsAbout: project.tags
            },
            {
                "@type": "WebPage",
                "@id": `https://www.neelparpia.me/writeups/${project.slug}`,
                url: `https://www.neelparpia.me/writeups/${project.slug}`,
                name: `${project.name} | Neel Parpia`,
                description: project.shortDescription,
                datePublished: project.lastUpdated,
                dateModified: project.lastUpdated,
                isPartOf: {
                    "@type": "WebSite",
                    name: "Neel Parpia's Portfolio",
                    url: "https://www.neelparpia.me"
                },
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: project.image || "https://www.neelparpia.me/codern_pfp.jpeg"
                }
            }
        ]
    };
}