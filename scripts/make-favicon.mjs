import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Logo-dark hat den gefüllten roten Nürburgring (mit NEUE WELT als Knockout).
// Für ein Favicon-Zeichen reicht die reine rote Silhouette.
const src = path.join(root, "public/brand/logo-dark.png");
const outIcon = path.join(root, "app/icon.png");
const outApple = path.join(root, "app/apple-icon.png");

// Ring sitzt im oberen linken Bereich (ca. 60–780 x, 40–720 y).
const CROP = { left: 50, top: 30, width: 760, height: 700 };

function isRedish(r, g, b, a) {
  if (a < 20) return false;
  // Rotdominant: r klar größer als g und b
  return r > 80 && r > g + 30 && r > b + 30;
}

async function build() {
  // Rohdaten des Crop-Bereichs holen
  const { data, info } = await sharp(src)
    .extract(CROP)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const mask = new Uint8Array(width * height);

  // Initiale Maske: 1 wenn rot, 0 sonst
  for (let p = 0, i = 0; p < mask.length; p++, i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    mask[p] = isRedish(r, g, b, a) ? 1 : 0;
  }

  // Flood-Fill vom Rand: alle 0-Pixel die von außen erreichbar sind = Hintergrund
  // Alles andere (Löcher im Logo durch den Textknockout) wird auch Teil des Logos.
  const outside = new Uint8Array(mask.length);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (outside[idx] || mask[idx]) return;
    outside[idx] = 1;
    stack.push(x, y);
  };
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // Alles, was nicht "outside" ist, wird schwarz gefüllt (Logo + eingeschlossene Löcher)
  for (let p = 0, i = 0; p < mask.length; p++, i += channels) {
    if (!outside[p]) {
      data[i] = 0x0a;
      data[i + 1] = 0x0b;
      data[i + 2] = 0x0c;
      data[i + 3] = 255;
    } else {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = 0;
    }
  }

  const filled = await sharp(data, {
    raw: { width, height, channels },
  })
    .png()
    .toBuffer();

  // Trim transparente Ränder, dann quadratisch mit kleinem Padding
  const trimmed = await sharp(filled)
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 }, threshold: 10 })
    .toBuffer();

  const meta = await sharp(trimmed).metadata();
  const w = meta.width ?? 512;
  const h = meta.height ?? 512;
  const side = Math.max(w, h);
  const pad = Math.round(side * 0.14);
  const target = side + pad * 2;

  const square = await sharp(trimmed)
    .resize({
      width: target,
      height: target,
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp(square)
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(outIcon);

  await sharp(square)
    .resize(180, 180)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png({ compressionLevel: 9 })
    .toFile(outApple);

  console.log("icon.png and apple-icon.png written.");
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
