export default function DatenschutzPage() {
  return (
    <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14">
      <div className="mx-auto measure-wide" style={{ maxWidth: 720 }}>
        <div className="small-caps">Datenschutz</div>
        <h1 className="display mt-6" style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}>
          Datenschutzerklärung
        </h1>

        <section
          className="mt-14"
          style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-soft)" }}
        >
          <p>
            Nachfolgend informieren wir Sie über Art, Umfang und Zweck der
            Verarbeitung personenbezogener Daten bei der Nutzung dieser
            Website. Die Verarbeitung erfolgt im Einklang mit der
            Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz
            (BDSG).
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            1. Verantwortlicher
          </h2>
          <p className="mt-3">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
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
            <br />
            Telefon: +49 6831 1658597
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
            2. Allgemeines zur Datenverarbeitung
          </h2>
          <p className="mt-3">
            Wir verarbeiten personenbezogene Daten unserer Nutzer
            grundsätzlich nur, soweit dies zur Bereitstellung einer
            funktionsfähigen Website sowie unserer Inhalte und Leistungen
            erforderlich ist. Rechtsgrundlagen sind je nach Zweck Artikel 6
            Absatz 1 Buchstabe a, b, c oder f DSGVO.
          </p>
          <p className="mt-3">
            Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken
            ein. Es werden keine Tracking-Dienste, keine Analyse-Tools und
            keine Werbenetzwerke eingebunden.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            3. Hosting und Server-Logfiles
          </h2>
          <p className="mt-3">
            Diese Website wird auf der Infrastruktur der Vercel Inc., 440 N
            Barranca Avenue #4133, Covina, CA 91723, USA, gehostet. Vercel
            betreibt Rechenzentren innerhalb der Europäischen Union; eine
            Übermittlung in die USA kann im Rahmen des Betriebs nicht
            ausgeschlossen werden. Vercel Inc. ist unter dem EU-U.S. Data
            Privacy Framework zertifiziert; ergänzend wurden
            Standardvertragsklauseln gemäß Art. 46 Abs. 2 DSGVO vereinbart.
          </p>
          <p className="mt-3">
            Beim Aufruf der Website werden durch den Hoster automatisch
            Informationen in sogenannten Server-Logfiles erfasst, die Ihr
            Browser übermittelt. Dies sind:
          </p>
          <ul className="mt-3 pl-6" style={{ listStyle: "disc" }}>
            <li>IP-Adresse des anfragenden Geräts</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Name und URL der abgerufenen Datei</li>
            <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
            <li>Verwendeter Browser und ggf. Betriebssystem</li>
          </ul>
          <p className="mt-3">
            Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. f
            DSGVO. Unser berechtigtes Interesse liegt in der technisch
            fehlerfreien Darstellung und der Sicherheit der Website. Die Daten
            werden spätestens nach 30 Tagen gelöscht, soweit sie nicht zur
            Aufklärung konkreter Sicherheitsvorfälle weiter benötigt werden.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            4. Fahrzeugankauf-Formular
          </h2>
          <p className="mt-3">
            Wenn Sie uns über das Ankauf-Formular Angaben zu einem Fahrzeug
            übermitteln, verarbeiten wir die von Ihnen eingegebenen Daten
            (insbesondere Name, E-Mail-Adresse, optional Telefonnummer sowie
            Angaben zum angebotenen Fahrzeug) ausschließlich zur Bearbeitung
            Ihrer Anfrage und zur Vorbereitung eines möglichen Kaufvertrages.
          </p>
          <p className="mt-3">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
            (vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an der Beantwortung Ihrer Anfrage). Die
            Daten werden gelöscht, sobald der Vorgang abgeschlossen ist und
            keine gesetzlichen Aufbewahrungspflichten entgegenstehen (regelmäßig
            6 bzw. 10 Jahre nach § 147 AO, § 257 HGB bei vertragsrelevanten
            Unterlagen).
          </p>
          <p className="mt-3">
            Für den technischen Versand der aus dem Formular generierten
            E-Mail setzen wir den Dienst Resend ein (Resend, Inc., 2261 Market
            Street #4471, San Francisco, CA 94114, USA). Resend verarbeitet in
            unserem Auftrag die zum Mailversand erforderlichen Daten. Resend
            ist unter dem EU-U.S. Data Privacy Framework zertifiziert;
            ergänzend wurden Standardvertragsklauseln gemäß Art. 46 Abs. 2
            DSGVO vereinbart. Mit Resend besteht ein
            Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            5. Kontaktaufnahme per E-Mail, Telefon oder WhatsApp
          </h2>
          <p className="mt-3">
            Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren,
            werden Ihre Angaben zur Bearbeitung Ihrer Anfrage und für den
            Fall von Anschlussfragen bei uns gespeichert. Rechtsgrundlage ist
            Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf einen Vertrag
            abzielt, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Diese Daten geben
            wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p className="mt-3">
            Beim Kontakt über WhatsApp wird die Kommunikation über die Server
            der WhatsApp Ireland Ltd., 4 Grand Canal Square, Grand Canal
            Harbour, Dublin 2, Irland, abgewickelt. Auf Umfang und Zweck der
            dortigen Datenverarbeitung haben wir keinen Einfluss. Weitere
            Informationen finden Sie in der Datenschutzerklärung von
            WhatsApp.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            6. Fahrzeugbestand von mobile.de
          </h2>
          <p className="mt-3">
            Der auf dieser Website dargestellte Fahrzeugbestand wird über die
            Search-API der mobile.de GmbH, Marktplatz 1, 14532 Europarc
            Dreilinden, Deutschland, abgerufen. Die Abfrage erfolgt
            serverseitig durch unsere Website. An mobile.de werden hierbei
            keine personenbezogenen Daten unserer Website-Besucher
            übermittelt. Es werden ausschließlich Fahrzeugdaten (z. B. Marke,
            Modell, Preis, Ausstattung, Fotos) empfangen und dargestellt.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            7. Externe Links · Social Media
          </h2>
          <p className="mt-3">
            Unsere Website enthält Links zu externen Diensten (z. B. Instagram,
            Facebook, WhatsApp, Google Maps). Diese Links werden erst durch
            Ihren Klick aktiv; vorher werden keine Daten an die jeweiligen
            Anbieter übermittelt. Nach dem Klick gelten die
            Datenschutzbestimmungen der jeweiligen Anbieter.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            8. Übermittlung in Drittländer
          </h2>
          <p className="mt-3">
            Soweit wir Dienstleister (insbesondere Vercel, Resend) einsetzen,
            die ihren Sitz außerhalb der Europäischen Union oder des
            Europäischen Wirtschaftsraums haben, erfolgt eine Übermittlung
            personenbezogener Daten in Drittländer nur, wenn ein angemessenes
            Datenschutzniveau gewährleistet ist. Dies ist bei den oben
            genannten US-Anbietern durch die Zertifizierung unter dem
            EU-U.S. Data Privacy Framework sowie durch den Abschluss von
            EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 DSGVO
            sichergestellt.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            9. Ihre Rechte als betroffene Person
          </h2>
          <p className="mt-3">
            Sie haben uns gegenüber folgende Rechte hinsichtlich der Sie
            betreffenden personenbezogenen Daten:
          </p>
          <ul className="mt-3 pl-6" style={{ listStyle: "disc" }}>
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>
              Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für
              die Zukunft (Art. 7 Abs. 3 DSGVO)
            </li>
          </ul>
          <p className="mt-3">
            Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an die
            oben genannten Kontaktdaten.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            10. Beschwerderecht bei einer Aufsichtsbehörde
          </h2>
          <p className="mt-3">
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichts­­­­­behörde
            über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
            Für uns zuständig ist:
          </p>
          <p className="mt-3">
            Unabhängiges Datenschutzzentrum Saarland
            <br />
            Die Landesbeauftragte für Datenschutz und Informationsfreiheit
            <br />
            Fritz-Dobisch-Straße 12
            <br />
            66111 Saarbrücken
            <br />
            Telefon: +49 681 94781-0
            <br />
            E-Mail:{" "}
            <a
              href="mailto:poststelle@datenschutz.saarland.de"
              style={{ color: "var(--ink)", textDecoration: "underline" }}
            >
              poststelle@datenschutz.saarland.de
            </a>
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            11. Widerspruch gegen Direktwerbung und Verarbeitung nach Art. 6 Abs. 1 lit. f DSGVO
          </h2>
          <p className="mt-3">
            Soweit die Verarbeitung Ihrer Daten auf einer Interessenabwägung
            nach Art. 6 Abs. 1 lit. f DSGVO beruht, können Sie der
            Verarbeitung jederzeit widersprechen. Die Gründe müssen sich aus
            Ihrer besonderen Situation ergeben. Gegen die Verarbeitung zum
            Zweck der Direktwerbung können Sie jederzeit ohne Angabe von
            Gründen widersprechen.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            12. Datensicherheit · SSL-Verschlüsselung
          </h2>
          <p className="mt-3">
            Diese Website nutzt aus Gründen der Sicherheit und zum Schutz der
            Übertragung vertraulicher Inhalte eine SSL/TLS-Verschlüsselung.
            Eine verschlüsselte Verbindung erkennen Sie an der Zeichenfolge
            „https://" sowie am Schloss-Symbol in Ihrer Browserzeile.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            13. Aktualität und Änderung dieser Datenschutzerklärung
          </h2>
          <p className="mt-3">
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
            Oktober 2026. Durch Weiterentwicklung unserer Website oder
            geänderte gesetzliche beziehungsweise behördliche Vorgaben kann es
            notwendig werden, diese Datenschutzerklärung anzupassen. Die
            jeweils aktuelle Fassung finden Sie jederzeit unter diesem Link.
          </p>
        </section>
      </div>
    </main>
  );
}
