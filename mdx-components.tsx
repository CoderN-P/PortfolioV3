import type { MDXComponents } from 'mdx/types'
import {Blockquote, Code, Link} from "@/app/components/markdown";
import Image from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        h1: (props) => <h1 className="prose text-4xl font-bold" {...props} />,
        h2: (props) => <h2 className="prose text-black text-3xl font-semibold" {...props} />,
        h3: (props) => <h3 className="prose text-black text-2xl font-semibold" {...props} />,
        h4: (props) => <h4 className="prose text-black text-xl font-semibold" {...props} />,
        h5: (props) => <h5 className="prose text-black text-lg font-semibold" {...props} />,
        img: (props) => (
            <Image
                {...props}
                width={800}
                height={600}
                sizes="(max-width: 768px) 50vw, 400px"
                className="max-w-1/2 h-auto mt-4 mx-auto object-contain rounded-lg"
            />
        ),
        
        code: (props) => (
            <Code {...props} />
        ),
        p: (props) => (
            <p className="text-lg prose leading-7 max-w-[800px] font-medium" {...props} />
        ),
        ol: (props) => (
            <ol className="prose text-lg font-medium leading-7 max-w-[800px] list-decimal ml-4" {...props} />
        ),
        ul: (props) => (
            <ul className="prose text-lg font-medium leading-7 max-w-[800px] list-disc ml-4" {...props} />
        ),
        a: Link,
        blockquote: Blockquote,
    }
}