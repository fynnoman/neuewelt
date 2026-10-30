export default function ImpressumPage() {
  return (
    <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14">
      <div className="mx-auto measure-wide" style={{ maxWidth: 720 }}>
        <div className="small-caps">Impressum</div>
        <h1 className="display mt-6" style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}>
          Angaben gemäß § 5 DDG
        </h1>

        <section
          className="mt-14"
          style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-soft)" }}
        >
          <h2 className="display" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Anbieter
          </h2>
          <p className="mt-3">
            Neue Welt Automobile
            <br />
            Inhaber: Muezefer Kazan
            <br />
            Provinzialstraße 144
            <br />
            66740 Saarlouis-Lisdorf
            <br />
            Deutschland
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Kontakt
          </h2>
          <p className="mt-3">
            Festnetz: +49 6831 1658597
            <br />
            Mobil: +49 174 2611090
            <br />
            E-Mail:{" "}
            <a
              href="mailto:neueweltautomobile@outlook.de"
              style={{ color: "var(--ink)", textDecoration: "underline" }}
            >
              neueweltautomobile@outlook.de
            </a>
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Umsatzsteuer-Identifikationsnummer
          </h2>
          <p className="mt-3">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
            <br />
            DE271195562
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Redaktionell verantwortlich (§ 18 Abs. 2 MStV)
          </h2>
          <p className="mt-3">
            Muezefer Kazan
            <br />
            Provinzialstraße 144
            <br />
            66740 Saarlouis-Lisdorf
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Verbraucherstreitbeilegung · EU-Streitschlichtung
          </h2>
          <p className="mt-3">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--ink)", textDecoration: "underline" }}
            >
              ec.europa.eu/consumers/odr/
            </a>
            . Unsere E-Mail-Adresse finden Sie oben unter „Kontakt".
          </p>
          <p className="mt-4">
            Wir sind nicht bereit und nicht verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen (§ 36 VSBG).
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Haftung für Inhalte
          </h2>
          <p className="mt-3">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
            Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
            verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
            jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf
            eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
            Entfernung oder Sperrung der Nutzung von Informationen nach den
            allgemeinen Gesetzen bleiben hiervon unberührt. Eine
            diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
            Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden entsprechender Rechtsverletzungen werden wir diese
            Inhalte umgehend entfernen.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Haftung für Links
          </h2>
          <p className="mt-3">
            Unser Angebot enthält Links zu externen Websites Dritter, auf
            deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
            diese fremden Inhalte auch keine Gewähr übernehmen. Für die
            Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
            oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
            wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
            überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
            Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle
            der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer
            Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Urheberrecht
          </h2>
          <p className="mt-3">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors beziehungsweise
            Erstellers. Downloads und Kopien dieser Seite sind nur für den
            privaten, nicht kommerziellen Gebrauch gestattet. Soweit die
            Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
            werden die Urheberrechte Dritter beachtet. Insbesondere werden
            Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem
            auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um
            einen entsprechenden Hinweis. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Inhalte umgehend
            entfernen.
          </p>
        </section>
      </div>
    </main>
  );
}
