"use client";

import Link from "next/link";
import { useState } from "react";

interface GradientBorderLinkProps {
  href: string;
  children: React.ReactNode;
}

const GRADIENT_STYLE = {
  background:
    "linear-gradient(var(--background), var(--background)) padding-box, " +
    "linear-gradient(269.48deg, #1BC4F9 3.26%, #5A6BE0 65.08%, #DC41CA 135.82%) border-box",
};

const HOVER_STYLE = {
  background: "#ffffff",
};

export default function GradientBorderLink({
  href,
  children,
}: GradientBorderLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      style={hovered ? HOVER_STYLE : GRADIENT_STYLE}
      className={`inline-flex min-h-12 w-full min-w-45 items-center justify-center gap-2 rounded-full border px-6 py-2 text-[15px] font-semibold transition-all duration-300 ease-out min-[500px]:w-auto min-[500px]:px-7 lg:w-50 ${
        hovered
          ? "border-[#141B2A] text-[#141B2A] lg:w-98.75"
          : "border-transparent text-white"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}
