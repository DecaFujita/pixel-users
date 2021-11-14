from django.conf.urls import url, include
from api import views
from rest_framework import routers
router = routers.DefaultRouter()

router.register(r'art', views.ArtViewset)
router.register(r'cathegories', views.CathegoriesViewset)
router.register(r'collection', views.CollectionViewset)
router.register(r'comments', views.ArtCommentsViewset)
router.register(r'following', views.UserFollowsViewset)
router.register(r'likes', views.ArtLikesViewset)
router.register(r'profile', views.UserProfileViewset)
router.register(r'users', views.UserViewset)
 
urlpatterns = [
    url(r'^', include(router.urls)),
    url('authenticate/', views.CustomObtainAuthToken.as_view())
]
