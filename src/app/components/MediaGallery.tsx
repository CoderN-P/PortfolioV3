"use client";

import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useEffect, useState } from "react";

type MediaType = "image" | "video" | "embed";

type MediaItem = {
  type: MediaType;
  src: string;
  alt?: string;
  title: string;
  poster?: string;
};

function getMediaItems(container: HTMLElement | null): MediaItem[] {
  if (!container) return [];

  const items: MediaItem[] = [];
  const seen = new Set<string>();

  for (const element of Array.from(
    container.querySelectorAll("img, video, iframe"),
  )) {
    if (element instanceof HTMLImageElement) {
      const src = element.currentSrc || element.src;
      if (!src || seen.has(src)) continue;
      seen.add(src);
      items.push({
        type: "image",
        src,
        alt: element.alt,
        title: element.alt || "Article image",
      });
      continue;
    }

    if (element instanceof HTMLVideoElement) {
      const src = element.currentSrc || element.querySelector("source")?.src || "";
      if (!src || seen.has(src)) continue;
      seen.add(src);
      items.push({
        type: "video",
        src,
        title: element.getAttribute("title") || "Article video",
        poster: element.poster || undefined,
      });
      continue;
    }

    if (element instanceof HTMLIFrameElement) {
      const src = element.src;
      if (!src || seen.has(src)) continue;
      seen.add(src);
      items.push({
        type: "embed",
        src,
        title: element.title || "Embedded video",
      });
    }
  }

  return items;
}

export default function MediaGallery({
  containerId = "article-content",
}: {
  containerId?: string;
}) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const refreshMedia = () => {
      const root = document.getElementById(containerId);
      setMediaItems(getMediaItems(root));
    };

    refreshMedia();

    const root = document.getElementById(containerId);
    if (!root) return;

    const observer = new MutationObserver(() => refreshMedia());
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "alt", "poster", "title"],
    });

    return () => observer.disconnect();
  }, [containerId]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (mediaItems.length === 0) return null;

  const activeMedia = mediaItems[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((previous) =>
      previous === 0 ? mediaItems.length - 1 : previous - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((previous) =>
      previous === mediaItems.length - 1 ? 0 : previous + 1,
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setActiveIndex(0);
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:text-gray-900"
      >
        <Images className="h-4 w-4" />
        Gallery
      </button>

      {isOpen && activeMedia && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white/80 transition hover:bg-black/60 hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Previous media"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 transition hover:bg-black/60 hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Next media"
            className="absolute right-12 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 transition hover:bg-black/60 hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col items-center justify-center rounded-2xl bg-white/5 p-4 text-white md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex w-full items-center justify-between gap-3 text-sm text-white/80">
              <span>
                {activeIndex + 1} / {mediaItems.length}
              </span>
              <span className="truncate text-right">{activeMedia.title}</span>
            </div>

            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-black/30">
              {activeMedia.type === "image" && (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.alt || activeMedia.title}
                  className="max-h-[75vh] w-full object-contain"
                />
              )}

              {activeMedia.type === "video" && (
                <video
                  src={activeMedia.src}
                  poster={activeMedia.poster}
                  controls
                  className="max-h-[75vh] w-full rounded-lg bg-black"
                />
              )}

              {activeMedia.type === "embed" && (
                <iframe
                  src={activeMedia.src}
                  title={activeMedia.title}
                  className="aspect-video w-full max-w-5xl rounded-lg border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
