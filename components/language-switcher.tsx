"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  LOCALES,
  LOCALE_CODES,
  LOCALE_LABELS,
  useLocale,
  type Locale,
} from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  // The switcher always offers the languages OTHER than the active one,
  // derived dynamically — the active language is never listed or labelled.
  const options = LOCALES.filter((code) => code !== locale);
  const primary = options[0];

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuId = useId();
  const hintId = useId();

  // Close on outside click, and on Escape (returning focus to the trigger).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Focus the first alternative when the menu opens.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, [open]);

  const choose = (next: Locale) => {
    setLocale(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [],
    );
    if (items.length === 0) return;
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const next = items[(current + delta + items.length * 2) % items.length];
    next.focus();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={t("nav.languageLabel")}
        aria-describedby={hintId}
        title={t("nav.languageLabel")}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 items-center gap-1.5 rounded-full bg-paper px-4 text-sm font-semibold uppercase tracking-wide text-ink ring-1 ring-line transition-colors hover:bg-line/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2"
      >
        {/* Globe signals "language" at a glance; code shows the primary alternative */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-muted"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span aria-hidden="true">{LOCALE_CODES[primary]}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <span id={hintId} className="sr-only">
        {t("nav.languageLabel")}
      </span>

      {open && (
        <ul
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={t("nav.languageLabel")}
          tabIndex={-1}
          onKeyDown={onMenuKeyDown}
          className="absolute top-full end-0 z-50 mt-2 min-w-44 rounded-2xl bg-white p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.1)] ring-1 ring-line"
        >
          {options.map((code) => (
            <li key={code} role="none">
              <button
                type="button"
                role="menuitem"
                lang={code}
                onClick={() => choose(code)}
                className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-line/60 focus-visible:bg-line/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25"
              >
                <span>{LOCALE_LABELS[code]}</span>
                <span
                  aria-hidden="true"
                  className="text-xs font-semibold uppercase tracking-wider text-muted"
                >
                  {LOCALE_CODES[code]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
