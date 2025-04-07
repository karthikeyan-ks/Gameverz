import os
import firebase_admin
from firebase_admin import credentials

# Get the absolute path to firebase.json
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIREBASE_CRED_PATH = os.path.join(BASE_DIR, "auth_app/firebase.json")  # Ensure this path is correct

# Initialize Firebase only if it hasn't been initialized
if not firebase_admin._apps:
    cred = credentials.Certificate(FIREBASE_CRED_PATH)
    firebase_admin.initialize_app(cred)
