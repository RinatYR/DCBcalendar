from django.contrib import admin

from .models import Event, Attachment

class AttachmentAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}

class AttachmentInline(admin.StackedInline):
    model = Attachment

class EventAdmin(admin.ModelAdmin):
    inlines = [AttachmentInline]

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        kwargs["queryset"] = Attachment.objects.filter(font_id=self.object_id)
        return super().formfield_for_manytomany(db_field, request, **kwargs)

admin.site.register(Attachment, AttachmentAdmin)
admin.site.register(Event, EventAdmin)
