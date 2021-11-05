from django.contrib import admin
from .models import Art, ArtLikes, UserProfile, UserFollows

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
    list_display = ('id', 'title','artist')

@admin.register(ArtLikes)
class ArtLikesAdmin(admin.ModelAdmin):
    def likes_count(self, obj):
        return obj.likes.count()
    likes_count.short_description = "Likes"
    list_display = ('art', 'likes_count')

    verbose_name_plural = "likes"

class ArtCommentsAdmin(admin.ModelAdmin):
    list_display = ('art', 'user', 'comment')

    verbose_name_plural = "comments"

