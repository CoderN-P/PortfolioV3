import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, Calendar, ArrowRight, Star, Badge } from "lucide-react";
import skillsData from "@/app/data/skills.json";

// Import skills data with a type cast to ensure proper typing


// Create a flattened map of all technologies and their icons from skills.json
const createTechIconMap = () => {
  const iconMap: Record<string, { icon: string, color: string }> = {};
  
  Object.entries(skillsData).forEach(([category, skills]) => {
    // Cast the skills array to the expected type to handle the parsing safely
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

// Generate a fallback image for projects without images
const getProjectImageFallback = (projectName: string, colors: string): string => {
  // Extract color values from the gradient string (from-color-xxx to-color-xxx)
  const fromColor = colors.split(' ')[0].replace('from-', '');
  const toColor = colors.split(' ')[1].replace('to-', '');
  
  // Return a data URL for an SVG with a gradient background and project initials
  const initials = projectName
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
    
  return `/api/project-image?name=${encodeURIComponent(initials)}&from=${fromColor}&to=${toColor}`;
};

interface ProjectCardProps {
  name: string;
  slug: string;
  shortDescription: string;
  description?: string;
  tags: string[];
  colors: string;
  github?: string | null;
  link?: string | null;
  image?: string;
  lastUpdated?: string;
  featured?: boolean;
}

export default function ProjectCard({
  name,
  slug,
  shortDescription,
  description,
  tags,
  colors,
  github,
  link,
  image,
  lastUpdated,
  featured = false,
}: ProjectCardProps) {
  // Format the date if available
  const formattedDate = lastUpdated 
    ? new Date(lastUpdated).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) 
    : null;
  
  // Check if there's a writeup available
  const hasWriteup = slug && slug.trim().length > 0;
  
  // Determine image source
  const imageSource = (image && image !== "..." && image !== "")
    ? image
    : getProjectImageFallback(name, colors);
  
  return (
      <div className="w-full mb-24 relative">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 text-gray-800">
            {name}
          </h2>
          <p className="text-xl font-medium text-gray-600 max-w-2xl">
            {shortDescription}
          </p>
        </div>
        {/* Full Width Image Section with subtle border */}
        <div className="relative w-full mb-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
                src={imageSource}
                alt={`${name} project screenshot`}
                priority
                fill
                className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </div>

        {/* Project Title & Links Section - Moved below the image */}
        <div className="w-full mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex gap-3">
              {github && (
                  <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2.5 rounded-lg text-gray-800"
                      aria-label={`GitHub repository for ${name}`}
                  >
                    <Github size={18}/>
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
              )}

              {link && (
                  <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2.5 rounded-lg text-gray-800"
                      aria-label={`Live demo for ${name}`}
                  >
                    <ExternalLink size={18}/>
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
              )}

              {hasWriteup && (
                  <Link
                      href={`/writeups/${slug}`}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors`}
                  >
                    <span>View Writeup</span>
                    <ArrowRight size={16}/>
                  </Link>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {/* Description */}
          <div>
            {description && description.trim().length > 0 && (
                <div className="prose prose-gray max-w-none text-gray-700 text-lg leading-relaxed">
                  <p>{description}</p>
                </div>
            )}

            {formattedDate && (
                <div className="flex items-center text-gray-500 text-sm mt-6">
                  <Calendar size={16} className="mr-1.5"/>
                  <span>Last updated: {formattedDate}</span>
                </div>
            )}
          </div>

          {/* Technologies Section - Full width */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center gap-1.5">
              <Badge size={16}/> Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const techInfo = getTechInfo(tag);

                return (
                    <div
                        key={tag}
                        className="flex items-center px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all"
                        title={tag}
                    >
                      <Image
                          src={techInfo.icon}
                          alt={tag}
                          width={12}
                          height={12}
                          className="mr-2"
                      />
                      <span className="text-xs text-gray-800 font-medium whitespace-nowrap">
                    {tag}
                  </span>
                    </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Separator - More subtle */}
        <div className="h-px w-full mt-12 bg-gray-200 mx-auto"></div>
      </div>
  );
}
