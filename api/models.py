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
    following = models.ManyToManyField(User, blank=True, related_name='followed_by')

    class Meta:
        verbose_name_plural = "User follows"

    def __str__(self):
       return str(self.user)

class Cathegories(models.Model):
    title = models.CharField(max_length=120)

    class Meta:
        verbose_name_plural = "Cathegories"

    def __str__(self):
        return str(self.title)

       
class Art(models.Model):
    title = models.CharField(max_length=120)
    artist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='artwork')
    pixelart = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    cathegory = models.ForeignKey(Cathegories, on_delete=models.CASCADE)

    def __str__(self):
       return str(self.title)

class ArtLikes(models.Model):
    art = models.OneToOneField(Art, on_delete=models.CASCADE, related_name='liked_by')
    likes = models.ManyToManyField(User, blank=True)

    class Meta:
        verbose_name_plural = "Art likes"

    def __str__(self):
       return str(self.art)

class Comments(models.Model):
    art = models.OneToOneField(Art, on_delete=models.CASCADE, related_name='commented_on')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commented_by')
    comment = models.TextField()

    class Meta:
        verbose_name_plural = "Art comments"

    def __str__(self):
       return str(self.art)

class Collection(models.Model):
    art = models.OneToOneField(Art, on_delete=models.CASCADE, related_name='collected')
    users = models.ManyToManyField(User, blank=True)

    def __str__(self):
       return str(self.art)