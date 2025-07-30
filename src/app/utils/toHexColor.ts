import { formatHex } from "culori";

export function toHexColor(colorString: string) {
    // If Tailwind already gives hex, return as-is
    if (colorString.startsWith("#")) return colorString;

    // Otherwise convert OKLCH → HEX
    return formatHex(colorString);
}
