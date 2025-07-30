import colors from "tailwindcss/colors";
import { toHexColor } from "@/app/utils/toHexColor";

export function getColorHex(colorShade: string): string {
    const [color, shade] = colorShade.split("-");
    // @ts-ignore
    return toHexColor(colors[color]?.[shade]) || "#000000";
}
