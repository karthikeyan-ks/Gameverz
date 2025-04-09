from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from auth_app.models import GameAdmin
from gameAdmin.models import Game
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.core.serializers import serialize

@require_POST
@login_required
@csrf_exempt
def games(request,name):
    print(request.user.username)
    games = Game.objects.filter( name__startswith=name, active=True)
    data = serialize('json', games)
    return JsonResponse({
        'message':data,
        'status':'sucess'
    })