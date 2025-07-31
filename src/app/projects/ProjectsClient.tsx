"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/app/components/ProjectCard";
import { Search, X } from "lucide-react";
import Image from "next/image";
import skillsData from "@/app/data/skills.json";

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

interface ProjectsClientProps {
  projects: Project[];
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

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Extract all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  // Filter projects based on search term and selected tags
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === "" || 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(selectedTag => project.tags.includes(selectedTag));
      
      return matchesSearch && matchesTags;
    });
  }, [projects, searchTerm, selectedTags]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  const hasActiveFilters = searchTerm !== "" || selectedTags.length > 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-6xl font-bold mb-8">Projects</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
          A collection of projects I&apos;ve built, ranging from web applications to AI tools and robotics systems.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Technology Filter Buttons */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filter by Technology</h3>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Clear all tags ({selectedTags.length})
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => {
              const techInfo = getTechInfo(tag);
              const isSelected = selectedTags.includes(tag);
              
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                    isSelected 
                      ? 'bg-white text-gray-700 border-blue-600 shadow-md' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <Image
                    src={techInfo.icon}
                    alt={tag}
                    width={12}
                    height={12}
                    className="object-contain"
                  />
                  <span className="text-xs font-medium">{tag}</span>
                  {isSelected && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
          {selectedTags.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              Showing projects that contain <strong>all</strong> selected technologies ({selectedTags.length} selected)
            </div>
          )}
        </div>

        {/* Active Filters and Clear Button */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Search: &quot;{searchTerm}&quot;
              </span>
            )}
            {selectedTags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {tag}
                <button
                  onClick={() => toggleTag(tag)}
                  className="hover:text-green-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearFilters}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-6">
          {filteredProjects.length} of {projects.length} projects
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.name}
              name={project.name}
              slug={project.slug}
              shortDescription={project.shortDescription || ""}
              description={project.description}
              tags={project.tags}
              github={project.github}
              link={project.link}
              image={project.image}
              lastUpdated={project.lastUpdated}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or clearing the filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
