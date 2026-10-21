import Link from "next/link";

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

export function Button({
  href,
  children,
  variant = "dark",
  size = "md",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-14 items-center justify-center rounded-full px-6 text-[13px] font-medium transition-opacity hover:opacity-80 ${
        variant === "dark" ? "bg-ink text-white" : "bg-white text-ink"
      } ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
