import type { Metadata } from "next";
import { projects, articles } from "@/app/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Neel Parpia - High School Developer",
  description:
    "I'm a passionate high school developer specializing in AI, Web Development, Robotics, and innovative technology solutions. Explore my projects and skills.",
  keywords: [
    "Neel Parpia",
    "developer",
    "portfolio",
    "AI",
    "web development",
    "robotics",
    "high school developer",
    "programming",
    "software engineer",
  ],
  authors: [{ name: "Neel Parpia", url: "https://github.com/CoderN-P" }],
  creator: "Neel Parpia",
  alternates: {
    canonical: "https://www.neelparpia.me",
  },
  openGraph: {
    title: "Neel Parpia - High School Developer",
    description:
      "I'm a passionate high school developer specializing in AI, Web Development, Robotics, and innovative technology solutions.",
    url: "https://www.neelparpia.me",
    siteName: "Neel Parpia\'s Portfolio",
    images: [
      {
        url: "/codern_pfp.jpeg",
        width: 800,
        height: 800,
        alt: "Neel Parpia Profile Picture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neel Parpia - High School Developer",
    description:
      "I'm a passionate high school developer specializing in AI, Web Development, Robotics, and innovative technology solutions.",
    images: ["/codern_pfp.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  const featuredProjects = projects.filter(
    (p) => p.slug && p.slug.trim() !== "",
  ).sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).slice(0, 3);
  
  const featuredArticles = articles.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).slice(0, 3);

  return (
    <div className="w-full">
      <p className={"text-3xl font-bold"}>Neel Parpia</p>
        <p className="mt-2 text-lg text-gray-700">
            I&apos;m a passionate high school developer interested in AI, Web Development, Robotics, and innovative technology solutions. Explore my projects and skills.
        </p>

      <h1 className="text-2xl font-bold mt-12">Featured Projects</h1>
      {featuredProjects.map((project) => (
          <Link key={project.name} href={`/writeups/${project.slug}`} className=" flex flex-row items-center justify-between mt-3 border border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-md px-4 py-2">
            <div className="flex flex-row gap-2 items-center">
              <h2 className="text-lg font-bold">{project.name}</h2>
              <p className="font-medium ">{project.lastUpdated}</p>
            </div>
            <ArrowRight className="inline-block text-gray-600" />
          </Link>
      ))}
        <h1 className="text-2xl font-bold mt-12">Latest Articles</h1>
        {featuredArticles.map((article) => (
            <Link key={article.name} href={`/articles/${article.slug}`} className=" flex flex-row items-center justify-between mt-3 border border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-md px-4 py-2">
             <div className="flex flex-row gap-2 items-center">
              <h2 className="text-lg font-bold">{article.name}</h2>
              <p className="font-medium ">{article.lastUpdated}</p>
             </div>
              <ArrowRight className="inline-block text-gray-600" />
            </Link>
        ))}
      
    </div>
  );
}
