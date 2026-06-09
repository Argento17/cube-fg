import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "partners");

const domains = {
  meitav: "meitavdash.co.il",
  "yelin-lapidot": "yl-invest.co.il",
};

for (const [name, domain] of Object.entries(domains)) {
  const urls = [
    `https://cdn.brandfetch.io/${domain}/w/400/h/120/logo?c=1id`,
    `https://cdn.brandfetch.io/domain/${domain}/logo`,
    `https://logo.clearbit.com/${domain}`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error(String(res.status));
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 500) throw new Error("small");
      const type = res.headers.get("content-type") || "";
      if (!type.includes("image")) throw new Error(type);
      const ext = type.includes("svg") ? "svg" : "png";
      fs.writeFileSync(path.join(outDir, `${name}.${ext}`), buf);
      console.log(`OK ${name} ${buf.length}b from ${url}`);
      break;
    } catch (e) {
      console.log(`FAIL ${name} ${url}: ${e.message}`);
    }
  }
}
