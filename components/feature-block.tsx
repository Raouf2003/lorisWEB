import Image from "next/image";
import type { ReactNode } from "react";

type FeatureBlockProps = {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  image?: string;
  imageAlt?: string;
  imageFirst?: boolean;
};

export function FeatureBlock({
  id,
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  imageFirst = false,
}: FeatureBlockProps) {
  return (
    <section id={id} className="bg-white px-6">
      <div
        className={`mx-auto flex max-w-[1248px] flex-col gap-16 py-16 md:py-24 ${
          imageFirst ? "" : "md:py-24"
        }`}
      >
        {imageFirst && image && (
          <BlockImage src={image} alt={imageAlt ?? ""} />
        )}

        <div className="max-w-[720px]">
          <p className="text-base text-muted">{eyebrow}</p>
          <h4 className="mt-3 text-3xl font-semibold leading-tight md:text-[32px]">
            {title}
          </h4>
          <div className="mt-5 text-base leading-relaxed text-muted md:text-lg [&_b]:font-semibold [&_b]:text-ink [&_strong]:font-semibold [&_strong]:text-ink">
            {children}
          </div>
        </div>

        {!imageFirst && image && (
          <BlockImage src={image} alt={imageAlt ?? ""} />
        )}
      </div>
    </section>
  );
}

function BlockImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full overflow-hidden rounded-3xl">
      <Image
        src={src}
        alt={alt}
        width={1659}
        height={948}
        className="h-auto w-full"
      />
    </div>
  );
}
