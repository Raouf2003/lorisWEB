import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n";

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
 * Runs before first paint / hydration: applies a returning visitor's stored
 * locale to <html> so the page never flashes in the wrong direction.
 * Default (no/failing storage) stays Arabic RTL, matching the server HTML.
 */
const LOCALE_BOOTSTRAP = `try{var v=localStorage.getItem("loris-locale");if(v==="en"||v==="fr"){document.documentElement.lang=v;document.documentElement.dir="ltr";}}catch(e){}`;

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
          dangerouslySetInnerHTML={{ __html: LOCALE_BOOTSTRAP }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
