from functools import wraps
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .utils import *
from django.http import JsonResponse, HttpResponse

def api_login_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            print("Decorator error")
            return JsonResponse({'detail': 'Authentication required'}, status=401)
        return view_func(request, *args, **kwargs)
    return wrapper


User = get_user_model()

def jwt_required(view_func):
    @wraps(view_func)
    def wrapped(request, *args, **kwargs):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'detail': 'Invalid or missing token'}, status=401)

        token = auth_header.split(' ')[1]
        payload = decode_jwt(token)
        if not payload:
            return JsonResponse({'detail': 'Token is invalid or expired'}, status=401)

        try:
            user = User.objects.get(id=payload['user_id'])
            request.user = user  # Attach user to request manually
        except User.DoesNotExist:
            return JsonResponse({'detail': 'User not found'}, status=404)

        return view_func(request, *args, **kwargs)
    return wrapped




def jwt_login_response(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        print("[Decorator] Called for:", request.path)

        response = view_func(request, *args, **kwargs)

        if request.user.is_authenticated and isinstance(response, JsonResponse):
            print("[Decorator] User is authenticated:", request.user)

            token = generate_jwt(request.user)
            print("[Decorator] New Token is generated:", token)

            response.set_cookie(
                key='jwt_token',
                value=token,
                httponly=True,
                samesite='None',
                secure=True  # Use True with HTTPS
            )

        return response

    return _wrapped_view

def jwt_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        token = request.COOKIES.get('jwt_token')
        print(token)
        if not token:
            return JsonResponse({'detail': 'Authentication required'}, status=401)
        user_id = verify_jwt(token)
        if not user_id:
            return JsonResponse({'detail': 'Invalid or expired token'}, status=401)
        try:
            request.user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse({'detail': 'User not found'}, status=401)

        return view_func(request, *args, **kwargs)
    return _wrapped_view
