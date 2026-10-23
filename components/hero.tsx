"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="bg-white px-6 pt-[120px] md:pt-28 lg:pb-16">
      <div className="mx-auto flex max-w-[1248px] flex-col items-center pt-8 text-center lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 lg:text-start">
        <div className="flex flex-col items-center lg:items-start">
          {/* First-paint CSS entrance (globals.css) — no Reveal/observer here:
              the LCP image and heading must render immediately, not after
              hydration. Delays echo the old reveal staggers so the look holds. */}
          <h1
            data-hero-reveal="up"
            style={{ "--hero-delay": "0ms" } as React.CSSProperties}
            className="max-w-[560px] text-4xl font-bold leading-[1.2] tracking-tight md:text-[48px]"
          >
            {t("hero.title")}
          </h1>
          <p
            data-hero-reveal="up"
            style={{ "--hero-delay": "120ms" } as React.CSSProperties}
            className="mt-6 max-w-[620px] text-base leading-relaxed text-muted md:text-lg"
          >
            {t("hero.subtitle")}
          </p>
        </div>
        <div
          data-hero-reveal="scale"
          style={{ "--hero-delay": "150ms" } as React.CSSProperties}
          className="mt-8 w-full max-w-[960px] lg:mt-0 lg:max-w-none"
        >
          <Image
            src="/images/hero-productss.png"
            alt={t("hero.imageAlt")}
            width={1125}
            height={579}
            sizes="(min-width:1024px) 630px, calc(100vw - 48px)"
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
