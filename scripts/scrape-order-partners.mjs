import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "partners");

const res = await fetch("https://order-ins.co.il/", {
  headers: { "User-Agent": "Mozilla/5.0" },
});
const html = await res.text();
const imgs = [...html.matchAll(/https:\/\/[^"'\\s]+\.(?:png|svg|jpg|webp)(?:\?[^"'\\s]*)?/gi)].map((m) => m[0]);
const unique = [...new Set(imgs)];
console.log("found", unique.length, "images");
for (const u of unique) console.log(u);
