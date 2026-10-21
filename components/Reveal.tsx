"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  style?: CSSProperties;
};

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className,
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    io.observe(el);

    const fallback = window.setTimeout(() => setVisible(true), 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const Tag = as as any;
  const shouldAnimate = mounted && !visible;
  const combined: CSSProperties = {
    ...style,
    opacity: shouldAnimate ? 0 : 1,
    transform: shouldAnimate ? `translate3d(0, ${y}px, 0)` : "translate3d(0,0,0)",
    transition: `opacity 820ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 820ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    willChange: shouldAnimate ? "opacity, transform" : undefined,
  };

  return (
    <Tag ref={ref as any} className={className} style={combined}>
      {children}
    </Tag>
  );
}
