from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator
from django.contrib.gis.db import models as gismodels
from django.contrib.gis.geos import Point
from datetime import *
from django.contrib.auth.models import User
import geocoder
import os
from decouple import config

# Create your models here.

class JobType(models.TextChoices):
    Permanent = 'Permanent'
    Temporary = 'Temporary'
    Intership = 'Intership'

class Education(models.TextChoices):
    Bachelors = 'Bachelors'
    Masters = 'Masters'
    Phd = 'Phd'

class Inidustry(models.TextChoices):
    Business = 'Business'
    IT = 'IT'
    Banking = 'Banking'
    Education = 'Education/Training'
    Telecommunication = 'Telecommunication'
    Others = 'Others'

class Experience(models.TextChoices):
    NoExperience = 'No Experience'
    OneYear = '1 Year'
    TwoYears = '2 Years'
    ThreeYearsPlus = '3 Years above'

def return_date_time():
    now =date.today()
    return now + timedelta(days=10)

class Job(models.Model):
    title = models.CharField(max_length=200,null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=2000,null=True) 
    jobType =  models.CharField(max_length=20,default=JobType.Permanent,choices=JobType.choices)
    education = models.CharField(max_length=10,default=Education.Bachelors,choices=Education.choices)
    industry = models.CharField(max_length=20,default=Inidustry.Business,choices=Inidustry.choices)
    experience = models.CharField(max_length=20,default=Experience.NoExperience,choices=Experience.choices)
    salary = models.IntegerField(default=1,validators=[MinValueValidator(1),MaxValueValidator(1000000)])
    positions = models.IntegerField(default=1)
    point = gismodels.PointField(default=Point(0.0,0.0))
    lastDate = models.DateField(default=return_date_time)
    user = models.ForeignKey(User,related_name='jobCreator',on_delete=models.SET_NULL,null=True)
    created = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        g = geocoder.mapquest(self.address,key=config('GEOCODER_API'))
        lng = g.lng
        lat = g.lat
        self.point = Point(lng,lat)
        super(Job, self).save(*args, **kwargs)


class CandidateApplied(models.Model):
    job = models.ForeignKey(Job,related_name='appliedJob',on_delete=models.SET_NULL,null=True)
    user = models.ForeignKey(User,related_name='appliedUser',on_delete=models.CASCADE)
    resume = models.CharField(max_length=255)
    appliedAt = models.DateField(auto_now_add=True)