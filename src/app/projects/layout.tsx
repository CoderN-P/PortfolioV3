import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Neel Parpia",
  description: "Explore my portfolio of  projects including TRACER, Stellar, GPT-Kitbot, and more",
  keywords: ["projects", "portfolio", "TRACER", "Stellar", "GPT-Kitbot", "robotics", "AI", "web development", "Neel Parpia"],
  authors: [{ name: "Neel Parpia", url: "https://github.com/CoderN-P" }],
  alternates: {
    canonical: "https://www.neelparpia.me/projects",
  },
  openGraph: {
    title: "Projects - Neel Parpia",
    description: "Explore my portfolio of projects including TRACER, Stellar, GPT-Kitbot, and more.",
    url: "https://www.neelparpia.me/projects",
    siteName: "Neel Parpia Portfolio",
    images: [
      {
        url: "/projects/TRACER.jpg",
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
    description: "Explore my portfolio of projects including TRACER, Stellar, GPT-Kitbot, and more.",
    images: ["/projects/TRACER.jpg"],
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
