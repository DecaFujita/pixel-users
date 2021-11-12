from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Art, ArtLikes,Cathegories, Comments, UserProfile, UserFollows

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
        fields = ('id', 'art', 'likes',)

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('art', 'user', 'comment',)

class CathegoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cathegories
        fields = ('id', 'title',)

class ArtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Art
        fields = ('id', 'title','artist', 'cathegory', 'pixelart','timestamp',)

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