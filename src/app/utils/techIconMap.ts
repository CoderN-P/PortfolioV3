// Create a flattened map of all technologies and their icons from skills.json
import { skillsData } from "@/app/data";

const createTechIconMap = (skillsData: Record<string, string[][]>) => {
  const iconMap: Record<string, { icon: string; color: string }> = {};

  Object.entries(skillsData).forEach(([, skills]) => {
    // Cast the skills array to the expected type to handle the parsing safely
    const typedSkills = skills as [string, string, string][];

    typedSkills.forEach((skill) => {
      const [name, bgColor, iconPath] = skill;
      iconMap[name.toLowerCase()] = {
        icon: iconPath,
        color: bgColor,
      };
    });
  });

  return iconMap;
};

export const TECH_ICON_MAP = createTechIconMap(skillsData);
