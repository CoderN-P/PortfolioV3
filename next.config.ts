import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const withMdx = withMDX({
    extension: /\.mdx?$/
});

const nextConfig: NextConfig = {
    pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
    // …other Next.js config options
};

export default withMdx(nextConfig);