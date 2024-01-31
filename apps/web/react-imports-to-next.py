import os
import re

# UNFORTUNATLY NOT WORKS WITH '../' IN subdirectories, but, some Vscode regex can help like : from '@/(../)+([A-Z])' to from '@/components/$2

# The root directory of your project
root_directory = "./src/"

# The prefix you want to use for Next.js imports
next_import_prefix = "@/"

# The regular expression for relative imports in a React.js file
relative_import_regex = re.compile(r"from\s+['\"](\.+\/*)(.+)['\"]")

# Walk through the root directory and its subdirectories
for directory, subdirectories, files in os.walk(root_directory):
    # Get the subdirectory path relative to the root directory
    current_directory_path = os.path.relpath(directory, root_directory)
    # Construct the corresponding Next.js import prefix for the current directory
    current_import_prefix = next_import_prefix + current_directory_path.replace(os.sep, '/')
    for filename in files:
        if filename.endswith(".js") or filename.endswith(".jsx"):
            filepath = os.path.join(directory, filename)
            with open(filepath, "r+") as f:
                content = f.read()
                # Replace relative imports with Next.js imports
                updated_content = relative_import_regex.sub(
                    lambda match: f"from '{current_import_prefix}/{match.group(2)}'" if match.group(1).startswith('./') else f"from '{next_import_prefix}{match.group(2)}'",
                    content
                )
                # Write the updated content back to the file
                f.seek(0)
                f.write(updated_content)
                f.truncate()