from django.urls import path
from .views import *

urlpatterns = [
    path('all-jobs/',all_jobs,name='all-jobs'),
    path('job/<pk>/',get_job,name='job'),
    path('create-job/',create_job,name='create-job'),
    path('update-job/<pk>/',update_job,name='update-job'),
    path('delete-job/<pk>/',delete_job,name='delete-job'),
    path('apply-job/<pk>/',apply_to_job,name='apply-job'),
    path('applied-jobs/',applied_jobs,name='applied-jobs'),
    path('applied-job/<pk>/',IsApplied,name='applied-job'),
    path('me/jobs/',user_jobs,name='me-jobs'),
    path('candidate-list/<pk>/',candidate_list,name='candidate-list'),
    path('stats-job/<str:job>/',get_stats,name='stats-job'),
]
