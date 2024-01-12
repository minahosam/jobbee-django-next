from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *
from .validations import *

# Create your views here.

@api_view(['POST'])
def register_user(request):
    data = request.data
    password = data['password']
    passw = make_password(password)
    if data['password'] != data['confirm_password']:
        return Response({'error':'password mismatch'})
    if not User.objects.filter(email=data['email']).exists():
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['username'],
            email=data['email'],
            password=passw
        )
        user.save()
        serialize = signupSerializer(user)
        return Response({'message':'user successfully registered'},status=status.HTTP_200_OK)
    else:
        return Response({'error':'user already exists'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail(request):
    user = request.user
    req_user = User.objects.get(username=user)
    serialize = userSerializer(req_user)
    return Response(serialize.data,status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    data = request.data
    print(data)
    # serialize = signupSerializer(user,data,partial=True)
    # if serialize.is_valid():
    #     serialize.save()
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.email = data['email']
    user.username = data['username']
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    serialize = userSerializer(user)
    return Response(serialize.data,status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upload_resume(request):
    user = request.user
    data = request.data
    print(data)
    resume = data['resume']
    if resume == '':
        return Response('please upload resume',status=status.HTTP_400_BAD_REQUEST)
    print(resume.name)
    validate = validate_resume(resume.name)
    if not validate:
        return Response('please upload resume only',status=status.HTTP_400_BAD_REQUEST)
    user.profile.resume = resume
    user.profile.save()
    return Response('uploaded successfully',status=status.HTTP_200_OK)
