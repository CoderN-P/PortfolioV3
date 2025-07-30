import { pageToComponent } from "@/app/components/writeups";
import projects from "@/app/data/projects.json";
import { notFound } from "next/navigation";
import { Calendar, Github } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import skillsData from "@/app/data/skills.json";


// Import skills data to get tech icons

// Define Project interface
interface Project {
  name: string;
  slug: string;
  lastUpdated: string;
  description: string;
  shortDescription: string;
  tags: string[];
  colors: string;
  github?: string;
  link?: string;
  image?: string;
  featured?: boolean;
}

// Create a flattened map of all technologies and their icons from skills.json
const createTechIconMap = () => {
  const iconMap: Record<string, { icon: string, color: string }> = {};
  
  Object.entries(skillsData).forEach(([, skills]) => {
    const typedSkills = skills as [string, string, string][];
    
    typedSkills.forEach((skill) => {
      const [name, bgColor, iconPath] = skill;
      iconMap[name.toLowerCase()] = { 
        icon: iconPath,
        color: bgColor
      };
    });
  });
  
  return iconMap;
};

const TECH_ICON_MAP = createTechIconMap();

// Get icon and color for a technology or return defaults if not found
const getTechInfo = (tech: string): { icon: string, color: string } => {
  const normalizedTech = tech.toLowerCase();
  return TECH_ICON_MAP[normalizedTech] || { 
    icon: '/tech-icons/code.svg',
    color: 'bg-gray-400'
  };
};

// Define the params type for generateMetadata and page function
type Props = {
  params: Promise<{
    name: string;
  }>
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Find the project data
  const { name } = await params;
  const project = (projects as Project[]).find((p) => p.slug === name);
  
  // Return 404 if project doesn't exist
  if (!project) {
    return {};
  }

  // Get the base metadata from parent
  const previousImages = (await parent).openGraph?.images || [];
  let ogImageUrl: string;
  
  if (project.image) {
    ogImageUrl = new URL(
        `/api/og?name=${encodeURIComponent(project.name)}&desc=${encodeURIComponent(project.shortDescription)}&tags=${encodeURIComponent(project.tags.join(","))}&image=${encodeURIComponent(project.image)}&v=${encodeURIComponent(project.lastUpdated)}`,
        process.env.SITE_URL || "https://www.neelparpia.me"
    ).toString();
  } else {
    ogImageUrl = new URL(
        `/api/og?name=${encodeURIComponent(project.name)}&desc=${encodeURIComponent(project.shortDescription)}&tags=${encodeURIComponent(project.tags.join(","))}&v=${encodeURIComponent(project.lastUpdated)}`,
        process.env.SITE_URL || "https://www.neelparpia.me"
    ).toString();
  }
  
  const url = `https://www.neelparpia.me/writeups/${project.slug}`;
  
  return {
    title: `${project.name} | Neel Parpia`,
    description: project.shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: project.name,
      description: project.shortDescription,
      type: "article",
      url,
      siteName: "Neel Parpia Portfolio",
      authors: ["Neel Parpia"],
      publishedTime: project.lastUpdated,
      modifiedTime: project.lastUpdated,
      tags: project.tags,
      images: ogImageUrl
        ? [ogImageUrl, ...previousImages]
        : previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.shortDescription,
      creator: "@neelparpia",
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    keywords: project.tags,
    robots: {
      index: true, 
      follow: true,
    },
    category: "technology",
    other: {
      "article:author": "Neel Parpia",
      "article:published_time": project.lastUpdated,
    },
  };
}

// Generate static params for all projects
export async function generateStaticParams() {
  // filter projects to only include those with a slug
    const filteredProjects = (projects as Project[]).filter((project) => project.slug);
  return (filteredProjects as Project[]).map((project) => ({
    name: project.slug,
  }));
}


export default async function WriteupPage({ params }: Props) {
  const { name } = await params;
  
  // Check if the project exists and has a corresponding component
  if (!name || !pageToComponent[name] || !(projects as Project[]).find((p) => p.slug === name)) {
    notFound();
  }
  
  const project = (projects as Project[]).find((p) => p.slug === name)!;
  
  // Get Month Name, Day, Year from Date
  const date = new Date(project.lastUpdated);
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  const WriteupComponent = pageToComponent[name];
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-16">
        <h1 className="text-6xl font-bold mt-8 mb-8 text-gray-900 leading-tight">{project.name}</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl">
          {project.shortDescription}
        </p>
        
        {/* Project Image */}
        {project.image && (
          <div className="mb-12">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <Image 
                src={project.image} 
                alt={`${project.name} project screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            </div>
          </div>
        )}
        
        {/* Metadata and Actions */}
        <div className="space-y-6 py-8 border-y border-gray-200">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span className="font-medium text-lg">{formattedDate}</span>
            </div>
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-lg">View Source</span>
              </a>
            )}
          </div>
          
          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 max-w-full">
            {project.tags.map((tag: string, index: number) => {
              const techInfo = getTechInfo(tag);
              return (
                <div 
                  key={index}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all px-3 py-1.5 rounded-full group"
                >
                  <div className="w-4 h-4 relative group-hover:scale-110 transition-transform">
                    <Image 
                      src={techInfo.icon} 
                      alt={tag}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{tag}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mdx-content prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-strong:text-gray-900">
        <WriteupComponent />
      </div>
      
      {/* Bottom padding for better spacing */}
      <div className="h-24"></div>
    </div>
  );
}