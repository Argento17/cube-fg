"""Export crisp icon logo: strip checkerboard, preserve cube highlights & aspect."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LOGOS = ROOT / "Logos"
SOURCES = [
    LOGOS / "New_Cube_Solo_Logo.jpeg",
    LOGOS / "New_Cube_Solo_Logo.jpg",
    LOGOS / "Icon Only Cube.png",
    LOGOS / "Icon Only Cube Transparent.png",
]
OUT_1X = ROOT / "public" / "brand" / "logo-icon.png"
OUT_2X = ROOT / "public" / "brand" / "logo-icon@2x.png"
LOGOS_OUT = LOGOS / "Icon Only Cube Transparent.png"
LONG_SIDE_1X = 512
LONG_SIDE_2X = 1024


def is_checkerboard(r: int, g: int, b: int, a: int) -> bool:
    if a < 10:
        return True
    # Neutral grey/white checkerboard (export grids use ~213–248)
    if abs(r - g) < 15 and abs(g - b) < 15 and 105 < r < 252:
        return True
    return False


def strip_checkerboard(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if is_checkerboard(r, g, b, a):
                px[x, y] = (0, 0, 0, 0)
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def pad_square(img: Image.Image) -> Image.Image:
    w, h = img.size
    if w == h:
        return img
    side = max(w, h)
    out = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    out.paste(img, ((side - w) // 2, (side - h) // 2))
    return out


def center_square_crop(img: Image.Image) -> Image.Image:
    """Wide exports often include empty margin — keep the cube centered."""
    w, h = img.size
    if w > h * 1.12:
        side = h
        left = (w - side) // 2
        return img.crop((left, 0, left + side, h))
    if h > w * 1.12:
        side = w
        top = (h - side) // 2
        return img.crop((0, top, w, top + side))
    return img


def resize_long_side(img: Image.Image, long_side: int) -> Image.Image:
    w, h = img.size
    scale = long_side / max(w, h)
    if abs(scale - 1) < 0.001:
        return img
    nw = max(1, round(w * scale))
    nh = max(1, round(h * scale))
    return img.resize((nw, nh), Image.Resampling.LANCZOS)


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", optimize=True)


def main() -> None:
    source: Path | None = None
    for candidate in SOURCES:
        if candidate.exists():
            source = candidate
            break
    if source is None:
        raise SystemExit("No logo source found in Logos/")

    img = pad_square(center_square_crop(strip_checkerboard(Image.open(source))))
    img_1x = resize_long_side(img, LONG_SIDE_1X)
    img_2x = resize_long_side(img, LONG_SIDE_2X)

    save_png(img_1x, OUT_1X)
    save_png(img_2x, OUT_2X)
    save_png(img_2x, LOGOS_OUT)

    w, h = img_1x.size
    print(f"OK: {source.name}")
    print(f"  1x: {w}x{h}  aspect={w/h:.4f}")
    print(f"  2x: {img_2x.size[0]}x{img_2x.size[1]}")


if __name__ == "__main__":
    main()
