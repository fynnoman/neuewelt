import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import WhatsAppFab from "@/components/WhatsAppFab";

const manrope = localFont({
  src: "../public/fonts/Manrope.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  title: "Neue Welt Automobile · Saarlouis",
  description:
    "Gebrauchtwagenhandel, Fahrzeugankauf und Werkstatt in Saarlouis. Ruhige Beratung, saubere Abwicklung, der ganze Weg aus einer Hand.",
  metadataBase: new URL("https://neue-welt-automobile.de"),
  openGraph: {
    title: "Neue Welt Automobile · Saarlouis",
    description:
      "Gebrauchtwagenhandel, Fahrzeugankauf, Werkstatt. Saarlouis.",
    locale: "de_DE",
    type: "website",
    url: "https://neue-welt-automobile.de",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={manrope.variable}>
      <body>
        <Nav />
        <div className="lg:pl-[300px]">
          <PageTransition>{children}</PageTransition>
          <Footer />
        </div>
        <WhatsAppFab />
      </body>
    </html>
  );
}
