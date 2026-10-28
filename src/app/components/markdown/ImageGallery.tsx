"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

export type GalleryImage = {
  src: string;
  alt?: string;
  caption?: string;
};

type ImageGalleryProps = {
  images: GalleryImage[];
  className?: string;
};

export default function ImageGallery({
  images,
  className = "",
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % images.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null ? null : (current - 1 + images.length) % images.length,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, selectedIndex]);

  if (!images.length) return null;

  const activeImage =
    selectedIndex === null ? null : images[selectedIndex] ?? null;

  const goToNext = () =>
    setSelectedIndex((current) => {
      if (current === null) return 0;
      return (current + 1) % images.length;
    });

  const goToPrevious = () =>
    setSelectedIndex((current) => {
      if (current === null) return images.length - 1;
      return (current - 1 + images.length) % images.length;
    });

  return (
    <>
      <div className={['not-prose my-8 pt-8', className].filter(Boolean).join(' ')}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
              aria-label={image.alt || `Open gallery image ${index + 1}`}
            >
              <Image
                src={image.src}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </button>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            aria-label="Close gallery view"
            className="absolute right-4 top-4 z-20 rounded-full bg-black/40 p-2 text-white/80 transition hover:bg-black/60 hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIndex(null);
            }}
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 transition hover:bg-black/60 hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Next image"
            className="absolute right-12 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 transition hover:bg-black/60 hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-2 w-full text-center text-sm text-white/70">
              {selectedIndex !== null && `${selectedIndex + 1} / ${images.length}`}
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl bg-black/20">
              <Image
                src={activeImage.src}
                alt={activeImage.alt || `Gallery image ${selectedIndex! + 1}`}
                width={1600}
                height={1200}
                className="max-h-[80vh] w-full rounded-2xl object-contain shadow-2xl"
                priority
              />
            </div>
            {activeImage.caption && (
              <p className="mt-3 max-w-2xl text-center text-sm text-white/80">
                {activeImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
