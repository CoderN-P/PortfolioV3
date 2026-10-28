"use client";

import Image from "next/image";
import { Eye, EyeOff, Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ImageAnnotation } from "@/app/types/Annotation";

type AnnotatedImageProps = {
  src: string;
  alt: string;
  annotations?: ImageAnnotation[];
  className?: string;
};

export default function AnnotatedImage({
  src,
  alt,
  annotations = [],
  className = "",
}: AnnotatedImageProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const selectedAnnotation = showAnnotations
    ? (annotations.find((annotation) => annotation.id === selectedId) ?? null)
    : null;
  const markerAnnotations = annotations.filter(
    (annotation) => annotation.style !== "label",
  );
  const labelAnnotations = annotations.filter(
    (annotation) => annotation.style === "label",
  );

  useEffect(() => {
    if (!selectedAnnotation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAnnotation]);

  return (
    <div
      className={[
        "relative h-full w-full overflow-hidden rounded-xl bg-black",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => setSelectedId(null)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-contain"
        sizes="(max-width: 1024px) 100vw, calc(100vw - 24rem)"
      />

      {showAnnotations && (
        <svg
          className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="annotation-arrowhead"
              markerWidth="5"
              markerHeight="5"
              refX="4"
              refY="4"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path
                d="M0,0 L5,4 L0,8"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              />
            </marker>
          </defs>
          {labelAnnotations.map(
            (annotation) =>
              annotation.arrowCoord && (
                <line
                  key={`${annotation.id}-label-line`}
                  x1={`${annotation.x}%`}
                  y1={`${annotation.y}%`}
                  x2={`${annotation.arrowCoord.x}%`}
                  y2={`${annotation.arrowCoord.y}%`}
                  stroke="rgba(0, 0, 0, 1)"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              ),
          )}
          {markerAnnotations.map(
            (annotation) =>
              annotation.arrowCoord && (
                <line
                  key={`${annotation.id}-arrow`}
                  x1={`${annotation.x}%`}
                  y1={`${annotation.y}%`}
                  x2={`${annotation.arrowCoord.x}%`}
                  y2={`${annotation.arrowCoord.y}%`}
                  stroke="rgba(0, 0, 0, 0.45)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ),
          )}
          {markerAnnotations.map(
            (annotation) =>
              annotation.arrowCoord && (
                <line
                  key={`${annotation.id}-arrow-highlight`}
                  x1={`${annotation.x}%`}
                  y1={`${annotation.y}%`}
                  x2={`${annotation.arrowCoord.x}%`}
                  y2={`${annotation.arrowCoord.y}%`}
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  markerEnd="url(#annotation-arrowhead)"
                />
              ),
          )}
        </svg>
      )}

      {showAnnotations &&
        labelAnnotations.map((annotation) => {
          const metadataValue = annotation.metadata
            ? Object.values(annotation.metadata)[0]
            : undefined;

          return (
            <div
              key={annotation.id}
              className="absolute z-10 -translate-y-full pr-0.5 text-left text-xs font-medium text-black"
              style={{
                left: `${annotation.x-0.4}%`,
                top: `${annotation.y}%`,
              }}
            >
              <div className="text-xs font-semibold leading-tight">
                {annotation.title}
              </div>
              {metadataValue && (
                <div className="text-xs leading-tight font-medium text-black">
                  {metadataValue}
                </div>
              )}
            </div>
          );
        })}

      {showAnnotations &&
        markerAnnotations.map((annotation, index) => {
          const isSelected = annotation.id === selectedId;

          return (
            <button
              key={annotation.id}
              type="button"
              aria-label={`Show annotation: ${annotation.title}`}
              aria-pressed={isSelected}
              onClick={(event) => {
                event.stopPropagation();
                setSelectedId(isSelected ? null : annotation.id);
              }}
              className={[
                "absolute z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-1 border-gray-200/50 bg-gray-100/50  backdrop-blur-sm t2xs font-semibold text-gray-800 shadow-lg transition duration-200 hover:scale-110 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                isSelected && "scale-110 bg-gray-200",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                left: `${annotation.x}%`,
                top: `${annotation.y}%`,
              }}
            >
              {index + 1}
            </button>
          );
        })}

      {showAnnotations && selectedAnnotation && (
        <div
          className="absolute z-20 h-min w-[min(20rem,calc(100%-2rem))] -translate-y-1/2 rounded-xl border border-gray-100/50 bg-gray-50/50 p-4 text-left text-black shadow-2xl backdrop-blur-sm"
          style={{
            left: `${selectedAnnotation.x}%`,
            top: `${selectedAnnotation.y}%`,
            transform:
              selectedAnnotation.x > 60
                ? "translate(-100%, -50%) translateX(-0.75rem)"
                : "translateY(-50%) translateX(0.75rem)",
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Close annotation"
            className="absolute right-1 top-2.5 rounded-full p-1 transition hover:bg-white/10 hover:text-white"
            onClick={() => setSelectedId(null)}
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>

          <div className="flex items-start gap-2 pr-6">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-black" />
            <div>
              <h3 className="text-sm text-black font-semibold">
                {selectedAnnotation.title}
              </h3>
              {selectedAnnotation.description && (
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {selectedAnnotation.description}
                </p>
              )}
            </div>
          </div>

          {selectedAnnotation.metadata &&
            Object.entries(selectedAnnotation.metadata).length > 0 && (
              <dl className="mt-3 space-y-1 border-white/10 pt-3 text-xs">
                {Object.entries(selectedAnnotation.metadata).map(
                  ([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="capitalize text-gray-600/50">{label}</dt>
                      <dd className="text-right text-gray-600/85">{value}</dd>
                    </div>
                  ),
                )}
              </dl>
            )}
        </div>
      )}

      {showAnnotations && annotations.length > 0 && !selectedAnnotation && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/65 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm">
          <Info className="h-3.5 w-3.5" />
          Select a point to explore
        </div>
      )}

      {annotations.length > 0 && (
        <button
          type="button"
          aria-pressed={showAnnotations}
          aria-label={showAnnotations ? "Hide annotations" : "Show annotations"}
          onClick={(event) => {
            event.stopPropagation();
            setShowAnnotations((visible) => !visible);
            setSelectedId(null);
          }}
          className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full bg-black/65 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {showAnnotations ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          {showAnnotations ? "Hide annotations" : "Show annotations"}
        </button>
      )}
    </div>
  );
}
