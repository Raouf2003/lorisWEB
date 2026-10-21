"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LOCALES, LOCALE_LABELS, useLocale, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const messageId = useId();

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

  // Move focus to the selected option when the list opens.
  useEffect(() => {
    if (!open) return;
    const selected =
      listRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    const first = listRef.current?.querySelector<HTMLButtonElement>("button");
    (selected ?? first)?.focus();
  }, [open]);

  const choose = (next: Locale) => {
    setLocale(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const options = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [],
    );
    if (options.length === 0) return;
    const current = options.indexOf(document.activeElement as HTMLButtonElement);
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const next = options[(current + delta + options.length * 2) % options.length];
    next.focus();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.languageLabel")}
        aria-describedby={messageId}
        title={t("nav.languageLabel")}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 items-center gap-1.5 rounded-full bg-paper px-4 text-sm font-medium text-ink ring-1 ring-line transition-colors hover:bg-line/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2"
      >
        <span>{LOCALE_LABELS[locale]}</span>
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

      <span id={messageId} className="sr-only">
        {t("nav.languageLabel")}
      </span>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label={t("nav.languageLabel")}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className="absolute top-full end-0 z-50 mt-2 min-w-[9.5rem] rounded-2xl bg-white p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.1)] ring-1 ring-line"
        >
          {LOCALES.map((code) => (
            <li key={code} role="none">
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => choose(code)}
                className="flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-line/60 focus-visible:bg-line/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25"
              >
                <span>{LOCALE_LABELS[code]}</span>
                {code === locale && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
