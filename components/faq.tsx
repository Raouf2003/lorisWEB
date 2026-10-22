"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n";
import { Reveal } from "./reveal";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M5 8l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { dict } = useLocale();

  return (
    <div className="mt-12 border-y border-line">
      {dict.faq.items.map((item, i) => {
        const open = openIndex === i;
        return (
          <Reveal
            as="div"
            key={i}
            className={i > 0 ? "border-t border-line" : ""}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-start"
            >
              <h5 className="text-lg font-medium md:text-xl">{item.q}</h5>
              <span className={open ? "text-ink" : "text-muted"}>
                <Chevron open={open} />
              </span>
            </button>
            <div className="faq-answer" data-open={open}>
              <div>
                <p className="max-w-[820px] pb-6 leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
