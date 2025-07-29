import ProjectIdeaCard from "@/app/components/ProjectIdeaCard";
import ideasData from "@/app/data/ideas.json";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ideas & Concepts | Neel Parpia',
  description: 'A collection of project ideas, concepts, and future explorations in AI, Web Development, and Robotics.',
};

interface Idea {
  name: string;
  concept: string;
  problem: string;
  solution: string;
  potentialTech: string[];
  learningGoals: string[];
  status: string;
}

const ideas: Idea[] = ideasData;

export default function IdeasPage() {
  return (
    <div className="">
      <div className="mb-16">
        <h1 className="text-6xl font-bold mb-8">Ideas</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
          Future projects and concepts I&apos;m excited to explore and build.
        </p>
      </div>

      <div>
        {ideas.map((idea) => (
          <ProjectIdeaCard key={idea.name} {...idea} />
        ))}
      </div>
    </div>
  );
}
