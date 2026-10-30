/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Vercel-Image-Optimizer deaktiviert, weil das Monatskontingent erschoepft
    // ist und sonst alle next/image-Elemente mit HTTP 402 brechen. Bilder werden
    // direkt aus /public/ bzw. per remote URL ausgeliefert.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.classistatic.de" },
    ],
  },
  // @react-pdf/renderer braucht die pdfkit-Font-Files zur Laufzeit. Die
  // werden von Next.js serverless-Trace sonst nicht mitgezogen.
  serverExternalPackages: ["@react-pdf/renderer"],
  outputFileTracingIncludes: {
    "/fahrzeuge/[slug]/expose": [
      "./node_modules/pdfkit/js/data/**/*",
      "./node_modules/pdfkit/js/standard-fonts/**/*",
      "./node_modules/@react-pdf/pdfkit/js/data/**/*",
      "./node_modules/@react-pdf/pdfkit/js/standard-fonts/**/*",
      "./node_modules/fontkit/**/*",
    ],
  },
};
export default nextConfig;
