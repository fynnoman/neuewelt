import { Document, Page, Text, View, StyleSheet, Image, Link, Font } from "@react-pdf/renderer";
import type { Vehicle } from "@/lib/vehicles";
import { SITE } from "@/lib/site";

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#0A0B0C",
    backgroundColor: "#FBFBF9",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D4D2CC",
  },
  brand: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
    color: "#0A0B0C",
    textTransform: "uppercase",
  },
  headerLogo: {
    height: 36,
    width: 108, // 3:1 Verhältnis vom Original 2172:724
    objectFit: "contain",
  },
  domain: {
    fontSize: 9,
    color: "#6D6E72",
    marginTop: 6,
  },
  docTitle: {
    fontSize: 10,
    color: "#6D6E72",
    textAlign: "right",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  docDate: {
    fontSize: 9,
    color: "#6D6E72",
    textAlign: "right",
    marginTop: 2,
  },
  heroImage: {
    width: "100%",
    height: 320,
    objectFit: "contain",
    marginBottom: 20,
  },
  titleBlock: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    letterSpacing: -0.5,
    color: "#0A0B0C",
  },
  variant: {
    fontSize: 11,
    color: "#6D6E72",
    marginTop: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#D4D2CC",
  },
  priceLabel: {
    fontSize: 9,
    color: "#6D6E72",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  price: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#D01A20",
  },
  priceHint: {
    fontSize: 9,
    color: "#6D6E72",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#6D6E72",
    marginBottom: 10,
    marginTop: 10,
  },
  specGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
  },
  specCell: {
    width: "33.33%",
    marginBottom: 12,
    paddingRight: 12,
  },
  specLabel: {
    fontSize: 8,
    color: "#6D6E72",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  specValue: {
    fontSize: 11,
    color: "#0A0B0C",
  },
  featureList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  featureItem: {
    width: "50%",
    paddingRight: 10,
    marginBottom: 5,
    fontSize: 10,
    color: "#0A0B0C",
  },
  bullet: {
    color: "#D01A20",
  },
  description: {
    fontSize: 10,
    color: "#26272A",
    lineHeight: 1.5,
    marginBottom: 16,
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  galleryImage: {
    width: "33.33%",
    height: 85,
    padding: 2,
    objectFit: "cover",
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#D4D2CC",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 24,
    fontSize: 8,
    color: "#6D6E72",
  },
  footerLeft: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: 380,
    lineHeight: 1.5,
  },
  footerRight: {
    flexShrink: 0,
    textAlign: "right",
  },
  watermarkWrap: {
    position: "absolute",
    top: -120,
    left: -120,
    right: -120,
    bottom: -120,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    opacity: 0.05,
    transform: "rotate(-22deg)",
  },
  watermarkTile: {
    width: 110,
    height: 38,
    objectFit: "contain",
    marginHorizontal: 20,
    marginVertical: 18,
  },
});

const EURO_FORMAT = new Intl.NumberFormat("de-DE");

export type VehicleExposePDFProps = {
  vehicle: Vehicle;
  siteOrigin?: string;
};

export function VehicleExposePDF({ vehicle: v, siteOrigin = "https://neue-welt-automobile.de" }: VehicleExposePDFProps) {
  const detailUrl = `${siteOrigin}/fahrzeuge/${v.slug}`;
  const today = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const hero = v.image || v.images?.[0];
  const extraImages = (v.images ?? []).filter((img) => img !== hero).slice(0, 9);

  const watermarkUrl = `${siteOrigin}/brand/logo.png`;

  return (
    <Document title={`Exposé ${v.brand} ${v.model}`} author={SITE.name}>
      <Page size="A4" style={styles.page}>
        {/* Wasserzeichen – gekacheltes Logo-Muster auf jeder Seite im Hintergrund */}
        <View style={styles.watermarkWrap} fixed>
          {Array.from({ length: 60 }).map((_, i) => (
            <Image key={`wm-${i}`} src={watermarkUrl} style={styles.watermarkTile} />
          ))}
        </View>

        <View style={styles.headerRow}>
          <View>
            <Image src={`${siteOrigin}/brand/logo.png`} style={styles.headerLogo} />
            <Text style={styles.domain}>{SITE.domain}</Text>
          </View>
          <View>
            <Text style={styles.docTitle}>Fahrzeug-Exposé</Text>
            <Text style={styles.docDate}>Stand {today}</Text>
          </View>
        </View>

        {hero ? <Image src={hero} style={styles.heroImage} /> : null}

        <View style={styles.titleBlock}>
          <Text style={styles.title}>{v.brand} {v.model}</Text>
          {v.variant ? <Text style={styles.variant}>{v.variant}</Text> : null}
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceLabel}>Preis</Text>
            {v.vatable ? (
              <Text style={styles.priceHint}>
                Brutto · inkl. {v.vatRate ? Math.round(v.vatRate * 100) : 19}% MwSt. ausweisbar · Netto {EURO_FORMAT.format(Math.round(v.price / (1 + (v.vatRate ?? 0.19))))} €
              </Text>
            ) : (
              <Text style={styles.priceHint}>
                Differenzbesteuert §25a UStG · MwSt. nicht ausweisbar
              </Text>
            )}
          </View>
          <Text style={styles.price}>{EURO_FORMAT.format(v.price)} €</Text>
        </View>

        {v.description ? (
          <>
            <Text style={styles.sectionTitle}>Beschreibung</Text>
            <Text style={styles.description}>{v.description}</Text>
          </>
        ) : null}

        <Text style={styles.sectionTitle}>Fahrzeugdaten</Text>
        <View style={styles.specGrid}>
          <SpecCell label="Erstzulassung" value={v.firstRegistration ?? String(v.year)} />
          <SpecCell label="Kilometerstand" value={`${EURO_FORMAT.format(v.mileage)} km`} />
          <SpecCell label="Kraftstoff" value={v.fuel} />
          <SpecCell label="Leistung" value={`${v.power} kW (${Math.round(v.power * 1.36)} PS)`} />
          <SpecCell label="Getriebe" value={v.gearbox} />
          <SpecCell label="Farbe" value={v.color} />
        </View>

        {v.highlights && v.highlights.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Ausstattung · Auszug</Text>
            <View style={styles.featureList}>
              {v.highlights.map((h) => (
                <Text key={h} style={styles.featureItem}>
                  <Text style={styles.bullet}>·</Text> {h}
                </Text>
              ))}
            </View>
          </>
        ) : null}

        {extraImages.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Weitere Bilder</Text>
            <View style={styles.galleryGrid}>
              {extraImages.map((img, i) => (
                <Image key={`${img}-${i}`} src={img} style={styles.galleryImage} />
              ))}
            </View>
          </>
        ) : null}

        <View style={styles.footer} fixed>
          <View style={styles.footerLeft}>
            <Text>
              {SITE.name} · {SITE.address.line1} · {SITE.address.line2}
            </Text>
            <Text>
              {SITE.contact.phoneLandline} · {SITE.contact.email}
            </Text>
          </View>
          <View style={styles.footerRight}>
            <Link src={detailUrl}>
              <Text>{SITE.domain}</Text>
            </Link>
          </View>
        </View>
      </Page>
    </Document>
  );
}

function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.specCell}>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}
