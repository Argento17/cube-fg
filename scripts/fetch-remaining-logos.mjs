import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "partners");

const sources = {
  clal: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Clal-bit.png/320px-Clal-bit.png",
  analyst: "https://www.analyst.co.il/wp-content/themes/analyst/assets/images/logo.png",
  meitav: "https://www.meitavdash.co.il/wp-content/uploads/2021/05/logo.svg",
  altshuler: "https://www.as-invest.co.il/wp-content/uploads/2021/03/logo-altshuler.svg",
  "yelin-lapidot": "https://www.yl-invest.co.il/wp-content/uploads/2020/12/logo.svg",
  ibi: "https://www.ibi.co.il/wp-content/uploads/2021/08/logo.svg",
  more: "https://umbraco-api.hcsra.co.il/media/kpvbldxv/logos-2.png", // placeholder - will fix
  hachshara: "https://umbraco-api.hcsra.co.il/media/kpvbldxv/logos-2.png",
};

const fallbacks = [
  ["analyst", "https://www.analyst.co.il/Content/images/logo.png"],
  ["analyst", "https://www.analyst.co.il/images/logo.png"],
  ["meitav", "https://www.meitavdash.co.il/images/logo.png"],
  ["meitav", "https://www.meitavdash.co.il/Content/images/logo.png"],
  ["altshuler", "https://www.altshuler.co.il/wp-content/uploads/logo.png"],
  ["altshuler", "https://www.as-invest.co.il/wp-content/themes/altshuler/assets/img/logo.svg"],
  ["yelin-lapidot", "https://www.yl-invest.co.il/images/logo.png"],
  ["ibi", "https://www.ibi.co.il/wp-content/themes/ibi/assets/images/logo.png"],
  ["more", "https://www.moreinvest.co.il/wp-content/uploads/logo.png"],
  ["more", "https://www.more.co.il/wp-content/uploads/logo.png"],
];

async function save(name, url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; CubeFinancialGroup/1.0)" },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error("too small");
  let ext = "png";
  if (url.includes(".svg") || buf.slice(0, 100).toString().includes("<svg")) ext = "svg";
  const dest = path.join(outDir, `${name}.${ext}`);
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function tryUrl(name, url) {
  try {
    const bytes = await save(name, url);
    console.log(`OK ${name} ${bytes}b <- ${url}`);
    return true;
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message} <- ${url}`);
    return false;
  }
}

for (const [name, url] of Object.entries(sources)) {
  if (await tryUrl(name, url)) continue;
}

for (const [name, url] of fallbacks) {
  const dest = path.join(outDir, `${name}.png`);
  const destSvg = path.join(outDir, `${name}.svg`);
  if (fs.existsSync(dest) || fs.existsSync(destSvg)) continue;
  await tryUrl(name, url);
}
