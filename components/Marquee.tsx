type Props = {
  items?: string[];
  speedSec?: number;
  variant?: "light" | "dark";
};

export default function Marquee({
  items = [
    "NEUE WELT AUTOMOBILE",
    "SAARLOUIS",
    "GEBRAUCHTWAGEN",
    "FAHRZEUGANKAUF",
    "ZULASSUNGSSERVICE",
    "FINANZIERUNG",
  ],
  speedSec = 48,
  variant = "light",
}: Props) {
  const color = variant === "dark" ? "var(--paper)" : "var(--ink)";
  const bg = variant === "dark" ? "var(--void)" : "transparent";
  const sepColor = variant === "dark" ? "var(--signal)" : "var(--signal)";

  const trackItems = (
    <>
      {items.map((text, i) => (
        <div
          key={i}
          className="flex items-center gap-10 whitespace-nowrap"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <span
            className="display"
            style={{
              fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)",
              color,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            {text}
          </span>
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              background: sepColor,
              display: "inline-block",
              borderRadius: 999,
              flexShrink: 0,
            }}
          />
        </div>
      ))}
    </>
  );

  return (
    <div
      className="marquee py-7"
      style={{
        background: bg,
        borderTop: variant === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--fog-200)",
        borderBottom: variant === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--fog-200)",
      }}
    >
      <div className="marquee-track" style={{ animationDuration: `${speedSec}s` }}>
        {trackItems}
      </div>
      <div className="marquee-track" style={{ animationDuration: `${speedSec}s` }} aria-hidden>
        {trackItems}
      </div>
    </div>
  );
}
