"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export const LOCALES = ["ar", "en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

/** Self-names of the languages (never translated). */
export const LOCALE_LABELS: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
};

/** Compact Latin codes for the navbar switch trigger. */
export const LOCALE_CODES: Record<Locale, string> = {
  ar: "AR",
  en: "EN",
  fr: "FR",
};

export const DEFAULT_LOCALE: Locale = "ar";

const STORAGE_KEY = "loris-locale";

const DIRS: Record<Locale, "rtl" | "ltr"> = { ar: "rtl", en: "ltr", fr: "ltr" };

type DictBase = typeof ar;

type Dict = Omit<DictBase, "futureProduct"> & {
  futureProduct: Omit<DictBase["futureProduct"], "brandLine"> & {
    brandLine: string | null;
  };
};

/** Translation completeness is enforced at compile time: en/fr must match ar's shape. */
const DICTS: Record<Locale, Dict> = { ar, en, fr };

type TranslationVars = Record<string, string | number>;

function lookup(dict: unknown, key: string): unknown {
  let node: unknown = dict;
  for (const part of key.split(".")) {
    if (node && typeof node === "object" && part in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return node;
}

function makeT(locale: Locale) {
  const dict = DICTS[locale];
  return function t(key: string, vars?: TranslationVars): string {
    let value: string | undefined;
    const found = lookup(dict, key);
    if (typeof found === "string") {
      value = found;
    } else {
      const fallback = lookup(DICTS[DEFAULT_LOCALE], key);
      if (typeof fallback === "string") value = fallback;
    }
    if (value === undefined) return key;
    if (vars) {
      for (const [name, val] of Object.entries(vars)) {
        value = value.replaceAll(`{{${name}}}`, String(val));
      }
    }
    return value;
  };
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "rtl" | "ltr";
  t: (key: string, vars?: TranslationVars) => string;
  dict: Dict;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/* --- localStorage as the locale's external store ------------------------- */

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep language in sync across open tabs, free of charge.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getStoredLocale(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage unavailable (e.g. privacy mode) — fall back to the default.
    return null;
  }
}

function getServerStoredLocale(): string | null {
  return null;
}

function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALES as readonly string[]).includes(value);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // During hydration the server snapshot (null → Arabic) is used, so the
  // client render always matches the server-rendered HTML. React then
  // syncs to the actually stored locale right after hydration.
  const stored = useSyncExternalStore(
    subscribe,
    getStoredLocale,
    getServerStoredLocale,
  );
  const locale = isLocale(stored) ? stored : DEFAULT_LOCALE;

  // Keep <html>, direction, and the tab title in sync with the locale.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = DIRS[locale];
    document.title = DICTS[locale].meta.title;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore persistence failures — switching still works for the session.
    }
    for (const listener of listeners) listener();
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      dir: DIRS[locale],
      t: makeT(locale),
      dict: DICTS[locale],
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}

/**
 * Renders dictionary text that contains `**bold**` markers as <strong> spans.
 * Wording stays complete in one string per locale — only emphasis is marked up.
 */
export function Rich({ text }: { text: string }) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {segments.map((segment, i) =>
        segment.startsWith("**") && segment.endsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {segment.slice(2, -2)}
          </strong>
        ) : (
          segment || null
        ),
      )}
    </>
  );
}
