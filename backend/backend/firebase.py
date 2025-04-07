import firebase_admin
from firebase_admin import credentials, auth

# Path to your Firebase private key JSON
cred = credentials.Certificate("path/to/your/firebase-private-key.json")
firebase_admin.initialize_app(cred)
