from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .filters import *
from rest_framework.pagination import PageNumberPagination
from Account.models import *
from django.db.models import Count,Avg,Max,Min

# Create your views here.

@api_view(['GET'])
def all_jobs(request):
    filterSet = jobFilter(request.GET,queryset=Job.objects.all())
    count = filterSet.qs.count()
    resPerPage = 3
    paginator = PageNumberPagination()
    paginator.page_size = resPerPage
    querySet = paginator.paginate_queryset(filterSet.qs,request)
    serialize = jobSerializer(querySet,many=True)
    return Response(({'count':count,'resPerPage':resPerPage,'jobs':serialize.data}),status=status.HTTP_200_OK)

@api_view(['GET'])
def get_job(request,pk):
    req_job = get_object_or_404(Job,pk=pk)
    serialize = jobSerializer(req_job)
    appliedCandidates = req_job.appliedJob.all().count()
    return Response({'job':serialize.data,'candidates':appliedCandidates},status=status.HTTP_200_OK)

@api_view(['POST'])
def create_job(request):
    data = request.data
    user = request.user
    req_user = User.objects.get(username=user)
    job = Job.objects.create(
        title = data['title'],
        description = data['description'],
        email = data['email'],
        address = data['address'],
        experience=data['experience'],
        jobType = data['jobType'],
        education = data['education'],
        industry = data['industry'],
        salary = data['salary'],
        positions = data['positions'],
        user = req_user
    )
    serialize = jobSerializer(job)
    return Response(serialize.data,status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_job(request,pk):
    user_account = request.user
    data = request.data
    req_job = Job.objects.get(pk=pk)
    user = user_account
    req_user = User.objects.get(username=user)
    if user_account != req_job.user:
        return Response({'error':'you are not allowed to update this job'},status=status.HTTP_400_BAD_REQUEST)
    # if user:
    #     req_job.user = req_user
    #     serialize = jobSerializer(req_job,data)
    #     if serialize.is_valid():
    #         serialize.save()
    #         return Response(serialize.data,status=status.HTTP_200_OK)
    #     else:
    #         return Response(serialize.errors)
    req_job.user = req_user
    req_job.title = data['title']
    req_job.description = data['description']
    req_job.email = data['email']
    req_job.address = data['address']
    req_job.jobType = data['jobType']
    req_job.education = data['education']
    req_job.industry = data['industry']
    req_job.experience = data['experience']
    req_job.salary = data['salary']
    req_job.positions = data['positions']
    req_job.save()
    serialize = jobSerializer(req_job)
    return Response(serialize.data)
    

@api_view(['DELETE'])
def delete_job(request,pk):
    user = request.user
    req_job = get_object_or_404(Job, pk=pk)
    if user != req_job.user:
        return Response({'error':'you are not allowed to delete this job'},status=status.HTTP_403_FORBIDDEN)
    req_job.delete()
    return Response('deleted',status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_to_job(request,pk):
    user = request.user
    job = get_object_or_404(Job, pk=pk)
    if user.profile.resume == '':
        return Response({'error':'upload your resume first'},status=status.HTTP_400_BAD_REQUEST)
    if job.lastDate < date.today():
        return Response({'error':'you can not apply to this job.Date is over'},status=status.HTTP_400_BAD_REQUEST)
    alreadyApply = job.appliedJob.filter(user=user).exists()
    if alreadyApply:
        return Response({'error':'you have already applied this job'},status=status.HTTP_400_BAD_REQUEST)
    if user == job.user:
        return Response({'error':'you cannot apply this job'},status=status.HTTP_400_BAD_REQUEST)
    apply = CandidateApplied.objects.create(user=user, job=job,resume=user.profile.resume)
    return Response({'apply':True,'applied_id':apply.id},status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def applied_jobs(request):
    user = request.user
    applied = CandidateApplied.objects.filter(user=user)
    serialize = candidateSerializer(applied,many=True)
    return Response(serialize.data,status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def IsApplied(request,pk):
    user = request.user
    req_job = Job.objects.get(pk=pk)
    if not req_job:
        return Response({'error':'Job not found'},status=status.HTTP_404_NOT_FOUND)
    applied = req_job.appliedJob.filter(user=user).exists()
    return Response(applied,status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_jobs(request):
    user = request.user
    jobs_created = Job.objects.filter(user=user)
    serialize = jobSerializer(jobs_created,many=True)
    return Response(serialize.data,status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def candidate_list(request,pk):
    user = request.user
    job = get_object_or_404(Job,pk=pk)
    if user != job.user:
        return Response('you are not allowed to this job',status=status.HTTP_400_BAD_REQUEST)
    candidates = CandidateApplied.objects.filter(job=job)
    serialize = candidateSerializer(candidates,many=True)
    return Response(serialize.data,status=status.HTTP_200_OK)

@api_view(['GET'])
def get_stats(request,job):
    req_job = Job.objects.filter(title__icontains=job)
    if len(req_job) == 0:
        return Response({'message':'No such job until now'},status=status.HTTP_200_OK)
    if req_job:
        stats = req_job.aggregate(
            available_positions = Count('title'),
            average_positions = Avg('positions'),
            average_salary = Avg('salary'),
            min_salary = Min('salary'),
            max_salary = Max('salary')
        )
        return Response(stats,status=status.HTTP_200_OK)
    else:
        return Response({'message':'there is an error.Please try again'},status=status.HTTP_400_BAD_REQUEST)