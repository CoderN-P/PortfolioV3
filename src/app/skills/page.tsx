import type { Metadata } from 'next';
import SkillsClient from './SkillsClient';
import { skillCategories } from "@/app/data";


export const metadata: Metadata = {
  title: 'Skills & Technologies | Neel Parpia',
  description: 'Technologies and tools I use to build projects and solve problems.',
  keywords: ['skills', 'technologies', 'programming', 'web development', 'AI', 'robotics'],
  authors: [{ name: 'Neel Parpia' }],
  creator: 'Neel Parpia',
  publisher: 'Neel Parpia',
  alternates: {
    canonical: 'https://www.neelparpia.me/skills',
  },
  openGraph: {
    title: 'Skills & Technologies | Neel Parpia',
    description: 'Technologies and tools I use to build projects and solve problems.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Neel Parpia\' Portfolio',
    url: 'https://www.neelparpia.me/skills',
  },
  twitter: {
    card: 'summary',
    title: 'Skills & Technologies | Neel Parpia',
    description: 'Technologies and tools I use to build projects and solve problems.',
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

export default function Skills() {
  // Transform skills data on server

  return <SkillsClient initialCategories={skillCategories} />;
}