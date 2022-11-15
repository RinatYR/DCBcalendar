from django.contrib import admin
from .forms import ContactForm
from .models import Category, Event, Links, Mainevent, Subcategory, FormsModel


class LinksAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}

# class AttachmentAdmin(admin.ModelAdmin):
#     def get_model_perms(self, request):
#         return {}

# class PhotoInline(admin.TabularInline):
#     model = PersonPhoto
#     extra = 0
#     max_num = 3


class LinksInline(admin.TabularInline):
    model = Links
    extra = 0
    max_num = 2


class EventAdmin(admin.ModelAdmin):
    # inlines = [PhotoInline, AttachmentInline]
    inlines = [LinksInline]

    # def formfield_for_manytomany(self, db_field, request, **kwargs):
    #     kwargs["queryset"] = Attachment.objects.filter(font_id=self.object_id)
    #     return super().formfield_for_manytomany(db_field, request, **kwargs)


class FormsAdmin(admin.ModelAdmin):
    form = ContactForm


admin.site.register(Links, LinksAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(FormsModel, FormsAdmin)
admin.site.register([Category, Subcategory, Mainevent])
