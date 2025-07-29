interface ProjectIdeaProps {
  name: string;
  concept: string;
  problem: string;
  solution: string;
  potentialTech: string[];
  learningGoals: string[];
  status: string;
}

export default function ProjectIdeaCard({
  name,
  concept,
  problem,
  solution,
  potentialTech,
  learningGoals,
  status,
}: ProjectIdeaProps) {
  return (
    <div className="w-full mb-16">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          <span className="text-xs font-medium uppercase px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {status}
          </span>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">{concept}</p>
      </div>

      <div className="space-y-8">
        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Problem
            </h3>
            <p className="text-gray-600 leading-relaxed">{problem}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Solution
            </h3>
            <p className="text-gray-600 leading-relaxed">{solution}</p>
          </div>
        </div>

        {/* Tech Stack & Learning Goals */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {potentialTech.map((tech) => (
                <span key={tech} className="text-sm bg-gray-50 text-gray-700 px-3 py-1 rounded border border-gray-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Learning Goals
            </h3>
            <ul className="text-gray-600 space-y-2">
              {learningGoals.map((goal) => (
                <li key={goal} className="flex items-start">
                  <span className="text-gray-400 mr-2 mt-1">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Simple separator */}
      <div className="h-px w-full mt-12 bg-gray-200"></div>
    </div>
  );
}
