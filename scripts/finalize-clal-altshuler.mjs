import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "partners");

const clalSvgApi = await fetch(
  "https://commons.wikimedia.org/w/api.php?action=query&titles=File:%D7%9C%D7%95%D7%92%D7%95_%D7%9B%D7%9C%D7%9C_%D7%91%D7%99%D7%98%D7%95%D7%97.svg&prop=imageinfo&iiprop=url&format=json",
);
const clalData = await clalSvgApi.json();
const clalUrl = Object.values(clalData.query.pages)[0].imageinfo?.[0]?.url;
if (clalUrl) {
  const res = await fetch(clalUrl);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(outDir, "clal.svg"), buf);
  try {
    fs.unlinkSync(path.join(outDir, "clal.png"));
  } catch {}
  console.log("OK clal.svg", buf.length);
}

const altUrl =
  "https://upload.wikimedia.org/wikipedia/he/b/be/%D7%90%D7%9C%D7%98%D7%A9%D7%95%D7%9C%D7%A8_%D7%A9%D7%97%D7%9D.png";
const altRes = await fetch(altUrl);
const altBuf = Buffer.from(await altRes.arrayBuffer());
fs.writeFileSync(path.join(outDir, "altshuler.png"), altBuf);
console.log("OK altshuler.png", altBuf.length);
