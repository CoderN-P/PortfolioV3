"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar(){
    
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const links = [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'Skills', href: '/skills' },
        { name: 'Ideas', href: '/ideas' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Writeups', href: '/writeups' },
    ];

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const getLinkClassName = (href: string) => {
        const isActive = pathname === href || (href !== '/' && pathname.includes(href));
        return `hover:underline hover:text-gray-700 transition-all decoration-2 ${
            isActive ? "font-medium text-purple-500" : "text-gray-700"
        }`;
    };

    const getMobileLinkClassName = (href: string) => {
        const isActive = pathname === href || (href !== '/' && pathname.includes(href));
        return `block px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-50 ${
            isActive ? "text-purple-500 bg-purple-50" : "text-gray-700"
        }`;
    };

    return (
        <>
            <div className="w-full lg:max-w-[900px] z-50 mx-auto rounded-none lg:rounded-xl flex sticky top-0 lg:top-4 backdrop-blur-sm bg-white/30 border-b lg:border-none border-black/5 lg:ring-1 ring-black/5 flex-row justify-between items-center py-2 px-4">
                <a href={'/'}>
                    <Image src={"/codern_pfp.gif"} alt="Profile" className="w-8 h-8 hover:opacity-80 rounded-full" />
                </a>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-row gap-4 items-center">
                    <Link href="/skills" className={getLinkClassName('/skills')}>Skills</Link>
                    <Link href="/projects" className={getLinkClassName('/projects')}>Projects</Link>
                    <Link href="/writeups" className={getLinkClassName('/writeups')}>Writeups</Link>
                    <Link href="/ideas" className={getLinkClassName('/ideas')}>Ideas</Link>
                    <Link href="/gallery" className={getLinkClassName('/gallery')}>Gallery</Link>
                </div>

                {/* Social Links - Always visible */}
                <div className="flex flex-row gap-2 items-center">
                    <a href="https://github.com/CoderN-P">
                        <Image src={"/social/github.svg"} className={"w-6 h-6 md:w-8 md:h-8 hover:scale-110 transition-all"} alt="GitHub"/>
                    </a>
                    <a href="https://linkedin.com/in/neelparpia">
                        <Image src={"/social/linkedin.svg"} className={"w-5 h-5 md:w-6 md:h-6 rounded-md hover:scale-110 transition-all"}
                             alt="LinkedIn"/>
                    </a>
                    <a href="mailto:neel.parpia@gmail.com">
                        <Image src={"/social/email-fill.svg"} className={"w-7 h-7 md:w-9 md:h-9 rounded-md hover:scale-110 transition-all"}
                             alt="Email"/>
                    </a>
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 ml-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Fullscreen Menu */}
            <div className={`fixed inset-0 bg-white z-50 transform transition-all duration-500 ease-in-out md:hidden ${
                isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <div className="flex items-center gap-3">
                        <Image src={"/codern_pfp.gif"} alt="Profile" className="w-10 h-10 rounded-full" />
                        <h2 className="text-xl font-bold text-gray-900">Neel Parpia</h2>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close mobile menu"
                    >
                        <X className="w-7 h-7 text-gray-700" />
                    </button>
                </div>
                
                {/* Navigation Links */}
                <nav className="flex flex-col justify-center items-center h-full pb-32">
                    <div className="space-y-8">
                        {links.map((link, index) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`block text-center text-2xl md:text-3xl font-medium transition-all duration-300 hover:scale-105 transform ${
                                    getMobileLinkClassName(link.href).includes('text-purple-500') 
                                        ? 'text-purple-500' 
                                        : 'text-gray-700 hover:text-purple-500'
                                }`}
                                style={{
                                    animationDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms'
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </nav>

                {/* Footer with tagline */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center border-t bg-gray-50">
                    <p className="text-sm text-gray-600 mb-2">Building the future, one project at a time</p>
                    <div className="flex justify-center gap-6">
                        <a href="https://github.com/CoderN-P" className="text-gray-500 hover:text-gray-700 transition-colors">
                            <Image src={"/social/github.svg"} className="w-6 h-6" alt="GitHub"/>
                        </a>
                        <a href="https://linkedin.com/in/neelparpia" className="text-gray-500 hover:text-gray-700 transition-colors">
                            <Image src={"/social/linkedin.svg"} className="w-6 h-6" alt="LinkedIn"/>
                        </a>
                        <a href="mailto:neel.parpia@gmail.com" className="text-gray-500 hover:text-gray-700 transition-colors">
                            <Image src={"/social/email-fill.svg"} className="w-6 h-6" alt="Email"/>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}