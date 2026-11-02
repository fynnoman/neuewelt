export default function GewaehrleistungFab() {
  return (
    <a
      href="/legal/gesetzliche-gewaehrleistung.pdf"
      target="_blank"
      rel="noopener"
      aria-label="Gesetzliche Gewährleistung (PDF)"
      className="liquid liquid-hover"
      style={{
        position: "fixed",
        left: "max(22px, calc(env(safe-area-inset-left) + 6px))",
        bottom: "calc(max(16px, env(safe-area-inset-bottom)) + 68px)",
        zIndex: 60,
        width: 44,
        height: 44,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        padding: 4,
      }}
    >
      <img
        src="/brand/eu-gewaehrleistung-shield.png"
        alt=""
        width={32}
        height={32}
        style={{ display: "block", width: 32, height: 32, objectFit: "contain" }}
      />
    </a>
  );
}
