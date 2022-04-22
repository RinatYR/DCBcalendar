from django.db import models

class Event(models.Model):
    title = models.CharField('Название события', max_length = 100)
    description = models.CharField('Дополнительное описание', max_length = 150)
    date = models.DateTimeField('Дата')
    photo = models.ImageField('Фото', upload_to='attachmentImage')
    action_text = models.CharField('Текст кнопки', max_length = 50)
    action_link = models.CharField('Ссылка', max_length = 2048)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'

class Attachment(models.Model):
    image = models.ImageField(upload_to='attachmentImage')
    link = models.CharField('Ссылка', max_length = 2048)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='Событие', default=None, blank=True, null=True)

    class Meta:
        verbose_name = 'Вложение'
        verbose_name_plural = 'Вложения'
        ordering = ['link']
