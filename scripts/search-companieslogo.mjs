import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "partners");

async function search(q) {
  const url = `https://companieslogo.com/search/?q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  const links = [...html.matchAll(/href="\/([^"/]+)\/logo\/"/g)].map((m) => m[1]);
  console.log(q, "->", [...new Set(links)].slice(0, 8));
  return links;
}

async function downloadPage(slug, name) {
  const pageUrl = `https://companieslogo.com/${slug}/logo/`;
  const res = await fetch(pageUrl);
  if (!res.ok) throw new Error(`page ${res.status}`);
  const html = await res.text();
  const m = [...html.matchAll(/src="(\/img\/orig\/[^"]+\.png[^"]*)"/g)].find((x) => !x[1].includes("_BIG"));
  if (!m) throw new Error("no png");
  const imgUrl = new URL(m[1], pageUrl).toString();
  const imgRes = await fetch(imgUrl);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  fs.writeFileSync(path.join(outDir, `${name}.png`), buf);
  console.log(`OK ${name} ${buf.length}b from ${slug}`);
}

for (const q of ["meitav dash", "yelin lapidot", "clal insurance", "altshuler shaham"]) {
  await search(q);
}

for (const [slug, name] of [
  ["meitav-dash-ltd", "meitav"],
  ["meitav-dash-investments-ltd", "meitav"],
  ["meitav-dash-holdings", "meitav"],
  ["yelin-lapidot-investment-house-ltd", "yelin-lapidot"],
  ["yelin-lapidot", "yelin-lapidot"],
  ["clal-insurance-enterprises-holdings", "clal"],
]) {
  try {
    await downloadPage(slug, name);
  } catch (e) {
    console.log(`FAIL ${slug}: ${e.message}`);
  }
}
