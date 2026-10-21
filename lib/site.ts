/**
 * Navigation structure only. Visible labels come from the locale dictionaries
 * (see lib/i18n.tsx and locales/*.json) so the site stays multilingual.
 */
export const NAV_LINKS = [
  { key: "about", href: "#about" },
  { key: "how", href: "#features" },
  { key: "product", href: "#product" },
  { key: "contact", href: "#contact" },
] as const;

export const FOOTER_COLUMNS = [
  {
    titleKey: "footer.companyTitle",
    links: [{ labelKey: "footer.contactLink", href: "#contact" }],
  },
] as const;
