import type { Metadata } from 'next';
import skills from '@/app/data/skills.json';
import SkillsClient from './SkillsClient';

interface Skill {
  name: string;
  color: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

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
  const categories: SkillCategory[] = Object.entries(skills).map(([categoryName, skillsList]) => {
    const transformedSkills = skillsList.map((skill) => ({
      name: skill[0],
      color: skill[1],
      icon: skill[2]
    }));
    
    return {
      name: categoryName,
      skills: transformedSkills
    };
  });

  return <SkillsClient initialCategories={categories} />;
}