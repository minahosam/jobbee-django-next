from rest_framework import serializers
from django.contrib.auth.models import User


class signupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type': 'password'},write_only=True)
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password','username','confirm_password')

    extra_kwargs = {
        'first_name':{'required':True,'allow_blank':False},
        'last_name':{'required':True,'allow_blank':False},
        'email':{'required':True,'allow_blank':False},
        'username':{'required':True,'allow_blank':False},
        'password':{'required':True,'min_length':6,'write_only':True},
    }


class userSerializer(serializers.ModelSerializer):
    resume = serializers.CharField(source = 'profile.resume')
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'resume')