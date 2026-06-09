import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "partners");

const tries = {
  meitav: [
    "https://www.meitavdash.co.il/Content/images/logo.png",
    "https://www.meitavdash.co.il/content/images/logo.png",
    "https://cdn.meitavdash.co.il/logo.png",
    "https://www.meitavdash.co.il/assets/logo.svg",
    "https://www.meitavdash.co.il/logo.svg",
    "https://www.meitav.co.il/logo.svg",
    "https://www.meitav.co.il/wp-content/themes/meitav/assets/img/logo.svg",
    "https://www.meitavdash.com/logo.png",
  ],
  "yelin-lapidot": [
    "https://www.yl-invest.co.il/Content/images/logo.png",
    "https://www.yl-invest.co.il/assets/images/logo.png",
    "https://www.yl-invest.co.il/wp-content/uploads/logo.png",
    "https://www.meitavdash.co.il/Content/images/yelin-logo.png",
    "https://www.meitavdash.co.il/Content/images/logo-yelin.png",
  ],
};

async function save(name, url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(String(res.status));
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error("small");
  const ext = url.includes(".svg") || buf.toString("utf8", 0, 200).includes("<svg") ? "svg" : "png";
  fs.writeFileSync(path.join(outDir, `${name}.${ext}`), buf);
  console.log(`OK ${name} ${buf.length}b ${url}`);
}

for (const [name, urls] of Object.entries(tries)) {
  let ok = false;
  for (const url of urls) {
    try {
      await save(name, url);
      ok = true;
      break;
    } catch (e) {
      console.log(`FAIL ${name}: ${e.message}`);
    }
  }
  if (!ok) {
  // scrape homepage img tags containing logo/yelin/meitav
    const home = name === "meitav" ? "https://www.meitavdash.co.il" : "https://www.yl-invest.co.il";
    try {
      const res = await fetch(home, { headers: { "User-Agent": "Mozilla/5.0" } });
      const html = await res.text();
      const imgs = [...html.matchAll(/(?:src|data-src)="([^"]+)"/gi)].map((m) => m[1]);
      for (const rel of imgs) {
        if (!/logo|yelin|yl-|lapidot|meitav/i.test(rel)) continue;
        const url = new URL(rel, home).toString();
        try {
          await save(name, url);
          ok = true;
          break;
        } catch {}
      }
    } catch (e) {
      console.log(`scrape fail ${name}`, e.message);
    }
  }
}
