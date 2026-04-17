import os
import re

def refactor_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements
    replacements = [
        (r"import \{ useRouter \} from 'expo-router';", "import { useNavigation } from '@react-navigation/native';"),
        (r"import \{ useRouter, .* \} from 'expo-router';", "import { useNavigation } from '@react-navigation/native';"),
        (r"const router = useRouter\(\);", "const navigation = useNavigation<any>();"),
        (r"router\.back\(\)", "navigation.goBack()"),
        (r"router\.push\('/tasks'\)", "navigation.navigate('Tasks')"),
        (r"router\.push\('/settings'\)", "navigation.navigate('Settings')"),
        (r"router\.push\('/settings/notifications'\)", "navigation.navigate('Notifications')"),
        (r"router\.push\('/settings/language'\)", "navigation.navigate('Language')"),
        (r"router\.replace\('/login'\)", "navigation.replace('Login')"),
        (r"router\.replace\('/onboarding'\)", "navigation.replace('Onboarding')"),
        (r"router\.replace\('/\(tabs\)'\)", "navigation.replace('MainTabs')"),
        # Fix relative paths from previous find/sed if needed, but I already did that.
        (r"../../src/", "../../"),
        (r"../src/", "../"),
    ]

    new_content = content
    for old, new in replacements:
        new_content = re.sub(old, new, new_content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Refactored {filepath}")

screens_dir = 'src/screens'
for root, dirs, files in os.walk(screens_dir):
    for file in files:
        if file.endswith('.tsx'):
            refactor_file(os.path.join(root, file))
