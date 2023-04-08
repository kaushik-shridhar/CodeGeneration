from .utils import *

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

def upload(request):
    if request.method == 'POST':
        output = generate_html(request.FILES['file'])
        return HttpResponse(output)
    return render(request, 'upload/upload_page.html')