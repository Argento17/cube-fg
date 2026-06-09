import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "partners");

const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 60000);

try {
  const res = await fetch("https://www.meitavdash.co.il", {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    signal: controller.signal,
  });
  clearTimeout(timer);
  const html = await res.text();
  console.log("status", res.status, "len", html.length);
  const matches = [...html.matchAll(/(?:src|data-src|href)="([^"]+)"/g)].map((m) => m[1]);
  for (const rel of matches) {
    if (!/logo|meitav|svg|png|media/i.test(rel)) continue;
    console.log(rel);
    try {
      const url = new URL(rel, "https://www.meitavdash.co.il").toString();
      const img = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!img.ok) continue;
      const buf = Buffer.from(await img.arrayBuffer());
      if (buf.length < 800) continue;
      const ext = url.includes(".svg") ? "svg" : "png";
      fs.writeFileSync(path.join(outDir, `meitav.${ext}`), buf);
      console.log("SAVED meitav", buf.length);
      break;
    } catch {}
  }
} catch (e) {
  clearTimeout(timer);
  console.error(e.message);
}
