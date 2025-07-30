import type { Metadata } from 'next';
import projectsJson from "@/app/data/projects.json";
import ProjectsClient from './ProjectsClient';

interface Project {
  name: string;
  slug?: string;
  lastUpdated: string;
  description?: string;
  shortDescription?: string;
  tags: string[];
  colors?: string;
  github?: string | null;
  link?: string | null;
  image?: string;
  featured?: boolean;
}

export const metadata: Metadata = {
  title: 'Projects | Neel Parpia',
  description: 'A collection of projects I\'ve built, ranging from web applications to AI tools and robotics systems.',
  keywords: ['projects', 'web development', 'AI', 'robotics', 'software engineering', 'programming'],
  authors: [{ name: 'Neel Parpia' }],
  creator: 'Neel Parpia',
  publisher: 'Neel Parpia',
  alternates: {
    canonical: 'https://www.neelparpia.me/projects',
  },
  openGraph: {
    title: 'Projects | Neel Parpia',
    description: 'A collection of projects I\'ve built, ranging from web applications to AI tools and robotics systems.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Neel Parpia Portfolio',
    url: 'https://www.neelparpia.me/projects',
  },
  twitter: {
    card: 'summary',
    title: 'Projects | Neel Parpia',
    description: 'A collection of projects I\'ve built, ranging from web applications to AI tools and robotics systems.',
    creator: '@neelparpia',
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

// Type assertion to make TypeScript happy with the imported JSON
const projectsData = projectsJson as Project[];

export default function Projects() {
  return <ProjectsClient projects={projectsData} />;
}