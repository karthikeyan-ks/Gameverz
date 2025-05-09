from django.core.serializers import serialize
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from auth_app.models import User,Gamer,GameAdmin
from .models import Game,Genre,Event
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from backend.decorator import jwt_required

@csrf_exempt
@require_POST
@jwt_required
def dashboard(request):
    print("Entered the view")
    user = request.user
    try:
        gamer = Gamer.objects.get(uid=user)
    except Gamer.DoesNotExist:
        return JsonResponse({
            'message': 'Registered user is not a Gamer',
            'status': 'error'
        })
    
    all_games = Game.objects.all()
    print("User",user,all_games)
    joined_games = gamer.games.all()
    joined_game_ids = list(joined_games.values_list('gid', flat=True))
    all_games_serialized = serialize('json', all_games)

    return JsonResponse({
        'message': all_games_serialized,
        'selected_game_ids': joined_game_ids,
        'status': 'success'
    })
    

@csrf_exempt
@require_POST
@login_required
def addGame(request):
    user = request.user
    if not user:
        return JsonResponse({
            'message':"You are not authenticated!"
        })
    try:
        gameAdmin = GameAdmin.objects.get(uid=user)
    except GameAdmin.DoesNotExist:
        return JsonResponse({
            'message': 'GameAdmin not found for the authenticated user.',
            'status': 'error'
        }, status=403)

    try:
        name = request.POST['name']
        description = request.POST['description']
        image = request.FILES['image']
        genre_id = int(request.POST['genre'])
        try:
            genre = Genre.objects.get(gid=genre_id)
        except Genre.DoesNotExist:
            return JsonResponse({
                'message': 'Invalid genre selected.',
                'status': 'error'
            }, status=400)
        game = Game.objects.create(
            name=name,
            image=image,
            description=description,
            genre=genre,
            created_by=gameAdmin
        )

        data = serialize('json', [game])
        return JsonResponse({
            'message': data,
            'status': 'success'
        }, status=201)

    except KeyError as e:
        return JsonResponse({
            'message': f'Missing required field: {e}',
            'status': 'error'
        }, status=400)
    except ValueError:
        return JsonResponse({
            'message': 'Genre ID must be a valid integer.',
            'status': 'error'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'message': f'Unexpected error: {str(e)}',
            'status': 'error'
        }, status=500)
        
@csrf_exempt
@require_POST
@login_required
def deleteGame(request, gid):
    user = request.user

    try:
        gameAdmin = GameAdmin.objects.get(uid=user)
    except GameAdmin.DoesNotExist:
        return JsonResponse({
            'message': 'GameAdmin not found for the authenticated user.',
            'status': 'error'
        }, status=403)

    try:
        game = Game.objects.get(gid=gid, created_by=gameAdmin)
    except Game.DoesNotExist:
        return JsonResponse({
            'message': 'Game not found or unauthorized to delete.',
            'status': 'error'
        }, status=404)

    if not game.active:
        return JsonResponse({
            'message': 'Game is already inactive.',
            'status': 'warning'
        }, status=400)

    # Soft delete
    game.active = False
    game.save()

    return JsonResponse({
        'message': 'Successfully deleted the game!',
        'status': 'success'
    }, status=200)

@csrf_exempt
@require_POST
@login_required
def updateGame(request,gid):
    try:
        game = Game.objects.get(gid = gid,created_by = request.user)
    except Game.DoesNotExist:
        return JsonResponse({
            'message':'Game you requested to updated doesn\'t exist!',
            'status':'error'
        })
    name = request.POST['name']
    description = request.POST['description']
    image = request.FILES['image']
    genre_id = int(request.POST['genre'])
    try:
            genre = Genre.objects.get(gid=genre_id)
    except Genre.DoesNotExist:
        return JsonResponse({
            'message': 'Invalid genre selected.',
            'status': 'error'
        }, status=400)
    game.name = name
    game.description = description
    game.genre = genre
    game.image = image
    game.save()
    data = serialize('json', [game])
    return JsonResponse({
        'message': data,
        'status': 'success'
    }, status=201)
    
@csrf_exempt
@require_POST
@jwt_required
def searchGame(request,name):
    games = Game.objects.filter( name__startswith=name)
    data = serialize('json', games)
    return JsonResponse({
        'message':data,
        'status':'success'
    },status = 200)

@jwt_required
@require_POST
@csrf_exempt
def create_event(request):
    print("Request received...")
    if request.method == 'POST':
        print("Request post...")
        try:
            name = request.POST.get('name')
            game = request.POST.get('game')
            amount = request.POST.get('amount')
            image = request.FILES.get('image')
            print(name,game,amount,image)
            try:
                gameAdmin = GameAdmin.objects.get(uid = request.user)
            except GameAdmin.DoesNotExist:
                return JsonResponse({
                    'status': 'error', 'message': str(e)
                })
            try:
                game = Game.objects.get(name=game)
            except Game.DoesNotExist as e:
                return JsonResponse({'status': 'error', 'message': str(e)})
            # For image uploads, use FormData with `request.FILES`
            event = Event(name=name, game=game, amount=amount,image = image,created_by = gameAdmin)
            event.save()
            return JsonResponse({'status': 'success', 'id': event.id})
        except Exception as e:
            print("Error",str(e))
            return JsonResponse({'status': 'error', 'message': str(e)})
    return JsonResponse({
        'message':"Only post method allowed.",
        'status' : 'error'
        })
    

@jwt_required
@require_POST
@csrf_exempt
def update_event(request, event_id):
    print(">>> Event update hit!")
    print("POST DATA:", request.POST)
    print("FILES:", request.FILES)
    try:
        game_name = request.POST.get('game')
        game_name = int(game_name)
        print(game_name)
        if not game_name:
            return JsonResponse({'status': 'error', 'message': 'Game name is required'})

        try:
            game = Game.objects.get(gid=game_name)
            print("Fetched game:", game)
        except Game.DoesNotExist as e:
            return JsonResponse({'status': 'error', 'message': f"Game '{game_name}' not found"})

        event = Event.objects.get(pk=event_id)
        event.name = request.POST.get('name')
        event.game = game
        event.amount = request.POST.get('amount')

        image = request.FILES.get('thumbnail')
        if image:
            event.image = image

        event.save()
        print("Event updated:", event)

        return JsonResponse({'status': 'updated'})

    except Event.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Event not found'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})


@jwt_required
@require_POST
@csrf_exempt
def delete_event(request, event_id):
    print(event_id)
    if request.method == 'POST':
        try:
            event = Event.objects.get(pk=event_id)
            event.delete()
            return JsonResponse({'status': 'deleted'})
        except Event.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Event not found'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    return JsonResponse({
        'message':"Only post method allowed.",
        'status' : 'error'
        })
    

@jwt_required
@require_POST
@csrf_exempt
def list_event(request):
    
    user  = request.user
    try:
        gameAdmin = GameAdmin.objects.get(uid = user)
    except GameAdmin.DoesNotExist:
        return JsonResponse({
            'message':'GameAdmin not found for the authenticated user.',
            'status':'error'
        },status = 403)
    events = Event.objects.filter(created_by=gameAdmin)
    data = serialize('json', events)
    print(data)
    return JsonResponse({
        'message':data,
        'status':'success'
    },status = 200)
    