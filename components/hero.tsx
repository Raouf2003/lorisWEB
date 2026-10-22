"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { Reveal } from "./reveal";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="bg-white px-6 pt-[120px] md:pt-28 lg:pb-16">
      <div className="mx-auto flex max-w-[1248px] flex-col items-center pt-8 text-center lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 lg:text-start">
        <div className="flex flex-col items-center lg:items-start">
          {/* Above the fold: short delays so essential content is not held back. */}
          <Reveal as="h1" delay={0} className="max-w-[560px] text-4xl font-bold leading-[1.2] tracking-tight md:text-[48px]">
            {t("hero.title")}
          </Reveal>
          <Reveal as="p" delay={120} className="mt-6 max-w-[620px] text-base leading-relaxed text-muted md:text-lg">
            {t("hero.subtitle")}
          </Reveal>
        </div>
        <Reveal
          direction="scale"
          delay={150}
          className="mt-8 w-full max-w-[960px] lg:mt-0 lg:max-w-none"
        >
          <Image
            src="/images/hero-productss.png"
            alt={t("hero.imageAlt")}
            width={1125}
            height={579}
            className="h-auto w-full"
            priority
          />
        </Reveal>
      </div>
    </section>
  );
}
