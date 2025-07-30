import colors from "tailwindcss/colors";
import { toHexColor } from "@/app/utils/toHexColor";

export function getColorHex(colorShade: string): string {
    const [color, shade] = colorShade.split("-");
    // Use type assertions to tell TypeScript this is valid
    return toHexColor((colors as never)[color]?.[shade]) || "#000000";
}
