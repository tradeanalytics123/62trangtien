import os
from pathlib import Path

def should_skip_directory(dir_name):
    """Determine if a directory should be skipped"""
    skip_dirs = {'node_modules', '.git', '__pycache__', '.venv', 'venv'}
    return dir_name in skip_dirs or dir_name.startswith('.')

def get_file_contents(file_path):
    """Try to read file contents with proper encoding handling"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except UnicodeDecodeError:
        try:
            with open(file_path, 'r', encoding='latin-1') as f:
                return f.read()
        except Exception as e:
            return f"[Binary file or encoding not supported - {e}]"
    except Exception as e:
        return f"[Error reading file - {e}]"

def print_directory_structure(start_path, output_file, indent=''):
    """Recursively print directory structure and file contents"""
    try:
        items = sorted(os.listdir(start_path))
    except PermissionError:
        output_file.write(f"{indent}[Permission denied: {start_path}]\n")
        return

    for item in items:
        full_path = os.path.join(start_path, item)
        if os.path.isdir(full_path):
            if should_skip_directory(item):
                output_file.write(f"{indent}├── {item}/ [SKIPPED]\n")
                continue
            
            output_file.write(f"{indent}├── {item}/\n")
            print_directory_structure(full_path, output_file, indent + "│   ")
        else:
            output_file.write(f"{indent}├── {item}\n")
            
            # Print file content (for text files)
            if not item.startswith('.'):
                file_content = get_file_contents(full_path)
                output_file.write(f"{indent}│   ├── Content:\n")
                for line in file_content.split('\n'):
                    output_file.write(f"{indent}│   │   {line}\n")
                output_file.write(f"{indent}│   └── End of {item}\n")

def main():
    output_filename = "folder_structure_and_contents.txt"
    current_dir = os.getcwd()
    
    with open(output_filename, 'w', encoding='utf-8') as output_file:
        output_file.write(f"Folder Structure and Contents for: {current_dir}\n")
        output_file.write("=" * 80 + "\n\n")
        print_directory_structure(current_dir, output_file)
    
    print(f"Directory structure and contents saved to {output_filename}")

if __name__ == "__main__":
    main()