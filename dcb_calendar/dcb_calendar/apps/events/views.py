from rest_framework import generics
from .models import Event
from .serializers import EventSerializer
# from rest_framework import PageNumberPagination

# class EventsAPIPagination(PageNumberPagination):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer

class EventsAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer