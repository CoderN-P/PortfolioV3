import type { Metadata } from "next";
import { projects } from "@/app/data";
import ProjectsClient from "./ProjectsClient";
import { getCollectionStructuredData } from "@/app/utils/structuredData";

export const metadata: Metadata = {
  title: "Projects | Neel Parpia",
  description:
    "A collection of projects I've built, ranging from web applications to AI tools and robotics systems.",
  keywords: [
    "projects",
    "web development",
    "AI",
    "robotics",
    "software engineering",
    "programming",
  ],
  authors: [{ name: "Neel Parpia" }],
  creator: "Neel Parpia",
  publisher: "Neel Parpia",
  alternates: {
    canonical: "https://www.neelparpia.dev/projects",
  },
  openGraph: {
    title: "Projects | Neel Parpia",
    description:
      "A collection of projects I've built, ranging from web applications to AI tools and robotics systems.",
    type: "website",
    locale: "en_US",
    siteName: "Neel Parpia's Portfolio",
    url: "https://www.neelparpia.dev/projects",
  },
  twitter: {
    card: "summary",
    title: "Projects | Neel Parpia",
    description:
      "A collection of projects I've built, ranging from web applications to AI tools and robotics systems.",
    creator: "@neelparpia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Projects() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getCollectionStructuredData({
              name: "Projects | Neel Parpia",
              description: "A collection of projects built by Neel Parpia.",
              url: "https://www.neelparpia.dev/projects",
              items: projects.map((project) => ({
                name: project.name,
                url: `https://www.neelparpia.dev/writeups/${project.slug}`,
                image: project.image,
                description: project.shortDescription,
              })),
            }),
          ),
        }}
      />
      <ProjectsClient projects={projects} />
    </>
  );
}
