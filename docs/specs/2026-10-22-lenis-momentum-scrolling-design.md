# Lenis Momentum Scrolling — Design

Date: 2026-10-22
Goal: Give the page the inertia-based scrolling feel of https://loris.framer.website/ using the official `lenis` library, while keeping the existing IntersectionObserver reveal animations, gallery autoplay, video controls, mobile menu, RTL/LTR, and accessibility behavior intact.

## Reference findings

The Loris Framer site scrolls with native-position smoothing (inertia): wheel input sets a target that the real scrollTop follows with exponential easing, producing fluid acceleration/deceleration. Lenis implements exactly this model ("runs on native scroll"), and Framer itself ships Lenis for non-native-momentum platforms.

## Requirements → implementation mapping

| Requirement | Decision |
| --- | --- |
| Official library | `lenis` (official package, v1.3.27), optional `lenis/react` official wrapper |
| Client provider mounted once at root | New `components/smooth-scroll.tsx`: `"use client"`, renders `<ReactLenis root options={...}>` around children, imported once inside `<body>` in `app/layout.tsx`. ReactLenis creates exactly one instance in a `useEffect`, runs its own internal rAF loop (`autoRaf: true`, ReactLenis default), and `destroy()`s it on unmount (cancels rAF, removes wheel/touch/scroll/click listeners) |
| Sensible, premium inertia (not laggy) | Keep official defaults: `lerp 0.1` frame-rate-independent exponential damp; do **not** set `duration`/`easing` (with no `duration`, lerp mode is active). `smoothWheel: true`, `wheelMultiplier: 1`, `touchMultiplier: 1` |
| Native scrollbar / browser behavior preserved | Lenis drives the real window scrollTop; scrollbar, `position: sticky/fixed`, browser zoom and keyboard scrolling remain native |
| Mobile touch stays usable | `syncTouch: false` (default) — touch scrolling stays 100% native with OS momentum |
| Anchor links smooth + 88px offset | Built-in `anchors: true`. Lenis `scrollTo(element)` reads `scroll-padding-top` from `html` automatically (verified in dist/lenis.mjs:790), so the existing `html { scroll-padding-top: 88px }` keeps working with zero duplication |
| Hash-chain conflicts | `html { scroll-behavior: smooth }` fights Lenis → gated to no-JS only: `html:not(.js) { scroll-behavior: smooth }`. With JS (`html.js`) Lenis owns all programmatic scrolling |
| next/link hash navigation double-driving | `components/button.tsx` renders `next/link` for `href="#contact"`; Next would run its own hash scroll on top of Lenis → Button switch to plain `<a>` (only usage is the CTA; site is single-page) |
| React onClick side effects | Lenis `onClick` (anchors) runs on window bubble **after** React's delegated menu-close handlers and does not stopPropagation — mobile menu still closes; only the default fragment jump is superseded by Lenis glide |
| Route navigation / back-forward / scroll restoration | Site is single-route; locale switch is client-state (no route change). Native scroll restoration works because Lenis tracks the real scrollTop; `onNativeScroll` syncs Lenis state for back/forward and programmatic native scrolls |
| Nested scroll containers | None exist today (carousel is a fade carousel, video is a player; no inner scroll areas). `data-lenis-prevent` remains available if one is added later |
| prefers-reduced-motion | `respectReducedMotion: true` (Lenis default, explicit): smoothing disabled (1:1 native tracking), anchor jumps instant, Preference picked up live without reload |
| Reveal animations kept separate | The `Reveal` shared IntersectionObserver listens for native scroll position — untouched; Lenis and Reveal never share code paths |
| Performance | Only library added: lenis (~10 KB). One rAF loop (Lenis internal). Framer Motion / GSAP explicitly not added |
| Lenis recommended CSS | `import "lenis/dist/lenis.css"` inside the provider (official setup; applies html.lenis/height auto rules) |

## Files changed

1. `components/smooth-scroll.tsx` — new client provider
2. `app/layout.tsx` — mount `<SmoothScroll>` once inside `<body>`
3. `app/globals.css` — `scroll-behavior: smooth` gated behind `html:not(.js)`; `scroll-padding-top` unchanged
4. `components/button.tsx` — `next/link` → `<a>` (in-page hash targets only)
5. `package.json` — `lenis` dependency

## Lenis settings (final)

```ts
options={{
  anchors: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
}}
```

Everything else = official defaults (lerp 0.1, smoothWheel, native touch, autoRaf via ReactLenis).

## Verification plan (Chrome)

1. `npm run dev` → load site, mouse-wheel scroll: fluid accel/decel, no sluggishness
2. Nav links (`#about`, `#features`, `#product`, `#contact`) + CTA: smooth glide, section lands 88px below header, no native-jump flash fighting the glide (if a flash appears: replace with delegated click → `preventDefault` + `lenis.scrollTo(hash)` + `history` hash update — contingency recorded here)
3. Scrollbar visible; inspection shows single rAF loop (no duplicates)
4. Mobile touch emulation (`viewport`: mobile+touch): native momentum, no jank
5. Keyboard: Tab focus, Space/PgUp/PgDn native scroll works
6. `emulate prefers-reduced-motion: reduce`: no smoothing, instant anchor jumps
7. RTL (Arabic default) + LTR (en/fr): behavior identical; language switch mid-scroll works
8. Back/forward with hash: scroll restored
9. `npm run lint`, `npm run build` pass
