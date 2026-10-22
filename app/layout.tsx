import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/smooth-scroll";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "لوريس - السياج الكهربائي الذكي",
  description:
    "احمِ مواشيك مع الراعي الكهربائي الذكي — آمن، يعمل بالطاقة الشمسية، وسهل التركيب. تصميم متين، بطارية تدوم 50 ساعة، وثقة المزارعين لحماية موثوقة بلا عناء.",
};

/**
 * Runs before first paint / hydration, so triggers before the browser's own
 * scroll restoration. It:
 *  - marks that JS is available (gate for scroll-reveal styles),
 *  - hands scroll restoration over to us: a reload always starts on the hero,
 *    while a genuine deep link (fresh navigation to a #hash URL) still jumps
 *    natively to its section — `history.scrollRestoration` only governs
 *    session restores, never fragment navigation,
 *  - applies a returning visitor's stored locale to <html> so the page never
 *    flashes in the wrong direction.
 * Default (no/failing storage) stays Arabic RTL, matching the server HTML.
 * Back/forward traversal of hash entries is handled in
 * components/smooth-scroll.tsx (popstate).
 */
const BOOTSTRAP = `try{var d=document.documentElement;d.classList.add("js");history.scrollRestoration="manual";var nv=performance.getEntriesByType("navigation")[0]||{};if((nv.type||"")==="reload"){history.replaceState(null,"",location.pathname+location.search);window.scrollTo(0,0);}else if((nv.type||"navigate")!=="navigate"){window.scrollTo(0,0);}var v=localStorage.getItem("loris-locale");if(v==="en"||v==="fr"){d.lang=v;d.dir="ltr";}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: BOOTSTRAP }}
        />
        <SmoothScroll>
          <LocaleProvider>{children}</LocaleProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
