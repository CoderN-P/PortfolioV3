"use client";
import {ContentHeading} from "@/app/types";

import { useEffect, useState } from 'react';

export default function TableOfContents({ headings } : { headings: ContentHeading[] }) {
    const [activeId, setActiveId] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // Get all heading elements
        const headingElements = headings.map(({ id }) =>
            document.getElementById(id)
        ).filter(Boolean);
        
        // Intersection Observer callback
        const callback = (entries: IntersectionObserverEntry[]) => {
            // Find the first visible heading
            const visibleHeadings = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (visibleHeadings.length > 0) {
                setActiveId(visibleHeadings[0].target.id);
            }
        };

        // Create observer with options
        const observer = new IntersectionObserver(callback, {
            rootMargin: '-100px 0px -66%',
            threshold: 0
        });

        // Observe all headings
        
        headingElements.forEach(element => {
            if (element) observer.observe(element)
        });
        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress();
        
        // Cleanup
        return () => {
            headingElements.forEach(element => {
                if (element) observer.unobserve(element)
            });
        };
    }, [headings]);

    const handleClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Adjust this value based on your header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const updateScrollProgress = () => {
        const article = document.getElementById('article-content');
        if (!article) return;

        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        // Calculate how far through the article we've scrolled
        const scrollStart = articleTop;
        const scrollEnd = articleTop + articleHeight - windowHeight;
        const progress = ((scrollY - scrollStart) / (scrollEnd - scrollStart)) * 100;

        setScrollProgress(Math.max(0, Math.min(100, progress)));
    };
    
    const scrollToHref = (id: string) => (e: React.MouseEvent) => {
        handleClick(e, id);
    };
    return (

        <div className="mr-6 h-min max-h-100 flex flex-col gap-1">
            <h1 className="text-black text-lg font-semibold">Table of Contents</h1>

            <div className="relative ">
                {/* Progress bar background - only spans the visible list height */}
                <div className="absolute left-0 top-0 w-0.5 bg-gray-200" style={{ height: '100%' }} />

                {/* Progress bar fill */}
                <div
                    className="absolute left-0 top-0 w-0.5 z-10 bg-blue-600 transition-all duration-150 ease-out"
                    style={{ height: `${scrollProgress}%` }}
                />

                <div className="flex flex-col overflow-scroll max-h-96 hide-scrollbar gap-2 mb-4 px-4">
                    {headings.map((item) => (
                        <button
                            key={item.id}
                            onClick={scrollToHref(item.id)}
                            className={`${activeId == item.id ? 'text-blue-500 hover:text-blue-400' : 'text-gray-700 hover:text-gray-900'} ${item.level == 1 ? 'font-semibold' : item.level == 2 ? 'font-medium' : '' } text-start text-sm`}
                            style={{ paddingLeft: `${(item.level - 1) * 16}px` }}>
                            {item.title}
                        </button>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 w-full ml-1 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>

            
        </div>
    );
}
    