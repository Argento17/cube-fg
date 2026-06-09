# -*- coding: utf-8 -*-
import sys
from pathlib import Path

try:
    import pypdf
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf", "-q"])
    import pypdf

pdf_path = Path(__file__).parent / "Logos" / "Cube_Financial_Group_Brand_Guidelines.pdf"
out_path = Path(__file__).parent / "brand-guidelines-extract.txt"

reader = pypdf.PdfReader(str(pdf_path))
parts = []
for i, page in enumerate(reader.pages):
    parts.append(f"--- PAGE {i + 1} ---\n")
    parts.append(page.extract_text() or "(no text)\n")

out_path.write_text("".join(parts), encoding="utf-8")
print(f"Wrote {out_path} ({len(reader.pages)} pages)")
