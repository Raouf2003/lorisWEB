"use client";

import Image from "next/image";
import { FOOTER_COLUMNS } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import { Reveal } from "./reveal";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-coal text-white">
      <div className="mx-auto max-w-[1248px] px-6 pb-8 pt-16 md:pt-20">
        <Reveal as="div" direction="fade" className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="flex items-center gap-4 md:order-2 md:gap-6">
            <span className="text-sm text-silver md:text-base">
              {t("footer.tagline")}
            </span>
            <Image
              src="/images/logo-white.png"
              alt={t("footer.logoAlt")}
              width={100}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          <div className="flex flex-wrap gap-16 md:order-1">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.titleKey} className="min-w-32">
                <p className="mb-4 text-sm font-medium text-white">
                  {t(col.titleKey)}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-silver transition-colors hover:text-white"
                      >
                        {t(link.labelKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" delay={100} className="mt-14 md:mt-20">
          <Image
            src="/images/logo-white.png"
            alt={t("footer.bigLogoAlt")}
            width={1199}
            height={511}
            className="h-auto w-full"
          />
        </Reveal>

        <div className="mt-10 flex flex-col justify-between gap-3 text-sm text-silver md:flex-row md:items-center">
          <p>{t("footer.rights")}</p>
          <a
            href="https://instagram.com/loris"
            aria-label={t("footer.instagramAria")}
            className="transition-colors hover:text-white"
          >
            @Loris
          </a>
        </div>
      </div>
    </footer>
  );
}
