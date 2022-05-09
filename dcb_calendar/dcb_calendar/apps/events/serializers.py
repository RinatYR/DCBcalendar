from rest_framework import serializers
from .models import Category, Event, Attachment, PersonPhoto, Subcategory


class PersonPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonPhoto
        fields = "__all__"


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True)
    photos = PersonPhotoSerializer(many=True)

    class Meta:
        model = Event
        fields = "__all__"


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True)

    class Meta:
        model = Category
        fields = "__all__"
