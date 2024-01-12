# when debug=false
from django.http import JsonResponse

def handler404(request,exception=None):
    message = ('Route Not Found')
    response = JsonResponse(data={'error': message})
    response.status_code = 404
    print(response)
    return response

def handler500(request):
    message =  ('Internal Server Error')
    response = JsonResponse(data={'error': message})
    response.status_code = 500
    return response
