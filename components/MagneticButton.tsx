"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import Link from "next/link";
import { gsap } from "gsap";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "solid" | "ghost";
  strength?: number;
};

export default function MagneticButton({
  href,
  children,
  className,
  variant = "solid",
  strength = 0.3,
}: Props) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = btnRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: "power3.out" });
    gsap.to(inner, { x: x * strength * 0.5, y: y * strength * 0.5, duration: 0.6, ease: "power3.out" });
  }

  function handleLeave() {
    const el = btnRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  }

  const cls = variant === "solid" ? "btn" : "btn-ghost rule-arrow";

  return (
    <Link
      href={href}
      ref={btnRef as any}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${cls} ${className || ""}`}
      style={{ willChange: "transform", display: "inline-flex" }}
    >
      <span ref={innerRef} className="inline-flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}
