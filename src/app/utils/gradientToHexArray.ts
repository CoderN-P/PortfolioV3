import {getColorHex} from "@/app/utils/getColorHex";

export function gradientToHexArray(gradient: string) {
    const parts = gradient.split(" ");
    return parts.map((p) => {
        return getColorHex(p.replace(/^(from|via|to)-/, ""));
    });
}