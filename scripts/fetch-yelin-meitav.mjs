import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "partners");

async function dumpImages(label, url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  const imgs = [...html.matchAll(/(?:src|data-src|content)="([^"]+\.(?:png|svg|jpg|webp)[^"]*)"/gi)].map(
    (m) => {
      try {
        return new URL(m[1].replace(/&amp;/g, "&"), url).toString();
      } catch {
        return null;
      }
    },
  ).filter(Boolean);
  console.log(`\n${label} (${imgs.length} images):`);
  for (const i of imgs.filter((u) => /logo|meitav|yelin|yl-|lapidot|media|upload/i.test(u))) {
    console.log(" ", i);
  }
  return imgs;
}

async function trySave(name, url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(String(res.status));
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error("small");
  const ext = url.includes(".svg") || buf.toString("utf8", 0, 100).includes("<svg") ? "svg" : "png";
  fs.writeFileSync(path.join(outDir, `${name}.${ext}`), buf);
  console.log(`SAVED ${name}.${ext} ${buf.length}b`);
}

await dumpImages("yl-invest", "https://www.yl-invest.co.il");
await dumpImages("meitavdash", "https://www.meitavdash.co.il");

// Clal SVG from wikimedia
const clalSvgApi = await fetch(
  "https://commons.wikimedia.org/w/api.php?action=query&titles=File:%D7%9C%D7%95%D7%92%D7%95_%D7%9B%D7%9C%D7%9C_%D7%91%D7%99%D7%98%D7%95%D7%97.svg&prop=imageinfo&iiprop=url&format=json",
);
const clalData = await clalSvgApi.json();
const clalUrl = Object.values(clalData.query.pages)[0].imageinfo?.[0]?.url;
if (clalUrl) {
  await trySave("clal", clalUrl);
  try {
    fs.unlinkSync(path.join(outDir, "clal.png"));
    console.log("removed oversized clal.png");
  } catch {}
}
