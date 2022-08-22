from unicodedata import category
from rest_framework import serializers
from .models import Category, Event, Links, Mainevent, Subcategory


# class PersonPhotoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PersonPhoto
#         fields = "__all__"


# class AttachmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Attachment
#         fields = "__all__"

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = "__all__"

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
    links = LinkSerializer(many=True)
    category = SubcategorySerializer(many=True)
    # attachments = AttachmentSerializer(many=True)
    # photos = PersonPhotoSerializer(many=True)

    class Meta:
        model = Event
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True)

    class Meta:
        model = Category
        fields = "__all__"


class MainEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mainevent
        fields = "__all__"