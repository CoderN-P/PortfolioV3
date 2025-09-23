import type { Metadata } from "next";
import { projects, articles } from "@/app/data";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Neel Parpia - High School Developer",
  description:
    "I'm a passionate high school developer specializing in AI, Web Development, Robotics, and innovative technology solutions. Explore my projects and skills.",
  keywords: [
    "Neel Parpia",
    "developer",
    "portfolio",
    "AI",
    "web development",
    "robotics",
    "high school developer",
    "programming",
    "software engineer",
  ],
  authors: [{ name: "Neel Parpia", url: "https://github.com/CoderN-P" }],
  creator: "Neel Parpia",
  alternates: {
    canonical: "https://www.neelparpia.me",
  },
  openGraph: {
    title: "Neel Parpia - High School Developer",
    description:
      "I'm a passionate high school developer specializing in AI, Web Development, Robotics, and innovative technology solutions.",
    url: "https://www.neelparpia.me",
    siteName: "Neel Parpia\'s Portfolio",
    images: [
      {
        url: "/codern_pfp.jpeg",
        width: 800,
        height: 800,
        alt: "Neel Parpia Profile Picture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neel Parpia - High School Developer",
    description:
      "I'm a passionate high school developer specializing in AI, Web Development, Robotics, and innovative technology solutions.",
    images: ["/codern_pfp.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  const combinedItems = [...projects.map(item => ({ ...item, type: 'project' })), 
                         ...articles.map(item => ({ ...item, type: 'article' }))];
  
  combinedItems.sort((a, b) => b.importance - a.importance);

  return (
      <div className="lg:border-t border-gray-200 w-full">
          <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 p-2">
            <Link href={`/${combinedItems[0].type === "project" ? 'writeups' : 'articles'}/${combinedItems[0].slug}`} className="md:col-span-4 lg:col-span-4 pl-4 group">
              <div className="mb-0 mt-4 md:my-4 pr-4 flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full ">
                  <p className="uppercase  text-sm font-semibold">{combinedItems[0].type} &bull; <span className="text-gray-700">{new Date(combinedItems[0].lastUpdated).toLocaleDateString()}</span></p>
                  <p className="text-3xl md:text-2xl lg:text-3xl font-bold mb-4 transition decoration-2 group-hover:underline">{combinedItems[0].name}</p>
                  <p className="text-sm md:text-xs lg:text-sm  text-gray-700 mb-6">{combinedItems[0].description}</p>
                </div>
              </div>
            </Link>
            
            <div className="md:row-span-2 md:col-span-4 lg:col-span-6 flex items-center border-b border-gray-200 md:border-0 flex-col h-full  pt-0 px-4 pb-4 md:p-4 ">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image fill src={combinedItems[0].image || "/default_project_image.png"} alt={combinedItems[0].name} className="object-cover"/>
              </div>
            </div>

            <Link href={`/${combinedItems[0].type === "project" ? 'writeups' : 'articles'}/${combinedItems[5].slug}`} className=" group flex-col lg:flex hidden  lg:col-span-2 lg:row-span-2 ">
              <div className="my-4 pl-4 h-full border-l border-gray-200">
                <p className="uppercase  text-sm font-semibold">{combinedItems[5].type} &bull; <span className="text-gray-700">{new Date(combinedItems[5].lastUpdated).toLocaleDateString()}</span></p>
                <p className="decoration-2 group-hover:underline text-3xl font-bold mb-4">{combinedItems[5].name}</p>
                <p className="text-gray-700 mb-6 text-sm">{combinedItems[5].description}</p>
              </div>
            </Link>

            <Link href={`/${combinedItems[2].type === "project" ? 'writeups' : 'articles'}/${combinedItems[2].slug}`} className="flex px-4 flex-col md:col-span-4 md:border-t group border-gray-200">
              <div className="mt-4">
                <p className="uppercase  text-sm font-semibold">{combinedItems[2].type} &bull; <span className="text-gray-700">{new Date(combinedItems[2].lastUpdated).toLocaleDateString()}</span></p>
                <p className="decoration-2 group-hover:underline text-3xl md:text-2xl lg:text-3xl font-bold mb-4">{combinedItems[2].name}</p>
                <p className="text-sm md:text-xs lg:text-sm text-gray-700 mb-6">{combinedItems[2].description}</p>
              </div>
            </Link>

            <Link href={`/${combinedItems[4].type === "project" ? 'writeups' : 'articles'}/${combinedItems[4].slug}`} className="md:col-span-2 lg:col-span-3 md:row-span-2 group p-4 border-t border-gray-200 flex flex-col ">
              <p className="uppercase  text-sm font-semibold">{combinedItems[4].type} &bull; <span className="text-gray-700">{new Date(combinedItems[4].lastUpdated).toLocaleDateString()}</span></p>
              <p className="group-hover:underline decoration-2 md:text-2xl text-3xl lg:text-3xl font-bold mb-4">{combinedItems[4].name}</p>
              <p className="text-sm md:text-xs lg:text-sm text-gray-700 mb-6">{combinedItems[4].description}</p>
              <div className="md:flex flex-col justify-center h-full hidden ">
                <div className="relative w-full rounded-lg h-full overflow-hidden border border-gray-200">
                  <Image fill src={combinedItems[4].image || "/default_project_image.png"} alt={combinedItems[4].name} className="object-cover"/>
                </div>
              </div>
            </Link>
            

            <Link href={`/${combinedItems[1].type === "project" ? 'writeups' : 'articles'}/${combinedItems[1].slug}`} className="md:col-span-6 lg:col-span-9 border-t group border-gray-200 ">
              <div className="mt-4 pb-4 md:border-l px-4 border-gray-200 flex flex-col md:flex-row gap-8">
                <div className="flex flex-col">
                  <p className="uppercase  text-sm font-semibold">{combinedItems[1].type} &bull; <span className="text-gray-700">{new Date(combinedItems[1].lastUpdated).toLocaleDateString()}</span></p>
                  <p className="group-hover:underline decoration-2 text-3xl md:text-2xl lg:text-3xl font-bold mb-4">{combinedItems[1].name}</p>
                  <p className="text-sm md:text-xs lg:text-sm text-gray-700 mb-6">{combinedItems[1].description}</p>
                </div>
                <div className="w-full md:w-1/3 relative rounded-lg overflow-hidden">
                  <Image fill src={combinedItems[1].image || "/default_project_image.png"} alt={combinedItems[1].name} className="object-cover"/>
                </div>
              </div>
            </Link>
            

            <Link href={`/${combinedItems[3].type === "project" ? 'writeups' : 'articles'}/${combinedItems[3].slug}`} className="md:col-span-6 lg:col-span-9 group md:border-l border-gray-200">
              <div className=" mx-4 pb-4 mt-4 md:mt-0 pt-4 border-gray-200 border-t flex flex-col md:flex-row gap-6">
                <div className="flex flex-col w-full md:w-2/3">
                  <p className="uppercase  text-sm font-semibold">{combinedItems[3].type} &bull; <span className="text-gray-700">{new Date(combinedItems[3].lastUpdated).toLocaleDateString()}</span></p>
                  <p className="md:text-2xl text-3xl lg:text-3xl font-bold mb-4 transition decoration-2 group-hover:underline">{combinedItems[3].name}</p>
                  <p className="text-sm md:text-xs lg:text-sm text-gray-700 mb-6">{combinedItems[3].description}</p>
                </div>
                <div className="w-full md:w-1/3 relative rounded-lg overflow-hidden">
                  <Image
                      fill
                      src={combinedItems[3].image || "/default_project_image.png"}
                      alt={combinedItems[3].name}
                      className="object-cover"
                  />
                </div>
              </div>
            </Link>

            
          </div>
      </div>
  );
}
