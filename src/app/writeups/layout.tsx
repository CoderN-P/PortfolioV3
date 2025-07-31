import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writeups | Neel Parpia",
  description: "Read detailed writeups and technical documentation for my projects including TRACER robotics platform, GPT-Kitbot, and other innovative solutions.",
  keywords: ["writeups", "documentation", "technical articles", "project details", "TRACER", "GPT-Kitbot", "Neel Parpia"],
  authors: [{ name: "Neel Parpia", url: "https://github.com/CoderN-P" }],
  alternates: {
    canonical: "https://www.neelparpia.me/writeups",
  },
  openGraph: {
    title: "Writeups | Neel Parpia",
    description: "Read detailed writeups and technical documentation for my projects including TRACER robotics platform, GPT-Kitbot, and other innovative solutions.",
    url: "https://www.neelparpia.me/writeups",
    siteName: "Neel Parpia's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writeups | Neel Parpia",
    description: "Read detailed writeups and technical documentation for my projects including TRACER robotics platform, GPT-Kitbot, and other innovative solutions.",
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

export default function WriteupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
