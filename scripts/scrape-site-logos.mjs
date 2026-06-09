import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "partners");

const sites = {
  analyst: ["https://www.analyst.co.il", "https://www.analyst.co.il/en"],
  meitav: ["https://www.meitavdash.co.il", "https://www.meitavdash.co.il/he"],
  altshuler: ["https://www.altshuler.co.il", "https://www.as-invest.co.il"],
  "yelin-lapidot": ["https://www.yl-invest.co.il"],
  more: ["https://www.moreinvest.co.il", "https://www.more.co.il"],
  ibi: ["https://www.ibi.co.il"],
};

function scoreLogo(url) {
  const u = url.toLowerCase();
  let s = 0;
  if (u.includes("logo")) s += 10;
  if (u.includes("brand")) s += 5;
  if (u.endsWith(".svg")) s += 3;
  if (u.endsWith(".png")) s += 2;
  if (u.includes("hero") || u.includes("banner") || u.includes("desktop")) s -= 20;
  if (u.includes("favicon")) s -= 10;
  return s;
}

async function findLogos(siteUrl) {
  const res = await fetch(siteUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; CubeFinancialGroup/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`site ${res.status}`);
  const html = await res.text();
  const urls = new Set();
  for (const m of html.matchAll(/(?:src|href)="([^"]+\.(?:png|svg|jpg|jpeg|webp)(?:\?[^"]*)?)"/gi)) {
    try {
      urls.add(new URL(m[1], siteUrl).toString());
    } catch {}
  }
  return [...urls].sort((a, b) => scoreLogo(b) - scoreLogo(a)).slice(0, 8);
}

async function download(name, url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; CubeFinancialGroup/1.0)" },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 800) throw new Error("too small");
  let ext = "png";
  if (url.toLowerCase().includes(".svg") || buf.slice(0, 200).toString().includes("<svg")) ext = "svg";
  fs.writeFileSync(path.join(outDir, `${name}.${ext}`), buf);
  return buf.length;
}

for (const [name, urls] of Object.entries(sites)) {
  let done = false;
  for (const site of urls) {
    try {
      const candidates = await findLogos(site);
      console.log(`\n${name} candidates from ${site}:`);
      for (const c of candidates) console.log(" ", scoreLogo(c), c);
      for (const c of candidates) {
        if (scoreLogo(c) < 5) continue;
        try {
          const bytes = await download(name, c);
          console.log(`OK ${name} ${bytes}b`);
          done = true;
          break;
        } catch (e) {
          console.log(` skip ${e.message}`);
        }
      }
      if (done) break;
    } catch (e) {
      console.log(`FAIL ${name} scrape ${site}: ${e.message}`);
    }
  }
}
