"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { FeatureBlock } from "@/components/feature-block";
import { Stats } from "@/components/stats";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductVideo } from "@/components/product-video";
import { FutureProduct } from "@/components/future-product";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { Contact } from "@/components/contact";
import { Rich, useLocale } from "@/lib/i18n";

export default function Home() {
  const { t } = useLocale();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />

        <FeatureBlock
          id="about"
          eyebrow={t("about.eyebrow")}
          title={t("about.title")}
          image="/images/feature-11.png"
          imageAlt={t("about.imageAlt")}
          imageFirst
        >
          <p>
            <Rich text={t("about.p1")} />
          </p>
          <p>
            <Rich text={t("about.p2")} />
          </p>
        </FeatureBlock>

        <FeatureBlock
          id="features"
          eyebrow={t("features.eyebrow")}
          title={t("features.title")}
        >
          <p>
            <Rich text={t("features.p1")} />
          </p>
          <p>
            <Rich text={t("features.p2")} />
          </p>
        </FeatureBlock>

        <Stats />

        <section id="product" className="bg-white px-6">
          <div className="mx-auto max-w-[1248px] py-16 md:py-24">
            <p className="text-base text-muted">{t("product.eyebrow")}</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight md:text-[40px]">
              {t("product.title")}
            </h3>
            <p className="mt-5 max-w-[720px] text-base leading-relaxed text-muted md:text-lg">
              {t("product.description")}
            </p>
            <ProductCarousel />
          </div>
        </section>

        <ProductVideo />

        <FutureProduct />

        <section className="bg-white px-6">
          <div className="mx-auto max-w-[1248px] py-16 md:py-24">
            <p className="text-base text-muted">{t("faq.eyebrow")}</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight md:text-[40px]">
              {t("faq.title")}
            </h3>
            <Faq />
          </div>
        </section>

        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
