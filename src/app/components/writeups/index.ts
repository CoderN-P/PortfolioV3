import TRACER from "./TRACER.mdx";
import {toc as tracerToc} from "./TRACER.mdx";
import GPTKitbot from "./GPTKitbot.mdx";
import Stellar from "./Stellar.mdx";
import GestureController from "./GestureController.mdx";
import Foodlyze from "./Foodlyze.mdx";
import TrekTracker from "./TrekTracker.mdx";
import CountryBot from "./CountryBot.mdx";
import RaspberryPiSmartIrrigation from "./RaspberryPiSmartIrrigation.mdx";
import FluidSim from "./FluidSim.mdx";
import {toc as fluidSimToc} from "./FluidSim.mdx";
import React from "react";
import {ContentHeading} from "@/app/types";


export const pageToComponent: Record<string, React.FC> = {
  "tracer": TRACER,
  "gpt-kitbot": GPTKitbot,
  "stellar": Stellar,
  "risc-v-gesture-controller": GestureController,
  "foodlyze": Foodlyze,
  "trek-tracker": TrekTracker,
  "country-bot": CountryBot,
  "raspberry-pi-smart-irrigation": RaspberryPiSmartIrrigation,
  "fluid-sim-and-more": FluidSim,
};


export const pageToToc: Record<string, ContentHeading[]> = {
  "tracer": tracerToc,
  "fluid-sim-and-more": fluidSimToc,
};
