// components/FunctionPlot.tsx
"use client";

import {useEffect, useRef, useState} from "react";

interface FunctionPlotProps {
    fn: string;       // function expression, e.g. "x^2"
    domain?: [number, number]; // x-axis range
    xlabel?: string;
    ylabel?: string;
    range?: [number, number];  // y-axis range
    height?: number;
    width?: number;
    points?: [number, number, string?][]; // optional points to plot
    derivative?: string; // optional derivative function
}

export default function Function({
                                     fn,
                                     domain = [-10, 10],
                                        xlabel = "x",
                                        ylabel = "y",
                                     range = [-10, 10],
                                     points = [],
                                     height = 400,
                                     derivative = undefined,
                                 }: FunctionPlotProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(800);

    // resize observer to track parent width
    useEffect(() => {
        if (!rootRef.current?.parentElement) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });
        observer.observe(rootRef.current.parentElement);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        (async () => {
            const functionPlot = (await import("function-plot")).default;
            if (!rootRef.current) return;

            // clear old graph
            rootRef.current.innerHTML = "";

            functionPlot({
                target: rootRef.current,
                width,
                height,
                xAxis: { domain, label: xlabel },
                yAxis: { domain: range, label: ylabel },
                grid: true,
                data: [
                    ...(fn ? [{ 
                        fn,
                        ...(derivative ? { 
                            derivative: {
                                fn: derivative, 
                                updateOnMouseMove: true }
                        } : {}),
                    }] : []),
                    ...(points.length
                        ? [
                            {
                                points: points.map(([x, y]) => [x, y]),
                                fnType: "points" as const,
                                graphType: "scatter" as const,
                                attr: { r: 6, fill: "blue" }, // bigger, styled points
                            },
                        ]
                        : []),
                ],
                annotations: points
                    .filter(([, , label]) => label) // only labeled points
                    .map(([x, y, label]) => ({
                        x,
                        y,
                        text: label!,
                    })),
            });
        })();
    }, [fn, domain, height, width, points]);

    return <div ref={rootRef} />;
}