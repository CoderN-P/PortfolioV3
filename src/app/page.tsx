import type { Metadata } from "next";
import { projects } from "@/app/data";

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
  const featuredProjects = projects.filter((p) => p.featured);
  const projectsWithWriteups = projects.filter(
    (p) => p.slug && p.slug.trim() !== "",
  );

  return (
    <div className="w-full">
      <p className={"text-lg"}>Neel Parpia</p>
    </div>
  );
}
