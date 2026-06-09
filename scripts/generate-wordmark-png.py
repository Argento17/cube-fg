from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "public" / "partners"

FONT_CANDIDATES = [
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\arial.ttf",
    r"C:\Windows\Fonts\david.ttf",
]


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES:
        if Path(path).exists():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def make_wordmark(filename: str, text: str, color: str, font_size: int = 42) -> None:
    font = load_font(font_size)
    bbox = font.getbbox(text)
    width = bbox[2] - bbox[0] + 48
    height = bbox[3] - bbox[1] + 32
    img = Image.new("RGBA", (width, height), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    draw.text((24 - bbox[0], 16 - bbox[1]), text, font=font, fill=color)
    img.save(OUT / filename, "PNG")
    print(f"wrote {filename} ({width}x{height})")


make_wordmark("meitav.png", "מיטב דש", "#003DA5", 40)
make_wordmark("yelin-lapidot.png", "ילין לפידות", "#1B3A6B", 34)
