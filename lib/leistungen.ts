export type Leistung = {
  id: string; // slug
  title: string;
  body: string;
};

export const LEISTUNGEN: Leistung[] = [
  {
    id: "fahrzeugankauf",
    title: "Fahrzeugankauf",
    body: "Wir kaufen Ihr Fahrzeug zum fairen Marktpreis an oder nehmen es in Zahlung. Angebot innerhalb von Minuten.",
  },
  {
    id: "neuwagenbeschaffung",
    title: "Neuwagenbeschaffung",
    body: "Beschaffung Ihres Wunschfahrzeugs direkt vom Hersteller. Konfiguration, Lieferung und Zulassung auf Wunsch.",
  },
  {
    id: "finanzierung",
    title: "Finanzierung über die Targobank",
    body: "Laufzeiten von 6 bis 96 Monaten, mit oder ohne Schlussrate, auf Wunsch auch ohne Anzahlung. Unverbindliches Angebot innerhalb von Minuten.",
  },
  {
    id: "fahrzeugaufbereitung",
    title: "Fahrzeugaufbereitung",
    body: "Professionelle Innen- und Außenpflege mit hochwertigen Mitteln. Pauschale Pakete oder individuelles Angebot nach Wunsch.",
  },
  {
    id: "gebrauchtwagen-check",
    title: "Gebrauchtwagen-Check",
    body: "Zertifizierter Check durch eine unabhängige Prüforganisation. Zustandsbericht und Prüfzertifikat gegen Aufpreis.",
  },
  {
    id: "zulassungsservice",
    title: "Zulassungsservice",
    body: "Wir übernehmen die bundesweite Anmeldung inklusive Wunschkennzeichen. Auch Kurzzeitkennzeichen für die Überführung möglich.",
  },
  {
    id: "fahrzeugueberfuehrung",
    title: "Fahrzeugüberführung deutschlandweit",
    body: "Bundesweite Lieferung bis vor Ihre Haustür. Auf Wunsch im geschlossenen Fahrzeuganhänger.",
  },
  {
    id: "kfz-export",
    title: "Kfz-Export",
    body: "Erfahrene Abwicklung des Fahrzeugexports in Ihr Heimatland inklusive Ausstellung des Ausfuhrbegleitdokuments.",
  },
  {
    id: "folierung-scheibentoenung",
    title: "Fahrzeugfolierungen und Scheibentönung",
    body: "Vollfolierung, Teilfolierung und Scheibentönung in Studio-Qualität. Farbe, Finish und Umfang nach Absprache.",
  },
  {
    id: "garantie",
    title: "Garantie bis zu 36 Monate",
    body: "Erweiterte Fahrzeuggarantie mit Laufzeit bis zu 36 Monaten. Umfang und Preis auf Anfrage.",
  },
];

export function getLeistung(slug: string): Leistung | undefined {
  return LEISTUNGEN.find((l) => l.id === slug);
}
