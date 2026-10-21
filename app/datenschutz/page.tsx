export default function DatenschutzPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-10 lg:px-14">
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
            Diese Website erhebt grundsätzlich keine personenbezogenen Daten,
            außer Sie geben sie uns ausdrücklich (z. B. im Ankauf-Formular, per
            Mail oder Telefon). Es werden keine Tracking-Cookies gesetzt, keine
            Analyse-Dienste eingebunden und keine Daten an Dritte weitergegeben.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Was passiert mit meiner Ankauf-Anfrage?
          </h2>
          <p className="mt-3">
            Das Formular öffnet lediglich Ihr Mailprogramm mit den Angaben
            zusammengefasst. Die Daten verlassen den Browser erst, wenn Sie
            die Mail absenden. Wir speichern Ihre Angaben ausschließlich zur
            Bearbeitung Ihrer Anfrage und löschen sie, sobald der Vorgang
            abgeschlossen ist.
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Hosting
          </h2>
          <p className="mt-3">
            Diese Seite wird bei [Hoster] in [Rechenzentrumsstandort] gehostet.
            Beim Aufruf werden technisch notwendige Daten (IP-Adresse,
            Zeitstempel, aufgerufene Seite) im Server-Log gespeichert und nach
            7 Tagen automatisch gelöscht.
          </p>

          <p className="mt-10" style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            Platzhalter-Inhalt. Vor dem Launch durch eine vollständige, rechtlich
            geprüfte Datenschutzerklärung ersetzen.
          </p>
        </section>
      </div>
    </main>
  );
}
