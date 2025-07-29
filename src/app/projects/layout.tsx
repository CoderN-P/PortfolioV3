import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Neel Parpia",
  description: "Explore Neel Parpia's portfolio of innovative projects including TRACER robotics platform, Stellar learning app, GPT-Kitbot, and more. Showcasing expertise in AI, web development, and robotics.",
  keywords: ["projects", "portfolio", "TRACER", "Stellar", "GPT-Kitbot", "robotics", "AI", "web development", "Neel Parpia"],
  authors: [{ name: "Neel Parpia", url: "https://github.com/CoderN-P" }],
  openGraph: {
    title: "Projects - Neel Parpia",
    description: "Explore Neel Parpia's portfolio of innovative projects including TRACER robotics platform, Stellar learning app, GPT-Kitbot, and more.",
    url: "/projects",
    siteName: "Neel Parpia Portfolio",
    images: [
      {
        url: "/projects/tracer-screenshot.png",
        width: 1200,
        height: 600,
        alt: "TRACER Project Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Neel Parpia",
    description: "Explore Neel Parpia's portfolio of innovative projects including TRACER robotics platform, Stellar learning app, GPT-Kitbot, and more.",
    images: ["/projects/tracer-screenshot.png"],
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

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
