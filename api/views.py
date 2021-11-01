from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import action
from rest_framework.response import Response
from api.serializers import UserSerializer, ChangePasswordSerializer
from rest_framework import viewsets
from .models import Art, UserProfile, UserFollows
from api.serializers import ArtSerializer, UserProfileSerializer, UserFollowsSerializer
from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly


class UserViewset(viewsets.ModelViewSet): # built in GET, POST, PUT, DELETE
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserProfileViewset(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = (TokenAuthentication,) #don't forget the ','!
    # permission_classes = (AllowAny,)

    @action(methods=['PUT'], detail=True, serializer_class=ChangePasswordSerializer)
    # what kind of method/function is going to be acccepted
    # We don't wan't to POST it, or it would create a record. In this case ,it could be PUT or PATCH
    # Details True --> Requests an UserID.
    def change_pass(self, request, pk): # creating own method
        user = User.objects.get(pk=pk)
        serializer = ChangePasswordSerializer(data=request.data)
        

        if serializer.is_valid():
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'message': 'Wrong old password'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'message': 'Password updated'}, status=status.HTTP_200_OK)
                

class UserFollowsViewset(viewsets.ModelViewSet):
    queryset = UserFollows.objects.all()
    serializer_class = UserFollowsSerializer

class ArtViewset(viewsets.ModelViewSet):
    queryset = Art.objects.all()
    serializer_class = ArtSerializer

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = User.objects.get(id=token.user_id)
        userSerializer = UserSerializer(user, many=False)
        return Response({'token': token.key, 'user': userSerializer.data})
