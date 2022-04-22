from pathlib import Path

BASE_DIR = '../../..'
KEY_DIR = Path(__file__).resolve().parent.parent.parent.parent
with open(KEY_DIR / 'secret_key.txt') as f:
    SECRET_KEY = f.read().strip()
    print(SECRET_KEY)
    print(KEY_DIR)