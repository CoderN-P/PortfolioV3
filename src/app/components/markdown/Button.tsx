import NextLink from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { geistSans } from "@/app/components/fonts";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children?: ReactNode;
};

const buttonClasses = [
  geistSans.className,
  "inline-flex h-10 mt-8! w-full text-sm! font-medium! text-gray-700! !items-center !justify-center gap-2 rounded-lg border border-gray-100 bg-white px-4 text-center font-medium !leading-none text-gray-700 !no-underline transition-colors hover:bg-gray-50 hover:!no-underline [&_p]:!m-0 [&_p]:!max-w-none [&_p]:!p-0 [&_p]:!leading-none [&_p]:!text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
];

export default function Button({
  children,
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = [...buttonClasses, className].filter(Boolean).join(" ");

  if (href) {
    const isExternal = /^https?:\/\//.test(href);

    return (
      <NextLink
        href={href}
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <span className="flex flex-row gap-2 h-full items-center justify-center !leading-none !no-underline [&_p]:!m-0 [&_p]:!max-w-none [&_p]:!p-0 [&_p]:!leading-none [&_p]:!text-inherit">
          {children}
        </span>
      </NextLink>
    );
  }

  return (
    <button className={classes} {...props}>
      <span className="flex flex-row gap-2 h-full items-center justify-center !leading-none !no-underline [&_p]:!m-0 [&_p]:!max-w-none [&_p]:!p-0 [&_p]:!leading-none [&_p]:!text-inherit">
        {children}
      </span>
    </button>
  );
}
