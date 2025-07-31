import { MetadataRoute } from 'next'

import projects from './data/projects.json'


export default function sitemap(): MetadataRoute.Sitemap {
    // Base URL for your site
    const baseUrl = 'https://www.neelparpia.me'

    // Get current date for static pages that don't have specific update times
    const currentDate = new Date().toISOString()

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            priority: 1.0
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: currentDate,
            priority: 0.9
        },
        {
            url: `${baseUrl}/skills`,
            lastModified: currentDate,
            priority: 0.8
        },
        {
            url: `${baseUrl}/ideas`,
            lastModified: currentDate,
            priority: 0.7
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: currentDate,
            priority: 0.7
        },
        {
            url: `${baseUrl}/writeups`,
            lastModified: currentDate,
            priority: 0.9
        },
    ]

    // Filter projects to only include those with slugs (valid writeup pages)
    const writeupPages = projects
        .filter((project) => project.slug)
        .map((project) => ({
            url: `${baseUrl}/writeups/${project.slug}`,
            lastModified: project.lastUpdated,
            priority: project.featured ? 0.8 : 0.6
        }))

    // Combine static and dynamic pages
    return [...staticPages, ...writeupPages]
}