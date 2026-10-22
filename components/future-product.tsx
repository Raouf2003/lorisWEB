"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { Reveal } from "./reveal";

const ICON_PROPS = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const FEATURE_ICONS = [
  // تعزيز الحماية الأمنية — shield
  <svg key="shield" {...ICON_PROPS} className="h-5 w-5">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // إنذار صوتي وضوئي — bell
  <svg key="bell" {...ICON_PROPS} className="h-5 w-5">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>,
  // إمكانية استخدام الطاقة الشمسية — sun
  <svg key="sun" {...ICON_PROPS} className="h-5 w-5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="m12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="m20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>,
  // تصميم قابل للتطوير — cpu
  <svg key="cpu" {...ICON_PROPS} className="h-5 w-5">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
  </svg>,
];

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coal opacity-60 motion-reduce:animate-none" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-coal" />
    </span>
  );
}

export function FutureProduct() {
  const { t, dict, locale } = useLocale();

  return (
    <section id="future-product" className="bg-white px-6">
      <div className="mx-auto max-w-[1248px] py-16 md:py-24">
        <div className="overflow-hidden rounded-[32px] bg-paper">
          <div className="grid gap-10 p-6 md:grid-cols-2 md:items-center md:gap-14 md:p-12">
            {/* Content */}
            <div>
              <Reveal as="p" className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-ink ring-1 ring-line">
                <StatusDot />
                {t("futureProduct.status")}
              </Reveal>

              <Reveal as="h3" delay={80} className="mt-5 text-3xl font-semibold leading-tight md:text-[40px]">
                {t("futureProduct.title")}
              </Reveal>

              <Reveal delay={140}>
                {/* The English gloss line is aimed at the Arabic audience only. */}
                {locale === "ar" && dict.futureProduct.brandLine && (
                  <p dir="ltr" className="mt-2 text-end text-sm font-medium text-muted">
                    {dict.futureProduct.brandLine}
                  </p>
                )}

                <p className="mt-6 max-w-[560px] text-base leading-relaxed text-muted md:text-lg">
                  {t("futureProduct.subtitle")}
                </p>

                <p className="mt-5 max-w-[560px] text-base leading-relaxed text-muted md:text-lg">
                  {t("futureProduct.description")}
                </p>

                <p className="mt-5 max-w-[560px] text-base leading-relaxed text-muted md:text-lg">
                  {t("futureProduct.vision")}
                </p>
              </Reveal>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {dict.futureProduct.features.map((feature, i) => (
                  <Reveal as="div" key={feature.title} delay={120 + i * 90}>
                    <div className="h-full rounded-2xl bg-white p-5 transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:transition-none">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper text-ink ring-1 ring-line">
                        {FEATURE_ICONS[i]}
                      </span>
                      <h5 className="mt-4 text-[15px] font-semibold">
                        {feature.title}
                      </h5>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {feature.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Image (unchanged asset) */}
            <Reveal as="div" direction="scale" delay={120}>
              <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
                <Image
                  src="/images/FutureProduct.png"
                  alt={t("futureProduct.imageAlt")}
                  width={1536}
                  height={1024}
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {t("futureProduct.imageNote")}
              </p>
            </Reveal>
          </div>

          {/* Development status */}
          <div className="border-t border-line bg-white px-6 py-6 md:px-12">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-10">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-muted md:items-center md:text-base">
                <StatusDot />
                <span>
                  <strong className="font-semibold text-ink">
                    {t("futureProduct.stageLabel")}{" "}
                  </strong>
                  {t("futureProduct.stageText")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
