from unicodedata import category
from rest_framework import generics
from .models import Category, Event, Subcategory
from .serializers import CategorySerializer, EventSerializer
# from rest_framework import PageNumberPagination

# class EventsAPIPagination(PageNumberPagination):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer


class EventsAPIView(generics.ListAPIView):
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer


class CategoryAPIView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
