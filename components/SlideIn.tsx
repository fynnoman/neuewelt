"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Dir = "up" | "down" | "left" | "right";

type Props = {
  children: ReactNode;
  direction?: Dir;
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  as?: keyof HTMLElementTagNameMap;
  stagger?: number;
};

export default function SlideIn({
  children,
  direction = "up",
  distance = 60,
  delay = 0,
  duration = 1.0,
  className,
  style,
  as = "div",
  stagger,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const axis = direction === "left" || direction === "right" ? "x" : "y";
    const sign = direction === "right" || direction === "down" ? -1 : 1;

    const targets = stagger ? el.children : el;

    gsap.set(targets, {
      opacity: 0,
      [axis]: reduced ? 0 : sign * distance,
    });

    const tween = gsap.to(targets, {
      opacity: 1,
      [axis]: 0,
      duration: reduced ? 0.001 : duration,
      ease: "expo.out",
      delay,
      stagger: stagger || 0,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, distance, delay, duration, stagger]);

  const Tag = as as any;
  return (
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  );
}
