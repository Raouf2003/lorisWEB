"use client";

import { useLocale } from "@/lib/i18n";

const ICON_PROPS = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const CONTACT_CHIP =
  "inline-flex h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-medium text-ink ring-1 ring-line transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2";

export function Contact() {
  const { t } = useLocale();

  return (
    <section id="contact" className="bg-white px-6">
      <div className="mx-auto max-w-[1248px] py-16 md:py-24">
        <div className="max-w-[560px]">
          <p className="text-base text-muted">{t("contact.eyebrow")}</p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-[40px]">
            {t("contact.title")}
          </h3>
          <p className="mt-5 max-w-[480px] text-base leading-relaxed text-muted md:text-lg">
            {t("contact.description")}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="mailto:loris.elec@gmail.com" className={CONTACT_CHIP}>
            <svg {...ICON_PROPS} className="h-4 w-4">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span dir="ltr">loris.elec@gmail.com</span>
          </a>

          <a
            href="tel:+213669990896"
            className={CONTACT_CHIP}
            aria-label={t("contact.phoneAria")}
          >
            <svg {...ICON_PROPS} className="h-4 w-4">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span dir="ltr">0669 99 08 96</span>
          </a>

          <a
            href="https://wa.me/213670701514"
            target="_blank"
            rel="noopener noreferrer"
            className={CONTACT_CHIP}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            {t("contact.whatsapp")}
            <span dir="ltr">+213 670 70 15 14</span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=100057526566219"
            target="_blank"
            rel="noopener noreferrer"
            className={CONTACT_CHIP}
          >
            <svg {...ICON_PROPS} className="h-4 w-4">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            {t("contact.facebook")}
          </a>

          <a
            href="https://www.tiktok.com/@loris.electronics?_r=1&_t=ZS-9AkXXAVWe8K"
            target="_blank"
            rel="noopener noreferrer"
            className={CONTACT_CHIP}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.1 1.62-2.87 2.74-4.81 2.79-1.43.06-2.9-.31-4.11-1.16-.7-.47-1.3-1.07-1.78-1.76-.48-.7-.83-1.5-1.03-2.34-.21-.86-.23-1.77-.09-2.64.21-1.62.97-3.16 2.09-4.34 1.1-1.19 2.57-1.98 4.16-2.24.29-.05.59-.08.89-.09v4.06c-.53-.02-1.07.05-1.55.26-.66.29-1.19.8-1.53 1.42-.36.62-.5 1.35-.44 2.06.05.71.34 1.38.79 1.92.45.53 1.06.9 1.73 1.06.44.1.9.09 1.33 0 .44-.1.85-.3 1.19-.6.35-.29.63-.67.81-1.11.13-.28.19-.57.19-.87V.02z" />
            </svg>
            {t("contact.tiktok")}
          </a>
        </div>
      </div>
    </section>
  );
}
