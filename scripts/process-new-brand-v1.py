"""Process public/brand/new_brand_v1.png into site brand assets."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "brand" / "new_brand_v1.png"
OUT = ROOT / "public" / "brand"
APP_ICON = ROOT / "src" / "app" / "icon.png"


def knock_white(img: Image.Image) -> Image.Image:
    arr = np.array(img.convert("RGBA"))
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    near_white = (
        (r > 235)
        & (g > 235)
        & (b > 235)
        & (np.abs(r.astype(int) - g.astype(int)) < 20)
        & (np.abs(g.astype(int) - b.astype(int)) < 20)
    )
    arr[near_white, 3] = 0
    out = Image.fromarray(arr)
    bbox = out.getbbox()
    return out.crop(bbox) if bbox else out


def find_cube_text_gap(img: Image.Image) -> int:
    arr = np.array(img)
    content = arr[:, :, 3] > 10
    row_dens = content.sum(axis=1)
    in_low = False
    gap_candidate = 0
    for y, dens in enumerate(row_dens):
        if dens < 40:
            if not in_low:
                gap_candidate = y
                in_low = True
            elif y - gap_candidate > 8:
                if any(row_dens[j] > 80 for j in range(y, min(y + 40, len(row_dens)))):
                    return gap_candidate
        else:
            in_low = False
    return int(img.size[1] * 0.72)


def pad_square(img: Image.Image) -> Image.Image:
    w, h = img.size
    side = max(w, h)
    out = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    out.paste(img, ((side - w) // 2, (side - h) // 2), img)
    return out


def resize_long(img: Image.Image, long_side: int) -> Image.Image:
    w, h = img.size
    scale = long_side / max(w, h)
    return img.resize(
        (max(1, round(w * scale)), max(1, round(h * scale))),
        Image.Resampling.LANCZOS,
    )


def save(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", optimize=True)
    print(f"  {path.relative_to(ROOT)}  {img.size[0]}x{img.size[1]}")


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source: {SRC}")

    full = knock_white(Image.open(SRC))
    gap = find_cube_text_gap(full)
    cube = full.crop((0, 0, full.size[0], gap))
    cb = cube.getbbox()
    if cb:
        cube = cube.crop(cb)

    print(f"full {full.size}, gap={gap}, cube {cube.size}")

    # Preserve a processed transparent master at original crop size
    save(full, OUT / "new_brand_v1.png")

    full_1024 = resize_long(full, 1024)
    save(full_1024, OUT / "logo-full.png")
    save(full_1024, OUT / "logo-horizontal.png")

    cube_sq = pad_square(cube)
    cube_256 = resize_long(cube_sq, 256)
    cube_512 = resize_long(cube_sq, 512)
    cube_1024 = resize_long(cube_sq, 1024)

    save(cube_512, OUT / "logo-cube.png")
    save(cube_512, OUT / "logo-icon.png")
    save(cube_1024, OUT / "logo-icon@2x.png")
    # Color mark remains legible on navy; keep path used by footer
    save(cube_512, OUT / "logo-cube-reversed.png")
    save(cube_256, APP_ICON)

    print("Done.")


if __name__ == "__main__":
    main()
