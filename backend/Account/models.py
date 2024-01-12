from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save,pre_delete
from django.dispatch import receiver

# Create your models here.
class userProfile(models.Model):
    profile = models.OneToOneField(User,related_name='profile',on_delete=models.SET_NULL,null=True)
    resume = models.FileField(null=True)
    
@receiver(post_save,sender=User)
def save_profile(sender,instance,created,**kwargs):
    user = instance
    if created:
        profile = userProfile(profile=user)
        profile.save()

@receiver(pre_delete,sender=User)
def delete_profile(sender,instance,**kwargs):
    user = instance
    profile = userProfile.objects.get(profile=user)
    profile.delete()