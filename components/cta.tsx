"use client";

import { useLocale } from "@/lib/i18n";
import { Button } from "./button";
import { Reveal } from "./reveal";

export function Cta() {
  const { t } = useLocale();

  return (
    <section className="bg-white px-6">
      <div className="rounded-[32px] bg-paper">
        <div className="mx-auto grid max-w-[1248px] gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:gap-16 md:py-24">
          <Reveal as="div">
            <h2 className="max-w-[520px] text-3xl font-bold leading-[1.2] tracking-tight md:text-[48px]">
              {t("cta.title")}
            </h2>
            <Button href="#contact" size="lg" className="mt-8">
              {t("cta.button")}
            </Button>
          </Reveal>
          <Reveal as="div" delay={110} className="md:max-w-[584px]">
            <h5 className="text-xl font-semibold">{t("cta.asideTitle")}</h5>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              {t("cta.asideText")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
