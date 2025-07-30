import Image from "next/image";
import type {Metadata} from "next";
import { Cpu, Globe, Bot, ArrowRight, Calendar } from "lucide-react";
import projectsData from "@/app/data/projects.json";
import skillsData from "@/app/data/skills.json";
import Link from "next/link";


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

// Import skills data to get tech icons like other pages

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

export const metadata: Metadata = {
  title: "Neel Parpia - High School Developer",
  description: "I'm a passionate high school developer specializing in AI, Web Development, Robotics, and innovative technology solutions. Explore my projects and skills.",
  keywords: ["Neel Parpia", "developer", "portfolio", "AI", "web development", "robotics", "high school developer", "programming", "software engineer"],
  authors: [{ name: "Neel Parpia", url: "https://github.com/CoderN-P" }],
  creator: "Neel Parpia",
  alternates: {
    canonical: "https://www.neelparpia.me",
  },
  openGraph: {
    title: "Neel Parpia - High School Developer",
    description: "I'm a passionate high school developer specializing in AI, Web Development, Robotics, and innovative technology solutions.",
    url: "https://www.neelparpia.me",
    siteName: "Neel Parpia Portfolio",
    images: [
      {
        url: "/codern_pfp.jpeg",
        width: 800,
        height: 800,
        alt: "Neel Parpia Profile Picture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neel Parpia - High School Developer",
    description: "I'm a passionate high school developer specializing in AI, Web Development, Robotics, and innovative technology solutions.",
    images: ["/codern_pfp.jpeg"],
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


export default function Home() {
  const featuredProjects = projects.filter(p => p.featured);
  const projectsWithWriteups = projects.filter(p => p.slug && p.slug.trim() !== '');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-24">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Neel Parpia
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            High School Developer
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
            Passionate about building innovative technology solutions in AI, web development, 
            and robotics that make a meaningful impact.
          </p>
          
          {/* Profile Image */}
          <div className="relative w-32 h-32 mx-auto mb-12">
            <Image
              src="/codern_pfp.jpeg"
              alt="Neel Parpia"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
          
          {/* Focus Areas */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-gray-600">
              <Cpu size={20} />
              <span className="font-medium">AI/ML</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Globe size={20} />
              <span className="font-medium">Web Dev</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Bot size={20} />
              <span className="font-medium">Robotics</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Link href="/projects" 
              className="px-6 py-3 bg-gray-900 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              View Projects
            </Link>
            <Link 
              href="/skills" 
              className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              Skills
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-20 border-t border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            A selection of my most impactful work across different domains.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featuredProjects.slice(0, 4).map((project) => (
            <div key={project.slug || project.name} className="group">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                {project.image && (
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.name} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag: string) => {
                      const techInfo = getTechInfo(tag);
                      return (
                        <div 
                          key={tag}
                          className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded text-xs text-gray-600"
                        >
                          <Image 
                            src={techInfo.icon} 
                            alt={tag}
                            width={12}
                            height={12}
                            className="object-contain"
                          />
                          <span>{tag}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.slug ? (
                      <a 
                        href={`/writeups/${project.slug}`} 
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read More →
                      </a>
                    ) : (
                      <a 
                        href="/projects" 
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/projects" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            View All Projects
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
      
      {/* Writeups Section */}
      {projectsWithWriteups.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Writeups</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              In-depth technical documentation and insights from my projects.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-4">
            {projectsWithWriteups.slice(0, 6).map((project) => {
              const date = new Date(project.lastUpdated);
              const formattedDate = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              });
              
              return (
                <a 
                  key={project.slug}
                  href={`/writeups/${project.slug}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">{project.shortDescription}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={12} />
                            <span>{formattedDate}</span>
                          </div>
                          <div className="flex gap-1">
                            {project.tags.slice(0, 2).map((tag: string) => {
                              const techInfo = getTechInfo(tag);
                              return (
                                <div key={tag} className="flex items-center gap-1">
                                  <Image 
                                    src={techInfo.icon} 
                                    alt={tag}
                                    width={12}
                                    height={12}
                                    className="object-contain"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all mt-1" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/writeups" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              View All Writeups
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}
      
      {/* Connect Section */}
      <section className="py-20 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Let&apos;s Connect</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-12">
            Always open to collaboration and new opportunities.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              href="https://github.com/CoderN-P" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              <Image src="/social/github.svg" alt="GitHub" width={16} height={16} />
              <span>GitHub</span>
            </Link>
            <Link 
              href="mailto:neel.parpia@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <Image src="/social/email-fill.svg" alt="Email" width={16} height={16} />
              <span>Email</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
