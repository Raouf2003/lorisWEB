"use client";

import type { SVGProps } from "react";
import { useLocale } from "@/lib/i18n";
import { Reveal } from "./reveal";

type Icon = (props: SVGProps<SVGSVGElement>) => React.ReactElement;

const BENEFIT_ICONS: Icon[] = [BatteryIcon, SunIcon, ShieldCheckIcon, SparklesIcon];

function iconProps(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

function BatteryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <rect x="2" y="7" width="16" height="10" rx="2.5" />
      <path d="M22 10.5v3" />
      <path d="m10.5 9.5-2 4h3l-1.5 3" />
    </svg>
  );
}

function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SparklesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9L12 3Z" />
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </svg>
  );
}

function Group({
  labels,
  rtl,
  clone,
}: {
  labels: readonly string[];
  rtl: boolean;
  clone?: boolean;
}) {
  return (
    <div
      className="marquee-group flex shrink-0 items-center gap-10 pr-10 motion-reduce:w-full motion-reduce:shrink motion-reduce:justify-center motion-reduce:gap-4 motion-reduce:pr-0"
      data-clone={clone ? "true" : undefined}
      aria-hidden={clone ? true : undefined}
    >
      {BENEFIT_ICONS.map((Icon, i) => (
        <div
          key={i}
          dir={rtl ? "rtl" : undefined}
          className="flex items-center gap-3"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-white text-ink">
            <Icon className="h-[18px] w-[18px]" />
          </span>
          <span className="whitespace-nowrap text-[15px] font-medium text-ink md:text-base">
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  const { t, dict, dir } = useLocale();

  return (
    <Reveal
      as="section"
      direction="fade"
      delay={80}
      aria-label={t("marquee.heading")}
      className="border-y border-line/70 bg-paper py-5 md:py-6"
    >
      <div className="mx-auto flex max-w-[1248px] items-center gap-6 px-6">
        <p className="hidden shrink-0 items-center gap-2.5 text-sm font-semibold text-ink md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/30 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
          </span>
          {t("marquee.heading")}
        </p>

        <div className="marquee-fade min-w-0 flex-1 overflow-hidden">
          {/* Scroll container stays LTR so the animation is direction-stable. */}
          <div dir="ltr">
            <div
              className="marquee-track"
              style={{ ["--marquee-duration" as string]: "44s" }}
            >
              <Group labels={dict.marquee.benefits} rtl={dir === "rtl"} />
              <Group clone labels={dict.marquee.benefits} rtl={dir === "rtl"} />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
