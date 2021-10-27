from django.db import models
from django.contrib.auth.models import User

def upload_path_handler(instance, filename): 
    return 'avatars/{id}/{file}'.format(id=instance.user.id, file=filename)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    image = models.ImageField(upload_to=upload_path_handler, blank=True)
    # is_premium = models.BooleanField(default=False)
    # bio = models.CharField(max_length=256, blank=True, null=True)

class UserFollows(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='follows')
    following = models.ManyToManyField(User, blank=True)

class Art(models.Model):
    title = models.CharField(max_length=120)
    artist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_by')
    pixelart = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)


    def _str_(self):
        return self.title

