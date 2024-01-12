# when debug = True
from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)
    exc_class = exc.__class__.__name__
    print(exc_class)
    if exc_class == 'AuthenticationFailed':
        response.data = {'error':'Invalid Email or Password. Please try again'}

    if exc_class == 'NotAuthenticated':
        response.data = {'error':'Login First to access this resource'}

    if exc_class == 'InvalidToken':
        response.data = {'error':'Login has expired. Please Login again'}
    return response