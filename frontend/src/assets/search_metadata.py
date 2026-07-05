
import re

with open(r'C:\Users\mosta\.gemini\antigravity\brain\acc945e4-bcff-4ceb-946f-845ed5bc1b35\.system_generated\steps\190\output.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all occurrences of "upload", "photo", "image", "avatar" in node names or text
patterns = [r'name="[^"]*upload[^"]*"', r'name="[^"]*photo[^"]*"', r'name="[^"]*avatar[^"]*"']
for p in patterns:
    matches = re.findall(p, content, re.IGNORECASE)
    if matches:
        print(f"Found {len(matches)} matches for pattern {p}:")
        for m in set(matches):
            print(f"  {m}")

# Also check for nodes with "Add New Pet"
add_pet_nodes = re.findall(r'<frame id="[^"]*" name="[^"]*Add New Pet[^"]*"', content, re.IGNORECASE)
if add_pet_nodes:
    print(f"Found {len(add_pet_nodes)} 'Add New Pet' frames:")
    for n in add_pet_nodes:
        print(f"  {n}")
