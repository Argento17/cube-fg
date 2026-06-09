import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "partners");

const pages = {
  harel: "https://companieslogo.com/harel-group/logo/",
  phoenix: "https://companieslogo.com/the-phoenix-holdings-ltd/logo/",
  menorah: "https://companieslogo.com/menora-mivtachim-holdings/logo/",
  migdal: "https://companieslogo.com/migdal-insurance-and-financial-holdings/logo/",
};

function pickSvg(html) {
  const m = [...html.matchAll(/href="(\/img\/orig\/[^"]+\.svg[^"]*)"/g)].find(
    (x) => !x[1].includes("_BIG") && !x[1].includes(".D-"),
  );
  return m?.[1];
}

for (const [name, pageUrl] of Object.entries(pages)) {
  const res = await fetch(pageUrl);
  const html = await res.text();
  const rel = pickSvg(html);
  if (!rel) {
    console.log("FAIL", name, "no svg");
    continue;
  }
  const imgUrl = new URL(rel, pageUrl).toString();
  const imgRes = await fetch(imgUrl);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  fs.writeFileSync(path.join(outDir, `${name}.svg`), buf);
  try {
    fs.unlinkSync(path.join(outDir, `${name}.png`));
  } catch {}
  console.log("OK", name, buf.length);
}
