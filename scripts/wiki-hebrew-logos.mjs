import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "partners");

async function wikiLogo(heTitle, outName) {
  const api = `https://he.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(heTitle)}&prop=pageimages&piprop=original&format=json`;
  const res = await fetch(api);
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  const url = page.original?.source;
  if (!url) throw new Error("no image");
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  const ext = url.endsWith(".svg") ? "svg" : url.endsWith(".png") ? "png" : "jpg";
  fs.writeFileSync(path.join(outDir, `${outName}.${ext}`), buf);
  console.log(`OK ${outName} ${buf.length}b ${url}`);
}

for (const [title, name] of [
  ["מיטב דש", "meitav"],
  ["ילין לפידות", "yelin-lapidot"],
  ["כלל ביטוח", "clal"],
  ["אלטשולר שחם", "altshuler"],
  ["בית השקעות איביאי", "ibi"],
]) {
  try {
    await wikiLogo(title, name);
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`);
  }
}
