"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import type { ReactNode } from "react";

/**
 * Momentum scrolling, mounted once inside <body> in app/layout.tsx.
 *
 * ReactLenis ("root") creates exactly one Lenis instance bound to the
 * window, drives it from its own internal requestAnimationFrame loop
 * (autoRaf), and destroys everything on unmount. It renders its children
 * inline — no wrapper element touches the layout.
 *
 * Settings deliberately stay on Lenis's official defaults:
 *  - lerp 0.1 (frame-rate-independent exponential ease) → fluid momentum
 *    without sluggishness. DO NOT also pass duration/easing — that would
 *    switch the engine out of lerp mode.
 *  - smoothWheel: true, wheel/touchMultiplier: 1 → responsive input.
 *  - syncTouch: false → touch platforms keep their native OS momentum.
 *  - anchors stays disabled (off is the default): the *native* fragment
 *    jump on an anchor click races and defeats the glide — Chrome jumps
 *    instantly and fires popstate, whose handler would then reset the
 *    animation. Anchor navigation is handled by the delegated click
 *    listener in ScrollHistory below instead: Lenis still reads
 *    `scroll-padding-top` from <html> for the landing offset, so the
 *    navbar offset lives in one place (globals.css).
 *  - stopInertiaOnNavigate: true → scroll inertia resets when a link to
 *    another page is clicked.
 *  - respectReducedMotion: true is Lenis's default: it disables smoothing
 *    and makes programmatic scroll instant for prefers-reduced-motion
 *    users, live-updating without a reload. Stated explicitly because it
 *    is an accessibility contract, not an aesthetic choice.
 *
 * The reveal animations (components/reveal.tsx) intentionally run on the
 * native scroll position and share nothing with this engine.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      }}
    >
      <ScrollHistory>{children}</ScrollHistory>
    </ReactLenis>
  );
}

/**
 * Anchor navigation and back/forward traversal.
 *
 * Anchor links (capture phase, so it runs before the browser default).
 * preventDefault stops three concurrent races at once: the browser's own
 * instant fragment jump, the popstate Chromium fires for it (which would
 * otherwise reset the glide that just started), and the native history
 * push. We then push the hash ourselves and drive one single smooth scroll.
 * React's delegated handlers still run normally, so the mobile menu keeps
 * closing on click. Reduced-motion users get an instant jump (Lenis).
 *
 * Traversal (back/forward): the bootstrap script sets
 * history.scrollRestoration = "manual" so a reload always lands on the hero
 * with no browser-restored position. This keeps traversal meaningful:
 * back/forward to a hash entry jumps to that section, hashless entries go
 * to the page top — instant, matching native traversal behavior.
 */
function ScrollHistory({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.length < 2) return; // "#" alone: leave default/keep no-op
      const element = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!element) return; // no such target → let the browser handle it
      event.preventDefault();
      history.pushState(null, "", href);
      lenis.scrollTo(element);
    };

    const onPopState = () => {
      lenis.scrollTo(location.hash || 0, { immediate: true });
    };

    window.addEventListener("click", onAnchorClick, { capture: true });
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("click", onAnchorClick, { capture: true });
      window.removeEventListener("popstate", onPopState);
    };
  }, [lenis]);

  return <>{children}</>;
}
