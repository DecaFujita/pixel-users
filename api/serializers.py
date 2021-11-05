from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Art, ArtLikes, Comments, UserProfile, UserFollows

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'image',)

class UserFollowsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollows
        fields = ('user', 'following',)

class ArtLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtLikes
        fields = ('art', 'likes',)

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('art', 'user', 'comment',)

class ArtSerializer(serializers.ModelSerializer):
    liked_by = ArtLikesSerializer()
    commented_on = CommentsSerializer()
    class Meta:
        model = Art
        fields = ('id', 'title','artist', 'pixelart','timestamp','liked_by', 'commented_on')

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    follows = UserFollowsSerializer() 
    class Meta:
        model = User
        fields = ('id', 'username','email', 'password', 'profile', 'follows','created_by')
        extra_kwargs = {'password': {'write_only': True, 'required': False}} # hiding the password

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        # follow_data = validated_data.pop('following')
        user = User.objects.create_user(**validated_data) # hashing password
        UserProfile.objects.create(user=user, **profile_data)
        # UserFollows.objects.create(user=user, **follow_data)
        Token.objects.create(user=user)
        return user