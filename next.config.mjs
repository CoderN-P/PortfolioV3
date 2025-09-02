import createMDX from "@next/mdx";

const withMdx = createMDX({
    options: {
        remarkPlugins:  [
            ['remark-gfm'],
            ['remark-math']
        ],
        rehypePlugins: [],
    }
});

const nextConfig = {
    pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
    experimental: {
        mdxRs: false,
        globalNotFound: true,
    }
    // …other Next.js config options
};

export default withMdx(nextConfig);