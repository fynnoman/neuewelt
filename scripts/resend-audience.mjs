// Hilfs-Script: listet Resend-Audiences bzw. legt eine neue an.
// Aufruf:
//   node scripts/resend-audience.mjs list   RESEND_KEY
//   node scripts/resend-audience.mjs create RESEND_KEY "Fahrzeug-Newsletter"
import { Resend } from "resend";

const [, , cmd, apiKey, name] = process.argv;

if (!cmd || !apiKey) {
  console.log("Nutzung:");
  console.log("  node scripts/resend-audience.mjs list RESEND_KEY");
  console.log("  node scripts/resend-audience.mjs create RESEND_KEY 'Audience-Name'");
  process.exit(1);
}

const resend = new Resend(apiKey);

try {
  if (cmd === "list") {
    const res = await resend.audiences.list();
    console.log(JSON.stringify(res, null, 2));
  } else if (cmd === "create") {
    const res = await resend.audiences.create({ name: name || "Fahrzeug-Newsletter" });
    console.log(JSON.stringify(res, null, 2));
  } else {
    console.error("Unbekanntes Kommando:", cmd);
    process.exit(1);
  }
} catch (err) {
  console.error("FEHLER:", err);
  process.exit(1);
}
