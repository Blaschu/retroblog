from django.http import HttpResponse

def index(request):
    return HttpResponse("Bienvenido al backend de RetroBlog")