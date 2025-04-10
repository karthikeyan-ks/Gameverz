from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from auth_app.models import GameAdmin,Gamer
from gameAdmin.models import Game,Event
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.core.serializers import serialize
from backend.decorator import jwt_required

@require_POST
@jwt_required
@csrf_exempt
def games(request,name):
    print(request.user.username)
    games = Game.objects.filter( name__startswith=name, active=True)
    data = serialize('json', games)
    return JsonResponse({
        'message':data,
        'status':'sucess'
    })
    
@require_POST
@jwt_required
@csrf_exempt
def list_event(request):
    user = request.user
    try:
        gamer = Gamer.objects.get(uid=user)
    except Gamer.DoesNotExist:
        return JsonResponse({
            'message': 'Registered user is not a Gamer',
            'status': 'error'
        })
    games = gamer.games.all()
    events_qs = Event.objects.filter(game__in=games)
    data = serialize('json', events_qs)
    return JsonResponse({
        'message': data,
        'status': 'success'
    })

@require_POST
@jwt_required
@csrf_exempt
def allGames(request):
    user = request.user
    try:
        gamer = Gamer.objects.get(uid = user)
    except Gamer.DoesNotExist:
        return JsonResponse({
            'message':'Registered user is not a Gamer',
            'status':'error'
        })
    games = gamer.games.all()
    data = serialize('json', games)
    return JsonResponse({
        'message': data,
        'status': 'success'
    })

@require_POST
@jwt_required
@csrf_exempt
def update_gamer_games(request, gid, action):
    user = request.user
    try:
        gamer = Gamer.objects.get(uid=user)
    except Gamer.DoesNotExist:
        return JsonResponse({'message': 'User is not a Gamer', 'status': 'error'})

    if action not in ['add', 'remove']:
        return JsonResponse({'message': 'Invalid action', 'status': 'error'})

    try:
        game = Game.objects.get(id=gid)

        if action == 'add':
            gamer.games.add(game)
        elif action == 'remove':
            gamer.games.remove(game)

        return JsonResponse({
            'message': f'Game {action}ed successfully.',
            'status': 'success'
        })

    except Game.DoesNotExist:
        return JsonResponse({'message': 'Game not found', 'status': 'error'})
    except Exception as e:
        return JsonResponse({'message': str(e), 'status': 'error'})
