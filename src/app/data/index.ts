import type { Project, Article, Photo, Idea, SkillCategory } from "@/app/types";
import skillsJson from "./skills.json";
import projectsJson from "@/app/data/projects.json";
import articlesJson from "@/app/data/articles.json";
import photosJson from "@/app/data/photos.json";
import ideasJson from "@/app/data/ideas.json";

export const skillsData = skillsJson as Record<string, string[][]>;
export const skillCategories: SkillCategory[] = Object.entries(skillsJson).map(
  ([categoryName, skillsList]) => {
    const transformedSkills = skillsList.map((skill) => ({
      name: skill[0],
      color: skill[1],
      icon: skill[2],
    }));

    return {
      name: categoryName,
      skills: transformedSkills,
    };
  },
);
export const projects = projectsJson as Project[];
export const photos = photosJson as Photo[];
export const ideas = ideasJson as Idea[];
export const articles = articlesJson as Article[];
