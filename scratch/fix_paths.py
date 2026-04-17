import os
import re

def fix_imports(filepath, depth):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    if depth == 2:
        # Replace '../' with '../../' for core folders
        pattern = r"from\s+['\"](\.\./(components|constants|context|services|hooks|types)/?)"
        def replacer(match):
            return match.group(0).replace('../', '../../')
        
        new_content = re.sub(pattern, replacer, new_content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed paths in {filepath}")

for root, dirs, files in os.walk('src/screens'):
    rel_path = os.path.relpath(root, 'src/screens')
    # src/screens -> depth 1
    # src/screens/tabs -> depth 2
    depth = 1 if rel_path == '.' else 2
    for file in files:
        if file.endswith('.tsx'):
            fix_imports(os.path.join(root, file), depth)
