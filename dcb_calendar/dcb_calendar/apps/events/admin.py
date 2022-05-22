from django.contrib import admin

from .models import Category, Event, Attachment, Mainevent, PersonPhoto, Subcategory


class AttachmentAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


class PhotoInline(admin.TabularInline):
    model = PersonPhoto
    extra = 0
    max_num = 3


class AttachmentInline(admin.TabularInline):
    model = Attachment
    extra = 0
    max_num = 2


class EventAdmin(admin.ModelAdmin):
    inlines = [PhotoInline, AttachmentInline]

    # def formfield_for_manytomany(self, db_field, request, **kwargs):
    #     kwargs["queryset"] = Attachment.objects.filter(font_id=self.object_id)
    #     return super().formfield_for_manytomany(db_field, request, **kwargs)


admin.site.register(Attachment, AttachmentAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register([Category, Subcategory, Mainevent])
