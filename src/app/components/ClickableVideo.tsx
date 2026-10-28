"use client";

import { Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";

type ClickableVideoProps = {
  src: string;
  title?: string;
  className?: string;
  poster?: string;
};

export default function ClickableVideo({
  src,
  title = "Video",
  className = "",
  poster,
}: ClickableVideoProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
    <div className="flex w-full items-center justify-center">
      <div
        className={[
          "group relative w-full max-w-[600px]  my-8 w-full overflow-hidden rounded-xl bg-black shadow-sm",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <video
          src={src}
          poster={poster}
          controls
          aria-label={title}
          className="block max-h-[70vh] w-full object-contain"
        />
        <button
          type="button"
          aria-label={`Open ${title} in a larger view`}
          className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white/90 shadow transition hover:bg-black/80 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
          onClick={() => setIsOpen(true)}
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            aria-label="Close enlarged video"
            className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white/80 transition hover:bg-black/60 hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              aria-label={title}
              className="max-h-[85vh] w-full rounded-xl bg-black object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-sm text-white/70">{title}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
