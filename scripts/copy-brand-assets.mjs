import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logosDir = join(root, "Logos");
const outDir = join(root, "public", "brand");

mkdirSync(outDir, { recursive: true });

const iconSources = [
  "New_Cube_Solo_Logo.jpeg",
  "New_Cube_Solo_Logo.jpg",
  "Icon Only Cube Transparent.png",
  "Icon Only Cube.png",
];

const hasNewCube = iconSources.some((name) =>
  existsSync(join(logosDir, name)),
);
if (hasNewCube) {
  console.log(
    "New cube logo found — run npm run process:logo to export PNGs with transparency",
  );
} else {
  let iconCopied = false;
  for (const name of iconSources.slice(2)) {
    const from = join(logosDir, name);
    if (existsSync(from)) {
      copyFileSync(from, join(outDir, "logo-icon.png"));
      console.log(`Copied logo-icon.png from ${name}`);
      iconCopied = true;
      break;
    }
  }
  if (!iconCopied) {
    console.error("No icon source found in Logos/");
    process.exit(1);
  }
}

const other = [
  ["Horizontal Cube Logo.png", "logo-horizontal.png"],
  ["Full Logo Cube.png", "logo-full.png"],
];

for (const [src, dest] of other) {
  const from = join(logosDir, src);
  const to = join(outDir, dest);
  if (!existsSync(from)) {
    console.warn(`Skipping missing: ${from}`);
    continue;
  }
  copyFileSync(from, to);
  console.log(`Copied ${dest}`);
}

console.log("Brand assets ready in public/brand/");
