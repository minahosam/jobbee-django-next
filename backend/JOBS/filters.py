from django_filters import rest_framework as filters
from .models import *

class jobFilter(filters.FilterSet):
    min_salary = filters.NumberFilter(field_name='salary',lookup_expr='gt')
    max_salary = filters.NumberFilter(field_name='salary',lookup_expr='lte')
    title = filters.CharFilter(field_name='title',lookup_expr='icontains')
    location = filters.CharFilter(field_name='address',lookup_expr='icontains')
    class Meta:
        model = Job
        fields = ('experience','education','jobType','min_salary','max_salary','title','location')