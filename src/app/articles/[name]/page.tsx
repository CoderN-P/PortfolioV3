import { pageToArticle } from "@/app/components/articles";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import { articles } from "@/app/data";

// Define the params type for generateMetadata and page function
type Props = {
    params: Promise<{
        name: string;
    }>
}

// Generate metadata for the page
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // Find the project data
    const { name } = await params;
    const article = articles.find((p) => p.slug === name);

    // Return 404 if project doesn't exist
    if (!article) {
        return {};
    }

    // Get the base metadata from parent
    const previousImages = (await parent).openGraph?.images || [];

    const url = `https://www.neelparpia.me/articles/${article.slug}`;

    return {
        title: `${article.name} | Neel Parpia`,
        description: article.shortDescription,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: article.name,
            description: article.shortDescription,
            type: "article",
            url,
            siteName: "Neel Parpia's Portfolio",
            authors: ["Neel Parpia"],
            publishedTime: article.lastUpdated,
            modifiedTime: article.lastUpdated,
            tags: article.tags,
            images: article.image
                ? [article.image, ...previousImages]
                : previousImages,
        },
        twitter: {
            card: "summary_large_image",
            title: article.name,
            description: article.shortDescription,
            creator: "@neelparpia",
            images: article.image ? [article.image] : [],
        },
        keywords: article.tags,
        robots: {
            index: true,
            follow: true,
        },
        category: "technology",
        other: {
            "article:author": "Neel Parpia",
            "article:published_time": article.lastUpdated,
        },
    };
}

// Generate static params for all article
export async function generateStaticParams() {
    // filter articles to only include those with a slug
    const filteredArticles = articles.filter((project) => project.slug);
    return filteredArticles.map((article) => ({
        name: article.slug,
    }));
}


export default async function ArticlePage({ params }: Props) {
    const { name } = await params;

    // Check if the project exists and has a corresponding component
    if (!name || !pageToArticle[name] || !articles.find((p) => p.slug === name)) {
        notFound();
    }

    const article = articles.find((p) => p.slug === name)!;

    // Get Month Name, Day, Year from Date
    const date = new Date(article.lastUpdated);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const ArticleComponent = pageToArticle[name];

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-16">
                <h1 className="text-6xl font-bold mt-8 mb-8 text-gray-900 leading-tight">{article.name}</h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl">
                    {article.shortDescription}
                </p>
               

                {/* Metadata and Actions */}
                <div className="space-y-6 py-8 border-y border-gray-200">
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Calendar className="h-5 w-5" />
                            <span className="font-medium text-lg">{formattedDate}</span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 max-w-full">
                        {article.tags.map((tag: string, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all px-3 py-1.5 rounded-full group"
                                >
                                    <span className="text-xs font-medium text-gray-700">{tag}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mdx-content prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-strong:text-gray-900">
                <ArticleComponent />
            </div>

            {/* Bottom padding for better spacing */}
            <div className="h-24"></div>
        </div>
    );
}