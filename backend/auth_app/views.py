from django.contrib.auth import get_user_model,login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
import logging
import firebase_admin
from firebase_admin import auth, credentials
from django.conf import settings

# Get the absolute path to the service account file
FIREBASE_CREDENTIALS_PATH = os.path.join(settings.BASE_DIR, "firebase-key.json")

# Initialize Firebase Admin SDK only once
if not firebase_admin._apps:
    try:
        cred = credentials.Certificate(FIREBASE_CREDENTIALS_PATH)
        firebase_admin.initialize_app(cred)
    except Exception as e:
        print(f"Error initializing Firebase Admin SDK: {e}")

User = get_user_model()
logger = logging.getLogger(__name__)

@csrf_exempt  # CSRF exemption should be directly above the function
def firebase_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            id_token = data.get("idToken")

            if not id_token:
                return JsonResponse({"error": "Missing idToken"}, status=400)

            decoded_token = auth.verify_id_token(id_token)
            firebase_uid = decoded_token.get("uid")
            email = decoded_token.get("email", "")
            display_name = decoded_token.get("name", "")
            photo_url = decoded_token.get("picture", "")

            print("Decoded Token:", decoded_token)  # Debugging
            print(f"Email: {email}, Display Name: {display_name}, Photo URL: {photo_url}")

            user, created = User.objects.get_or_create(
                firebase_uid=firebase_uid,
                defaults={
                    "email": email,
                    "display_name": display_name,
                    "photo_url": photo_url,
                    "username": email.split("@")[0],  # Generate a username
                }
            )
            if created:
                user.set_unusable_password()
                user.save()
            login(request,user)
            response_data = {
                "message": "Login successful",
                "user_id": user.id,
                "firebase_uid": user.firebase_uid,
                "email": user.email,
                "display_name": user.display_name,
                "photo_url": user.photo_url,
            }

            print("Response Data:", response_data)  # Debugging
            return JsonResponse(response_data)

        except Exception as e:
            print(f"Firebase Login Error: {e}")  # Debugging
            return JsonResponse({"error": str(e)}, status=500)
