export default interface Project {
    name: string;
    slug: string;
    lastUpdated: string;
    description: string;
    shortDescription: string;
    tags: string[];
    colors: string;
    github?: string;
    link?: string;
    image?: string;
    featured?: boolean;
}
