import os
import glob
from PIL import Image

# Writes ONLY to public/gallery-webp/. Never write .webp next to the .jpg
# originals; check-weight.py fails the build on such strays.
os.makedirs("public/gallery-webp", exist_ok=True)
files = sorted(glob.glob("public/gallery/*.jpg"))
print("jpg count:", len(files))

before = after = 0
for src in files:
    name = os.path.basename(src)
    dest = "public/gallery-webp/" + name.replace(".jpg", ".webp")
    im = Image.open(src).convert("RGB")
    im.save(dest, "WEBP", quality=78, method=4)
    b, a = os.path.getsize(src), os.path.getsize(dest)
    if a == 0:
        os.remove(dest)
        raise SystemExit(f"ERROR: {name} produced a 0-byte webp; aborting")
    before += b
    after += a
    print(f"{name}  {b} -> {a}")

print(f"TOTAL {before/1024:.0f} KB -> {after/1024:.0f} KB (saved {(before-after)/1024:.0f} KB)")
