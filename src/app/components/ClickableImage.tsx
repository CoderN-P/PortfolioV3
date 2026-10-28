"use client";

import Image, { type ImageProps } from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type ClickableImageProps = Omit<ImageProps, "onClick"> & {
  className?: string;
  wrapperClassName?: string;
  modalClassName?: string;
  onClick?: () => void;
};

export default function ClickableImage({
  src,
  alt = "",
  className = "",
  wrapperClassName = "",
  modalClassName = "",
  onClick,
  ...props
}: ClickableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    onClick?.();
  };

  const image = (
    <Image
      {...props}
      src={src}
      alt={alt}
      className={[
        "cursor-zoom-in transition-transform duration-200 hover:scale-[1.01]",
        className,
      ].join(" ")}
      onClick={handleOpen}
    />
  );

  return (
    <>
      {props.fill ? (
        <div className={wrapperClassName || "relative h-full w-full"}>{image}</div>
      ) : (
        <div className={wrapperClassName}>{image}</div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 rounded-full bg-black/30 p-2 text-white/80 transition-colors hover:bg-black/50 hover:text-white"
            aria-label="Close enlarged image"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X size={20} />
          </button>

          <div
            className={[
              "relative flex max-w-1/2 h-auto items-center justify-center",
              modalClassName,
            ].join(" ")}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              {...props}
              src={src}
              alt={alt}
              className="max-w-1/2 h-auto  rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
