from django.db import models
from PIL import Image
import math

SIZE_FOR_RESIZE = 150


class Event(models.Model):
    title = models.CharField('Название события', max_length=100)
    description = models.CharField('Дополнительное описание', max_length=150)
    date = models.DateTimeField('Дата')
    photo = models.ImageField('Фото', upload_to='attachmentImage', blank=True)
    action_text = models.CharField('Текст кнопки', max_length=50, blank=True)
    action_link = models.CharField('Ссылка', max_length=2048, blank=True)

    def save(self, *args, **kwargs):
        instance = super(Event, self).save(*args, **kwargs)
        if not self.photo:
            return instance
        image = Image.open(self.photo.path)
        width, height = image.size
        if width > SIZE_FOR_RESIZE and height > SIZE_FOR_RESIZE:
            scale = width/SIZE_FOR_RESIZE if width < height else height/SIZE_FOR_RESIZE
            width = math.floor(width/scale)
            height = math.floor(height/scale)
            image = image.resize((width, height),Image.ANTIALIAS)
        image.save(self.photo.path, quality=80, optimize=True)
        return instance

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'


class Attachment(models.Model):
    image = models.ImageField(upload_to='attachmentImage')
    link = models.CharField('Ссылка', max_length=2048)
    event = models.ForeignKey(Event, on_delete=models.CASCADE,
                              related_name='attachments', default=None, blank=True, null=True)

    class Meta:
        verbose_name = 'Вложение'
        verbose_name_plural = 'Вложения'
        ordering = ['link']
