import TRACER from './TRACER.mdx';
import GPTKitbot from './GPTKitbot.mdx';
import Stellar from './Stellar.mdx';
import GestureController from './GestureController.mdx';
import React from "react";


export const pageToComponent: Record<string, React.FC> = {
    'tracer': TRACER,
    'gpt-kitbot': GPTKitbot,
    'stellar': Stellar,
    'risc-v-gesture-controller': GestureController
};