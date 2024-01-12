from django.urls import path
from .views import *


urlpatterns = [
    path('register/',register_user,name='register'),
    path('me/',user_detail,name='me'),
    path('update-profile/',update_profile,name='update'),
    path('upload-resume/',upload_resume,name='upload'),
]
