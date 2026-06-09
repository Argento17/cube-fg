import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "partners");

const direct = {
  clal: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Clal-bit.png",
  altshuler:
    "https://www.as-invest.co.il/media/3hepz0dh/%D7%9C%D7%95%D7%92%D7%95-%D7%90%D7%AA%D7%A8-%D7%A9%D7%99%D7%95%D7%95%D7%A7%D7%99-%D7%90%D7%93%D7%A8.png",
  meitav: "https://www.meitav.co.il/wp-content/uploads/2020/09/logo.svg",
  "yelin-lapidot": "https://www.meitav.co.il/wp-content/uploads/2020/09/yelin-lapidot-logo.svg",
  hachshara: "https://www.hcsra.co.il/media/0qbpk2zq/hachshara-logo.png",
};

async function save(name, url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; CubeFinancialGroup/1.0)" },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error(`too small (${buf.length})`);
  let ext = "png";
  const lower = url.toLowerCase();
  if (lower.includes(".svg") || buf.slice(0, 200).toString().includes("<svg")) ext = "svg";
  else if (lower.includes(".jpg") || lower.includes(".jpeg")) ext = "jpg";
  const dest = path.join(outDir, `${name}.${ext}`);
  fs.writeFileSync(dest, buf);
  return { dest, bytes: buf.length };
}

async function scrapeHcsra() {
  const res = await fetch("https://www.hcsra.co.il", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const html = await res.text();
  const urls = [...html.matchAll(/https:\/\/umbraco-api\.hcsra\.co\.il\/media\/[^"'\\s]+/g)].map((m) => m[0]);
  for (const url of urls) {
    if (!/logo|hachshara|הכשרה/i.test(url)) continue;
    try {
      const r = await save("hachshara", url);
      console.log(`OK hachshara scraped ${r.bytes}b`, url);
      return;
    } catch {}
  }
  throw new Error("no hachshara candidate");
}

for (const [name, url] of Object.entries(direct)) {
  try {
    const r = await save(name, url);
    console.log(`OK ${name} ${r.bytes}b`);
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`);
  }
}

try {
  await scrapeHcsra();
} catch (e) {
  console.log(`FAIL hachshara scrape: ${e.message}`);
}

// cleanup duplicate/placeholder assets
for (const file of ["clal.svg", "harel.svg", "phoenix.svg", "yelin-lapidot.svg", "ibi.jpg", "more.jpg", "more.png"]) {
  const p = path.join(outDir, file);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log("removed", file);
  }
}
