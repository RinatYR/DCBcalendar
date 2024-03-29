from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Category, Event, Mainevent
from .forms import ContactForm
from .serializers import CategorySerializer, EventSerializer, MainEventSerializer
from django.utils import timezone
# from rest_framework import PageNumberPagination

# class EventsAPIPagination(PageNumberPagination):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer


class EventsAPIView(APIView):
    def post(self, request):
        filter = request.data['filter']
        filterCategories = filter['categories']
        filterSearch = filter['search']

        if filter:
            categoryList = Category.objects.filter(subcategories__in=filterCategories)
            categories = list(map(lambda cat: cat.subcategories.filter(id__in=filterCategories), categoryList))
            # events = Event.objects.filter(category__in=filterCategories).annotate(num_category=Count('category')).filter(num_category=len(filterCategories)).order_by('date').distinct()
            # events = Event.objects.filter(category__in=categories[0]).filter(category__in=categories[1]).order_by('date').distinct()
            events = Event.objects.order_by('date').distinct()
            for catList in categories:
                events = events.filter(category__in=catList)

            if filterSearch:
                events = events.filter(title__icontains=filterSearch)

        else:
            events = Event.objects.all().order_by('date')
        return Response(EventSerializer(events, many=True).data)


class CalendarAPIView(APIView):
    def post(self, request):
        filter = request.data['filter']
        filterCategories = filter['categories']
        filterSearch = filter['search']

        if filter:
            categoryList = Category.objects.filter(subcategories__in=filterCategories)
            categories = list(map(lambda cat: cat.subcategories.filter(id__in=filterCategories), categoryList))
            events = Event.objects.order_by('date').distinct()
            for catList in categories:
                events = events.filter(category__in=catList)

            if filterSearch:
                events = events.filter(title__icontains=filterSearch)

        else:
            events = Event.objects.all().order_by('date')
        response = {}
        for event in events:
            print(event.date)
            date = timezone.localtime(event.date)
            day = date.strftime('%-d')
            print(day)
            month = date.strftime('%-m')
            year = date.strftime('%Y')
            if not year in response:
                response[year] = {}
            if not month in response[year]:
                response[year][month] = {}
            if not day in response[year][month]:
                response[year][month][day] = True

        return Response(response)


class CategoryAPIView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class MainEventAPIView(generics.ListAPIView):
    queryset = Mainevent.objects.all()
    serializer_class = MainEventSerializer


class FormsAPIView(APIView):
    def post(self, request):
        form = ContactForm(request.data)
        print(form.is_valid())
        if form.is_valid():
            form.save()
            return Response('Спасибо за обратную связь, мы свяжемся с вами в ближайшее время!')
        else:
            return Response('Данные в форме невалидны, проверьте корректность заполненных полей!', 400)
