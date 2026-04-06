import NeuralNetwork from "./NeuralNetwork.mdx";
import TRACERV2 from "./TRACER V2.mdx";
import {toc as NeuralNetworkToc} from "./NeuralNetwork.mdx";
import React from "react";
import {ContentHeading} from "@/app/types";


export const pageToArticle: Record<string, React.FC> = {
  "lines-to-neural-networks": NeuralNetwork,
  "tracerv2": TRACERV2,
};

export const pageToArticleToc: Record<string, ContentHeading[]> = {
  "lines-to-neural-networks": NeuralNetworkToc,
};
