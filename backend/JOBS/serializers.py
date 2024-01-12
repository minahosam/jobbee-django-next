from rest_framework import serializers
from .models import *

class jobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class candidateSerializer(serializers.ModelSerializer):
    job = jobSerializer()
    class Meta:
        model = CandidateApplied
        fields = '__all__'