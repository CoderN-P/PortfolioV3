import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import projectsData from "@/app/data/projects.json";
import skillsData from "@/app/data/skills.json";


interface Project {
  name: string;
  slug?: string;
  lastUpdated: string;
  description: string;
  tags: string[];
  colors: string;
  shortDescription: string;
  github?: string;
  link?: string;
  image?: string;
  featured?: boolean;
}

const projects: Project[] = projectsData as Project[];

// Import skills data to get tech icons

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

export default function WriteupsPage() {
  const projectsWithWriteups = projects.filter(p => p.slug && p.slug.trim() !== '');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-6xl font-bold mb-8 text-gray-900">Writeups</h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
        In-depth technical documentation and insights from my projects.
      </p>

      <div className="space-y-6">
        {projectsWithWriteups.map((project) => {
          const date = new Date(project.lastUpdated);
          const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          });
          
          return (
            <Link 
              key={project.slug}
              href={`/writeups/${project.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all p-8">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="font-bold text-2xl text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {project.name}
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.shortDescription}</p>
                    
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={16} />
                        <span className="text-sm">{formattedDate}</span>
                      </div>
                      <div className="flex gap-2">
                        {project.tags.slice(0, 4).map((tag: string) => {
                          const techInfo = getTechInfo(tag);
                          return (
                            <div 
                              key={tag}
                              className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full"
                            >
                              <Image 
                                src={techInfo.icon} 
                                alt={tag}
                                width={14}
                                height={14}
                                className="object-contain"
                              />
                              <span className="text-xs font-medium text-gray-700">{tag}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all mt-2 ml-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
