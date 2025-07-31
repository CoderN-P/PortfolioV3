import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills & Technologies | Neel Parpia",
  description: "View my technical skills across programming languages, frameworks, and tools including Python, TypeScript, React, Svelte, AI/ML technologies, robotics, and more.",
  keywords: ["skills", "technologies", "programming", "Python", "TypeScript", "React", "Svelte", "AI", "machine learning", "robotics", "web development", "Neel Parpia"],
  authors: [{ name: "Neel Parpia", url: "https://github.com/CoderN-P" }],
  alternates: {
    canonical: "https://www.neelparpia.me/skills",
  },
  openGraph: {
    title: "Skills & Technologies | Neel Parpia",
    description: "View my technical skills across programming languages, frameworks, and tools including Python, TypeScript, React, Svelte, AI/ML technologies, robotics, and more.",
    url: "https://www.neelparpia.me/skills",
    siteName: "Neel Parpia's Portfolio",
    images: [
      {
        url: "/tech-icons/python.svg",
        width: 800,
        height: 400,
        alt: "Programming Skills and Technologies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills & Technologies | Neel Parpia",
    description: "View my technical skills across programming languages, frameworks, and tools including Python, TypeScript, React, Svelte, AI/ML technologies, robotics, and more.",
    images: ["/tech-icons/python.svg"],
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

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
