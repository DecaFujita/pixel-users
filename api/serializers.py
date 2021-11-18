from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Art, ArtLikes, Cathegories, Collection, Comments, UserProfile, UserFollows

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class UserFollowsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollows
        fields = ('id', 'user', 'following',)
        
class UserProfileSerializer(serializers.ModelSerializer):
    # followed_by = UserFollowsSerializer()
    class Meta:
        model = UserProfile
        fields = ('id', 'image',)

class ArtLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtLikes
        fields = ('id', 'art', 'likes',)

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('art', 'user', 'comment',)

class CathegoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cathegories
        fields = ('id', 'title',)

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ('id', 'users','art')

class ArtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Art
        fields = ('id', 'title','artist', 'cathegory', 'pixelart', 'timestamp',)

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ('id', 'username','email', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True, 'required': False}} # hiding the password

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        # follow_data = validated_data.pop('following')
        user = User.objects.create_user(**validated_data) # hashing password
        UserProfile.objects.create(user=user, **profile_data)
        # UserFollows.objects.create(user=user, **follow_data)
        Token.objects.create(user=user)
        return user