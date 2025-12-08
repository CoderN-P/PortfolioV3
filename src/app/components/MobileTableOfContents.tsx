"use client";
import {ContentHeading} from "@/app/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from 'react';

export default function MobileTableOfContents({ headings } : { headings: ContentHeading[] }) {
    const [activeId, setActiveId] = useState('');
    const [expanded, setExpanded] = useState(false);
    // const [scrollProgress, setScrollProgress] = useState(0);

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
        // window.addEventListener('scroll', updateScrollProgress);
        // updateScrollProgress();

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
    /*
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
    };*/

    const scrollToHref = (id: string) => (e: React.MouseEvent) => {
        handleClick(e, id);
    };
    return (
        <div className={`w-full lg:max-w-[900px] relative max-h-60 overflow-scroll hide-scrollbar z-40 mx-auto rounded-none lg:rounded-xl flex sticky top-13 lg:top-4 ${expanded ? 'bg-white' : 'backdrop-blur-sm bg-white/30'} border-y lg:border-none border-black/5 lg:ring-1 ring-black/5  flex flex-col gap-2`}>
            <div className={`flex-row px-4 py-2 justify-between sticky top-0 items-center  w-full flex ${expanded ? 'border-b bg-white border-gray-200' : ''}`}>
                <p className="font-semibold text-black">Contents</p>
                {expanded ? 
                    <ChevronUp className="h-5 w-5 text-gray-600 cursor-pointer" onClick={() => setExpanded(!expanded)} /> :
                    <ChevronDown className="h-5 w-5 text-gray-600 cursor-pointer" onClick={() => setExpanded(!expanded)} />
                }
            </div>
            {expanded && (
                <div className="flex flex-col gap-2 px-6 ">
                    {headings.map((heading) => (
                        <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                scrollToHref(heading.id)(e);
                                setExpanded(false);
                            }}
                            className={`block ${heading.level == 1 ? 'font-semibold' : heading.level == 2 ? 'font-medium' : '' }  px-4 py-2 rounded-md  ${
                                activeId === heading.id ? `text-blue-500 hover:text-blue-400` : 'hover:text-gray-900 text-gray-700 '
                            }`}
                            style={{ paddingLeft: `${(heading.level - 1) * 16 + 16}px` }}
                        >
                            {heading.title}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
    