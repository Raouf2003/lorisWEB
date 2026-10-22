type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-11 px-5 text-[13px]",
  md: "h-14 px-6 text-[13px]",
  lg: "h-[72px] px-10 text-xl",
} as const;

/**
 * Plain <a> — every Button on the site targets an in-page section. With
 * next/link, a same-route hash href triggers Next's own scroll handling,
 * which would double-drive scrolling beneath Lenis.
 */
export function Button({
  href,
  children,
  variant = "dark",
  size = "md",
  className = "",
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex h-14 items-center justify-center rounded-full px-6 text-[13px] font-medium transition-[opacity,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:opacity-80 hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] active:translate-y-0 motion-reduce:transition-none ${
        variant === "dark" ? "bg-ink text-white" : "bg-white text-ink"
      } ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
}
