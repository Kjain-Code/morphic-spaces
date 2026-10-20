import Link from "next/link";
import { Fragment } from "react";

/**
 * Renders article paragraph text, turning inline [label](/path) markers into
 * real, crawlable links. Internal paths use next/link; nothing else is
 * interpreted, so copy stays plain text everywhere else.
 */
export function RichText({ text, linkClassName }: { text: string; linkClassName: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <Fragment key={index}>{part}</Fragment>;
        const [, label, href] = match;
        return (
          <Link key={index} href={href} className={linkClassName}>
            {label}
          </Link>
        );
      })}
    </>
  );
}
