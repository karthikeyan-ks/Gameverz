from django.core.serializers import serialize
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from auth_app.models import User,Gamer,GameAdmin
from .models import Game,Genre
from django.views.decorators.http import require_POST

@require_POST
@login_required
def dashboard(request):
    user  = request.user
    try:
        gameAdmin = GameAdmin.objects.get(uid = user)
    except GameAdmin.DoesNotExist:
        return JsonResponse({
            'message':'GameAdmin not found for the authenticated user.',
            'status':'error'
        },status = 403)
    games = Game.objects.filter(created_by=user)
    data = serialize('json', games)
    return JsonResponse({
        'message':data,
        'status':'success'
    },status = 200)
    

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


@require_POST
@login_required
def updateGame(request,gid):
    try:
        gameAdmin = GameAdmin.objects.get(uid = request.user)
    except GameAdmin.DoesNotExist:
        return JsonResponse({
            'message':'GameAdmin not found for the authenticated user.',
            'status':'error'
        })
    try:
        game = Game.objects.get(gid = gid,created_by = gameAdmin)
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
    

@require_POST
@login_required
def searchGame(request,name):
    user  = request.user
    try:
        gameAdmin = GameAdmin.objects.get(uid = user)
    except GameAdmin.DoesNotExist:
        return JsonResponse({
            'message':'GameAdmin not found for the authenticated user.',
            'status':'error'
        },status = 403)
    games = Game.objects.filter(created_by=user, name__startswith=name)
    data = serialize('json', games)
    return JsonResponse({
        'message':data,
        'status':'success'
    },status = 200)

