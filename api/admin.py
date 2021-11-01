from django.contrib import admin
from .models import Art, UserProfile, UserFollows

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    fields = ('user', 'image')
    list_display = ('user', 'image')

@admin.register(UserFollows)
class UserFollowsAdmin(admin.ModelAdmin):
    def following_count(self, obj):
        return obj.following.count()
    following_count.short_description = "Follows"
    list_display = ('user', 'following_count')

    verbose_name_plural = "follows"

@admin.register(Art)
class ArtAdmin(admin.ModelAdmin):
    list_display = ('id', 'title','artist', 'likes')
