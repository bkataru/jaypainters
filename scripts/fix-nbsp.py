import io

path = "src/data/site.ts"
src = io.open(path, encoding="utf-8").read()

old_literal = 'export const PHONE_DISPLAY = "+91\u00a097316\u00a070742";'
new_escaped = 'export const PHONE_DISPLAY = "+91\\u00A097316\\u00A070742";'

if old_literal in src:
    src = src.replace(old_literal, new_escaped)
    io.open(path, "w", encoding="utf-8", newline="\n").write(src)
    print("replaced nbsp literals with escapes")
elif new_escaped in src:
    print("already escaped")
else:
    for i, line in enumerate(src.splitlines(), 1):
        if "PHONE_DISPLAY" in line:
            print("line", i, "codes:", [hex(ord(c)) for c in line if ord(c) > 126])
    print("PATTERN NOT FOUND")

check = io.open(path, encoding="utf-8").read()
print("has escape:", "\\u00A0" in check)
print("has literal nbsp:", "\u00a0" in check)
