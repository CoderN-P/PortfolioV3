"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/app/components/ProjectCard";
import { Search, Filter } from "lucide-react";
import projectsJson from "@/app/data/projects.json";

interface Project {
  name: string;
  slug: string;
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

// Type assertion to make TypeScript happy with the imported JSON
const projectsData = projectsJson as Project[];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Extract all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projectsData.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter projects based on search term and selected tag
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = 
        searchTerm === "" || 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.shortDescription && project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = 
        selectedTag === null || 
        project.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-20">
        <h1 className="text-6xl font-bold mb-8">Projects</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
          Everything I&apos;ve built, from small experiments to full-fledged applications. Explore my projects to see the technologies I work with and the problems I solve.
        </p>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-5 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 w-full border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>
          
          <div className="relative md:min-w-[280px]">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedTag || ""}
              onChange={(e) => setSelectedTag(e.target.value || null)}
              className="pl-12 pr-4 py-4 w-full appearance-none border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="">All Technologies</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Tag Pills */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === null
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          
          {allTags.slice(0, 12).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <div className="space-y-4">
          {filteredProjects.map((project: Project) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              slug={project.slug}
              shortDescription={project.shortDescription || ""}
              description={project.description}
              tags={project.tags}
              colors={project.colors || "from-blue-500 to-purple-500"}
              github={project.github}
              link={project.link}
              image={project.image}
              lastUpdated={project.lastUpdated}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-xl text-gray-500 mb-3">No projects found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setSelectedTag(null);
            }}
            className="mt-4 px-6 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}