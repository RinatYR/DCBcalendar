from django.urls import path
from . import views

urlpatterns = [
    path('events', views.EventsAPIView.as_view()),
    path('categories', views.CategoryAPIView.as_view()),
    path('mainevent', views.MainEventAPIView.as_view())
]
