"use client";

import Image from 'next/image';
import { useState } from 'react';

interface Skill {
  name: string;
  color: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface SkillsClientProps {
  initialCategories: SkillCategory[];
}

export default function SkillsClient({ initialCategories }: SkillsClientProps) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  // Filter skills by category if filter is set
  const filteredCategories = filter 
    ? initialCategories.filter(category => category.name === filter) 
    : initialCategories;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-6xl font-bold mb-8">Skills</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
          Technologies and tools I use to build projects and solve problems.
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="mb-16">
        <div className="flex flex-wrap gap-3">
          <button 
            aria-label="Show all skills"
            onClick={() => {
              setFilter(null);
              setIsFiltering(false);
            }}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${!isFiltering 
              ? 'bg-gray-800 text-white' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            All Skills
          </button>
          
          {initialCategories.map((category) => (
            <button 
              aria-label={`Filter skills by ${category.name}`}
              key={category.name}
              onClick={() => {
                setFilter(category.name);
                setIsFiltering(true);
              }}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${isFiltering && filter === category.name
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-20">
        {filteredCategories.map((category) => (
          <div key={category.name}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 pb-4">{category.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.skills.map((skill) => (
                <div 
                  key={`${category.name}-${skill.name}`}
                  className="relative flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl hover:bg-gray-100 border border-gray-200 transition-all"
                  onMouseEnter={() => setShowTooltip(`${category.name}-${skill.name}`)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  {/* Clean icon container without color background */}
                  <div className="relative w-14 h-14 flex items-center justify-center mb-4">
                    {/* Icon */}
                    <div className="w-8 h-8 relative">
                      <Image 
                        src={skill.icon} 
                        alt={skill.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  <span className="text-sm font-medium text-center">{skill.name}</span>
                  
                  {/* Tooltip */}
                  {showTooltip === `${category.name}-${skill.name}` && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 text-white text-xs rounded py-1 px-2 pointer-events-none z-10 whitespace-nowrap">
                      {skill.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
