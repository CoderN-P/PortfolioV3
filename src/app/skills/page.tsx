"use client";

import Image from 'next/image';
import skills from '@/app/data/skills.json';
import { useEffect, useState } from 'react';

interface Skill {
  name: string;
  color: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

export default function Skills() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    // Transform skills data into a more usable format
    const transformedCategories = Object.entries(skills).map(([categoryName, skillsList]) => {
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
    
    setCategories(transformedCategories);
  }, []);

  // Filter skills by category if filter is set
  const filteredCategories = filter 
    ? categories.filter(category => category.name === filter) 
    : categories;

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
          
          {categories.map((category) => (
            <button 
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
            <h2 className="text-2xl font-bold mb-4 text-gray-800  pb-4">{category.name}</h2>
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
                      <div className="relative z-10">
                        <Image 
                          src={skill.icon} 
                          alt={skill.name}
                          width={32}
                          height={32}
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