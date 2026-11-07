import os
import glob
from PIL import Image

# Re-encode WebP variants that ended up larger than their JPEG, at lower quality.
grown = []
for jpg in sorted(glob.glob("public/gallery/*.jpg")):
    webp = "public/gallery-webp/" + os.path.basename(jpg).replace(".jpg", ".webp")
    if os.path.exists(webp) and os.path.getsize(webp) >= os.path.getsize(jpg):
        grown.append((jpg, webp))

print("regressions:", len(grown))
for jpg, webp in grown:
    im = Image.open(jpg).convert("RGB")
    target = int(os.path.getsize(jpg) * 0.9)
    for q in (70, 64, 58, 52, 46, 40):
        im.save(webp, "WEBP", quality=q, method=6)
        if os.path.getsize(webp) < target:
            break
    print(f"{os.path.basename(webp)}  jpg={os.path.getsize(jpg)} webp={os.path.getsize(webp)} q={q}")

total_jpg = sum(os.path.getsize(f) for f in glob.glob("public/gallery/*.jpg"))
total_webp = sum(os.path.getsize(f) for f in glob.glob("public/gallery-webp/*.webp"))
print(f"TOTAL jpg={total_jpg/1024:.0f}KB webp={total_webp/1024:.0f}KB saved={(total_jpg-total_webp)/1024:.0f}KB")
