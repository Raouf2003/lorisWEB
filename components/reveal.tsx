"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Scroll-reveal wrapper.
 *
 * - One IntersectionObserver is shared by every Reveal on the page and is
 *   created lazily; each element stops being observed the moment it reveals,
 *   so callbacks and observers never leak.
 * - The visible state is applied directly as a DOM attribute, meaning a
 *   reveal never triggers a React re-render.
 * - Motion is CSS-only (see `globals.css`), transform/opacity based and
 *   direction-neutral, so RTL and LTR behave identically.
 * - The hidden state is gated on an `html.js` class set by the inline
 *   bootstrap script before first paint: without JavaScript everything is
 *   simply visible. Reduced-motion users get a static page via a CSS media
 *   query; here we also short-circuit so the attribute is set immediately.
 */

type RevealDirection = "up" | "fade" | "scale";

type RevealTag =
  | "div"
  | "section"
  | "article"
  | "figure"
  | "header"
  | "footer"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "p"
  | "span"
  | "li";
 
type RevealProps = {
  as?: RevealTag;
  direction?: RevealDirection;
  /** Stagger delay in ms (applied through the --reveal-delay custom property). */
  delay?: number;
  className?: string;
  id?: string;
  "aria-label"?: string;
  children?: ReactNode;
};

let sharedObserver: IntersectionObserver | null = null;
const pending = new Map<Element, () => void>();

function ensureObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        pending.get(entry.target)?.();
        pending.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
      }
    },
    // Reveal shortly after an element is genuinely on screen, not when a
    // single pixel peeks over the bottom edge.
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
  );
  return sharedObserver;
}

export function Reveal({
  as = "div",
  direction = "up",
  delay = 0,
  className,
  id,
  "aria-label": ariaLabel,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already revealed (e.g. Strict Mode re-run) or JS/observer/reduced-motion
    // caveats — settle instantly, no animation.
    if (
      el.hasAttribute("data-reveal-in") ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      el.setAttribute("data-reveal-in", "");
      return;
    }
    pending.set(el, () => el.setAttribute("data-reveal-in", ""));
    ensureObserver().observe(el);
    return () => {
      // Unmount before revealing: drop it so nothing is observed in vain.
      if (pending.has(el)) {
        pending.delete(el);
        sharedObserver?.unobserve(el);
      }
    };
  }, []);

  // Dynamic tag: widening to React.ElementType lets one HTMLElement ref type
  // satisfy every allowed intrinsic tag.
  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref}
      data-reveal={direction}
      className={className}
      id={id}
      aria-label={ariaLabel}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
