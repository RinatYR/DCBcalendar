from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Category, Event, Mainevent
from .serializers import CategorySerializer, EventSerializer, MainEventSerializer
# from rest_framework import PageNumberPagination

# class EventsAPIPagination(PageNumberPagination):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer


class EventsAPIView(APIView):
    def post(self, request):
        filterList = request.data['filter']

        if filterList:
            categoryList = Category.objects.filter(subcategories__in=filterList)
            categories = list(map(lambda cat: cat.subcategories.filter(id__in=filterList), categoryList))
            # events = Event.objects.filter(category__in=filterList).annotate(num_category=Count('category')).filter(num_category=len(filterList)).order_by('date').distinct()
            # events = Event.objects.filter(category__in=categories[0]).filter(category__in=categories[1]).order_by('date').distinct()
            events = Event.objects.order_by('date').distinct()
            for catList in categories:
                events = events.filter(category__in=catList)

        else:
            events = Event.objects.all().order_by('date')
        return Response(EventSerializer(events, many=True).data)


class CategoryAPIView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class MainEventAPIView(generics.ListAPIView):
    queryset = Mainevent.objects.all()
    serializer_class = MainEventSerializer