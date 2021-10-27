from django.conf.urls import url, include
from api import views
from rest_framework import routers
router = routers.DefaultRouter()
router.register(r'users', views.UserViewset)
# router.register(r'profile', views.UserProfileViewset)
router.register(r'following', views.UserFollowsViewset)
router.register(r'art', views.ArtViewset)
 
urlpatterns = [
    url(r'^', include(router.urls)),
    url('authenticate/', views.CustomObtainAuthToken.as_view())
]
