import os
import glob
from PIL import Image

# Writes ONLY to public/gallery-webp/. Never write .webp next to the .jpg
# originals; check-weight.py fails the build on such strays.
os.makedirs("public/gallery-webp", exist_ok=True)
files = sorted(glob.glob("public/gallery/*.jpg"))
print("jpg count:", len(files))

LADDER = (320, 480, 720)

before = after = 0
for src in files:
    name = os.path.basename(src)
    slug = name.replace(".jpg", "")
    im = Image.open(src).convert("RGB")
    b = os.path.getsize(src)
    full = "public/gallery-webp/" + slug + ".webp"
    variants = [(full, im)]
    for w in LADDER:
        h = round(im.height * w / im.width)
        variants.append((f"public/gallery-webp/{slug}-{w}.webp", im.resize((w, h), Image.LANCZOS)))
    for dest, img in variants:
        img.save(dest, "WEBP", quality=78, method=4)
        a = os.path.getsize(dest)
        if a == 0:
            os.remove(dest)
            raise SystemExit(f"ERROR: {os.path.basename(dest)} produced a 0-byte webp; aborting")
        if dest == full:
            before += b
            after += a
        print(f"{os.path.basename(dest)}  {b} -> {a}")

print(f"TOTAL {before/1024:.0f} KB -> {after/1024:.0f} KB (saved {(before-after)/1024:.0f} KB)")
