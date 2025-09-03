// Get icon and color for a technology or return defaults if not found
import {TECH_ICON_MAP} from "./techIconMap";

export const getTechInfo = (tech: string): { icon: string, color: string } => {
    const normalizedTech = tech.toLowerCase();
    return TECH_ICON_MAP[normalizedTech] || {
        icon: '/tech-icons/code.svg',
        color: 'bg-gray-400'
    };
};
