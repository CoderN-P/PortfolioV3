'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import projects from "@/app/data/projects.json";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    // Set hydration state once component is mounted
    setIsHydrated(true);
  }, []);
  
  // Only generate items once hydrated to avoid mismatch between server and client
  const items = [{ label: 'Home', href: '/' }];
  
  if (pathname === '/projects') {
    items.push({ label: 'Projects', href: '/projects' });
  }
  if (pathname === '/skills') {
    items.push({ label: 'Skills', href: '/skills' });
  }
  if (pathname === '/ideas') {
      items.push({ label: 'Ideas', href: '/ideas' });
  }
  if (pathname === '/gallery') {
      items.push({ label: 'Gallery', href: '/gallery' });
  }
  if (pathname && pathname.includes('/writeups')) {
    items.push({ label: 'Writeups', href: '/writeups' });
    
    const writeupName = pathname.split('/').pop();
    
    const project = projects.find((project) => project.slug === writeupName);
    if (project) {
      items.push({ label: project.name, href: pathname });
    }
  }
  
  // Skeleton loader for non-hydrated state
  if (!isHydrated) {
    return (
      <nav className="flex flex-row gap-2 text-sm" aria-label="Breadcrumb">
        <div className="flex flex-row items-center gap-4 shrink-0">
          <div className="h-4 w-10 bg-gray-200 rounded-md animate-pulse"></div>
          <ChevronRight className="h-4 w-4 text-gray-200" />
        </div>
        
        <div className="flex flex-row items-center gap-4">
          <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse"></div>
          <ChevronRight className="h-4 w-4 text-gray-200" />
        </div>
        
        <div className="flex flex-row items-center gap-4">
          <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </nav>
    );
  }
  
  return (
    <nav className="flex flex-row gap-2 text-sm" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className={index === items.length - 1 ? 'text-black items-center font-medium flex flex-row gap-4' : 'hover:text-black items-center text-gray-600 flex flex-row gap-4'}>
          {item.href ? (
            <a href={item.href}>
              {item.label}
            </a>
          ) : (
            <p>{item.label}</p>
          )}
          {index < items.length - 1 && <ChevronRight className="h-4 w-4 text-gray-500" />}
        </div>
      ))}
    </nav>
  );
}