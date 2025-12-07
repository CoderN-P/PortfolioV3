// types/mdx.d.ts
declare module '*.mdx' {
    import { MDXProps } from 'mdx/types';
    import {JSX} from "react";
    import {ContentHeading} from "@/app/types";

    export const toc: Array<ContentHeading>;

    export default function MDXContent(props: MDXProps): JSX.Element;
}