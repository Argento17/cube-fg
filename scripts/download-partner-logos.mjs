import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "partners");
fs.mkdirSync(outDir, { recursive: true });

const companieslogoPages = {
  harel: "https://companieslogo.com/harel-group/logo/",
  phoenix: "https://companieslogo.com/the-phoenix-holdings-ltd/logo/",
  menorah: "https://companieslogo.com/menora-mivtachim-holdings/logo/",
  migdal: "https://companieslogo.com/migdal-insurance-and-financial-holdings/logo/",
};

const clearbitDomains = {
  clal: "clalbit.co.il",
  analyst: "analyst.co.il",
  "yelin-lapidot": "yl-invest.co.il",
  hachshara: "hcsra.co.il",
  meitav: "meitavdash.co.il",
  more: "more.co.il",
  ibi: "ibi.co.il",
  altshuler: "altshuler.co.il",
};

function pickLogoUrl(html) {
  const matches = [...html.matchAll(/src="(\/img\/orig\/[^"]+\.png[^"]*)"/g)];
  const icon = matches.find((m) => !m[1].includes("_BIG") && !m[1].includes(".D-"));
  return icon?.[1] ?? matches.find((m) => !m[1].includes("_BIG"))?.[1];
}

async function save(name, buf, ext = "png") {
  const dest = path.join(outDir, `${name}.${ext}`);
  fs.writeFileSync(dest, buf);
  return dest;
}

async function downloadFromCompaniesLogo(name, pageUrl) {
  const res = await fetch(pageUrl);
  if (!res.ok) throw new Error(`page ${res.status}`);
  const html = await res.text();
  const rel = pickLogoUrl(html);
  if (!rel) throw new Error("no logo url");
  const imgUrl = new URL(rel, pageUrl).toString();
  const imgRes = await fetch(imgUrl);
  if (!imgRes.ok) throw new Error(`img ${imgRes.status}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  await save(name, buf, "png");
  return buf.length;
}

async function downloadFromClearbit(name, domain) {
  const imgUrl = `https://logo.clearbit.com/${domain}`;
  const res = await fetch(imgUrl, { redirect: "follow" });
  if (!res.ok) throw new Error(`clearbit ${res.status}`);
  const type = res.headers.get("content-type") || "";
  if (!type.includes("image")) throw new Error(`not image: ${type}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = type.includes("png") ? "png" : "jpg";
  await save(name, buf, ext);
  return buf.length;
}

async function downloadClalSvg() {
  const url =
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/%D7%9C%D7%95%D7%92%D7%95_%D7%9B%D7%9C%D7%9C_%D7%91%D7%99%D7%98%D7%95%D7%97.svg";
  const res = await fetch(url, { headers: { "User-Agent": "CubeFinancialGroup/1.0" } });
  if (!res.ok) throw new Error(`wikimedia ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await save("clal", buf, "svg");
  return buf.length;
}

for (const [name, pageUrl] of Object.entries(companieslogoPages)) {
  try {
    const bytes = await downloadFromCompaniesLogo(name, pageUrl);
    console.log(`OK ${name} (companieslogo) ${bytes}b`);
  } catch (e) {
    console.log(`FAIL ${name} (companieslogo): ${e.message}`);
  }
}

try {
  const bytes = await downloadClalSvg();
  console.log(`OK clal (wikimedia svg) ${bytes}b`);
} catch (e) {
  console.log(`FAIL clal (wikimedia): ${e.message}`);
}

for (const [name, domain] of Object.entries(clearbitDomains)) {
  if (name === "clal" && fs.existsSync(path.join(outDir, "clal.svg"))) continue;
  try {
    const bytes = await downloadFromClearbit(name, domain);
    console.log(`OK ${name} (clearbit) ${bytes}b`);
  } catch (e) {
    console.log(`FAIL ${name} (clearbit): ${e.message}`);
  }
}
