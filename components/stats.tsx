"use client";

import { useLocale, Rich } from "@/lib/i18n";

export function Stats() {
  const { t, dict } = useLocale();

  return (
    <section className="bg-white px-6">
      <div className="mx-auto max-w-[1248px] py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-base text-muted">{t("stats.eyebrow")}</p>
            <h3 className="mt-3 max-w-[560px] text-3xl font-semibold leading-[1.25] md:text-[40px]">
              {t("stats.title")}
            </h3>
          </div>
          <p className="max-w-[560px] text-base leading-relaxed text-muted md:justify-self-end md:text-lg">
            {t("stats.paragraph")}
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {dict.stats.cards.map((card, i) => (
            <div
              key={card.title}
              className="rounded-2xl border border-line bg-white p-5 transition-colors duration-200 hover:border-ink/30 motion-reduce:transition-none"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-white">
                  {i + 1}
                </span>
                <h5 className="text-lg font-semibold">{card.title}</h5>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                <Rich text={card.desc} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
