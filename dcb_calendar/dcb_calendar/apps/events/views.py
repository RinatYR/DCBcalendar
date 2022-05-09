from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Category, Event, Subcategory
from .serializers import CategorySerializer, EventSerializer
# from rest_framework import PageNumberPagination

# class EventsAPIPagination(PageNumberPagination):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer


class EventsAPIView(APIView):
    def post(self, request):
        filter = request.data['filter']
        if filter:
            events = Event.objects.filter(category__in=filter).order_by('date').distinct()
        else:
            events = Event.objects.all().order_by('date')
        return Response(EventSerializer(events, many=True).data)


class CategoryAPIView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
