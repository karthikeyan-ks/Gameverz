import jwt
from datetime import datetime, timedelta
from django.conf import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"

def generate_jwt(user):
    payload = {
        'user_id': user.id,
        'username': user.username,
        'exp': datetime.utcnow() + timedelta(hours=24),  # token expires in 24h
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_jwt(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def verify_jwt(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get('user_id')  # Return the ID so we can get user from DB
    except jwt.ExpiredSignatureError:
        # Token has expired
        return None
    except jwt.InvalidTokenError:
        # Token is invalid (tampered, bad secret, etc.)
        return None