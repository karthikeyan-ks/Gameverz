from django.core.serializers import serialize
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from auth_app.models import User

@login_required

def dashboard(request):
    user  = request.user
    data = serialize('json',[user])
    print(data)
    return JsonResponse({
        'user':data
    })
    
    
# Create your views here.
