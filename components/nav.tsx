"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, dir } = useLocale();
  const ltr = dir === "ltr";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the sheet (and the burger keeps focus, like a native dialog).
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow ${
        scrolled || open ? "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1248px] items-center justify-between px-6">
        <Link href="/" aria-label={t("nav.homeAria")} className="flex items-center">
          <Image
            src="/images/logo-dark.png"
            alt={t("nav.logoAlt")}
            width={100}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2.5 text-[15px] font-medium text-ink transition-colors duration-200 hover:bg-line/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2 active:bg-line"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className={`group hidden h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-all duration-200 hover:bg-coal hover:shadow-[0_4px_14px_rgba(0,0,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 active:translate-y-px md:inline-flex`}
          >
            <span>{t("nav.cta")}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 ${
                ltr ? "rotate-180 group-hover:translate-x-0.5" : ""
              }`}
            >
              <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
            </svg>
          </a>
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-[color,background-color,transform] duration-150 ease-out hover:bg-line/60 active:bg-line active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-0.5 bg-ink transition-transform ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-ink transition-transform ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu — animated like the FAQ accordion: grid-template-rows
          0fr -> 1fr settles at the real content height (no max-height guess
          or clipped links). inert keeps the closed sheet out of the tab order
          and a11y tree; rows arrive with a staggered rise (globals.css), and
          the border fades in with the sheet instead of popping. */}
      <div
        inert={!open}
        data-open={open}
        className={`menu-sheet grid border-t md:hidden ${
          open ? "border-line" : "border-transparent"
        }`}
      >
        <div>
          <nav className="flex flex-col gap-1 px-6 pb-5 pt-2">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => setOpen(false)}
                className="menu-row rounded-xl px-4 py-3.5 text-[15px] font-medium text-ink transition-[transform,background-color] duration-150 ease-out hover:bg-line/60 active:bg-line active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <a
              href="#contact"
              style={{ "--i": NAV_LINKS.length } as React.CSSProperties}
              onClick={() => setOpen(false)}
              className="menu-row mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out hover:bg-coal active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
            >
              <span>{t("nav.cta")}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-4 w-4 ${ltr ? "rotate-180" : ""}`}
              >
                <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
