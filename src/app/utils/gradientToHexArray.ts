import {getColorHex} from "@/app/utils/getColorHex";

export function gradientToHexArray(gradient: string) {
    const parts = gradient.split(" ");
    return parts.map((p) => {
        const [_, colorShade] = p.split("-");
        return getColorHex(p.replace(/^(from|via|to)-/, ""));
    });
}