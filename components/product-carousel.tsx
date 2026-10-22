"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, PointerEvent } from "react";
import { useLocale } from "@/lib/i18n";
import { Reveal } from "./reveal";

const SLIDE_SRCS = [
  "/images/product-11111.png",
  "/images/product-22.png",
  "/images/product-33.png",
] as const;

const ROTATE_INTERVAL_MS = 2000;

export function ProductCarousel() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = SLIDE_SRCS.length;
  const { t, dict, dir } = useLocale();
  const rtl = dir === "rtl";

  const rootRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Respect the user's motion preference, including live OS-level changes.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Autoplay only while the carousel is actually on screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.25 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const autoPlay = inView && !hovered && !keyboardFocus && !reducedMotion;

  // The effect re-runs on every index change: auto-rotation keeps its steady
  // cadence, while a manual thumbnail selection always resets the countdown.
  // Cleanup on every run keeps timers from leaking.
  useEffect(() => {
    if (!autoPlay) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      ROTATE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [autoPlay, index, count]);

  const onPointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    // Only fine pointers hover — tapping a thumbnail on touch must not pause.
    if (event.pointerType !== "touch") setHovered(true);
  };

  const onPointerLeave = useCallback(() => setHovered(false), []);

  const onFocus = useCallback((event: FocusEvent<HTMLDivElement>) => {
    try {
      // Pause only for keyboard focus, so a mouse click that leaves the
      // carousel focused still lets autoplay resume once the pointer leaves.
      if (event.target instanceof Element && event.target.matches(":focus-visible")) {
        setKeyboardFocus(true);
      }
    } catch {
      // No :focus-visible support (old browsers) — treat focus as keyboard.
      setKeyboardFocus(true);
    }
  }, []);

  const onBlur = useCallback(() => setKeyboardFocus(false), []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Arrow keys follow the reading direction of the active locale.
    if (event.key === (rtl ? "ArrowLeft" : "ArrowRight")) {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === (rtl ? "ArrowRight" : "ArrowLeft")) {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <Reveal as="div" delay={80} className="mt-12">
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={t("product.carousel.ariaLabel")}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        className="group relative overflow-hidden rounded-3xl bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-4"
      >
        <div className="relative aspect-[11/9]">
          {SLIDE_SRCS.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={dict.product.carousel.imageAlts[i]}
              fill
              sizes="(min-width: 1248px) 1248px, 100vw"
              loading="eager"
              className={`object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Thumbnail switcher — vertically centered on the inline-start edge */}
        <div className="absolute start-3 top-1/2 flex -translate-y-1/2 flex-col gap-2 md:start-5 md:gap-3">
          {SLIDE_SRCS.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={t("product.carousel.viewImage", { n: i + 1 })}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className={`overflow-hidden rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 motion-reduce:transition-none ${
                i === index
                  ? "ring-2 ring-white"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              <Image
                src={src}
                alt=""
                width={62}
                height={32}
                className="h-9 w-16 object-cover md:h-14 md:w-24"
              />
            </button>
          ))}
        </div>

        <p aria-live="polite" className="sr-only">
          {t("product.carousel.slideInfo", { index: index + 1, total: count })}
        </p>
      </div>
    </Reveal>
  );
}
