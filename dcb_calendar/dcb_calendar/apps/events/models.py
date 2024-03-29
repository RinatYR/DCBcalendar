from django.db import models
# from PIL import Image
# from .utils import imageResize
# from django.db.models.signals import post_delete, pre_save


class Mainevent(models.Model):
    image = models.ImageField('Фото', upload_to='attachmentImage')
    title = models.CharField('Название события', max_length=100)
    description = models.CharField('Дополнительное описание', max_length=150)
    action_text = models.CharField('Текст кнопки', max_length=50, blank=True)
    action_link = models.CharField('Ссылка', max_length=2048, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'главное событие'
        verbose_name_plural = 'главные события'


class Category(models.Model):
    name = models.CharField('Название категории', max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'
        ordering = ['name']


class Subcategory(models.Model):
    name = models.CharField('Название категории', max_length=100)
    color = models.CharField('Цвет', max_length=6, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,
                                 related_name='subcategories', default=None, blank=True, null=True, verbose_name='Категория')

    def __str__(self):
        return '%s (%s)' % (self.name, self.category or 'Без категории')

    def natural_key(self):
        return self.color

    class Meta:
        verbose_name = 'подкатегория'
        verbose_name_plural = 'подкатегории'
        ordering = ['category', 'name']


class Event(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField('Название события', max_length=128)
    description = models.CharField('Дополнительное описание', max_length=128)
    date = models.DateTimeField('Дата')
    date_end = models.DateField('Дата окончания (при необходимости)', blank=True, null=True)
    place = models.CharField('Место проведения', max_length=128, default='Москва', blank=True)
    format = models.CharField('Формат проведения', max_length=128, default='Онлайн',blank=True)
    # action_text = models.CharField('Текст кнопки', max_length=50, blank=True)
    link = models.CharField('Ссылка', max_length=2048, blank=True)
    category = models.ManyToManyField(Subcategory, verbose_name='Фильтр', )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'событие'
        verbose_name_plural = 'события'


class Links(models.Model):
    text = models.CharField('Текст ссылки', max_length=128)
    link = models.CharField('Ссылка', max_length=2048)
    event = models.ForeignKey(Event, on_delete=models.CASCADE,
                              related_name='links', default=None, blank=True, null=True)

    class Meta:
        verbose_name = 'ссылка'
        verbose_name_plural = 'ссылки'
        ordering = ['text']


class FormsModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField('Вид обратной связи', max_length=128)
    name = models.CharField('Контакты', max_length=256)
    email = models.CharField('Почта', max_length=128)
    description = models.CharField('Описание', max_length=2048)

    def __str__(self):
        return '%s (%s)' % (self.name, self.title)

    class Meta:
        verbose_name = 'форма обратной связи'
        verbose_name_plural = 'формы обратной связи'

# class PersonPhoto(models.Model):
#     image = models.ImageField('Фото', upload_to='attachmentImage')
#     event = models.ForeignKey(Event, on_delete=models.CASCADE,
#                               related_name='photos', default=None, blank=True, null=True)

#     def save(self, *args, **kwargs):
#         instance = super(PersonPhoto, self).save(*args, **kwargs)
#         if not self.image:
#             return instance
#         resizedImage = imageResize(Image.open(self.image.path), 50)
#         resizedImage.save(self.image.path, quality=80, optimize=True)

#         return instance

#     class Meta:
#         verbose_name = 'фото участника'
#         verbose_name_plural = 'фото участников'


# class Attachment(models.Model):
#     image = models.ImageField('Иконка', upload_to='attachmentImage')
#     link = models.CharField('Ссылка', max_length=2048)
#     event = models.ForeignKey(Event, on_delete=models.CASCADE,
#                               related_name='attachments', default=None, blank=True, null=True)

#     def save(self, *args, **kwargs):
#         instance = super(Attachment, self).save(*args, **kwargs)
#         if not self.image:
#             return instance
#         resizedImage = imageResize(Image.open(self.image.path), 50)
#         resizedImage.save(self.image.path, quality=80, optimize=True)

#         return instance

#     class Meta:
#         verbose_name = 'вложение'
#         verbose_name_plural = 'вложения'
#         ordering = ['link']


# def post_save_image(sender, instance, *args, **kwargs):
#     try:
#         instance.image.delete(save=False)
#     except:
#         pass


# def pre_save_image(sender, instance, *args, **kwargs):
#     try:
#         old_img = instance.__class__.objects.get(id=instance.id).image.path
#         try:
#             new_img = instance.image.path
#         except:
#             new_img = None
#         if new_img != old_img:
#             import os
#             if os.path.exists(old_img):
#                 os.remove(old_img)
#     except:
#         pass


# post_delete.connect(post_save_image, sender=PersonPhoto)
# pre_save.connect(pre_save_image, sender=PersonPhoto)
# post_delete.connect(post_save_image, sender=Attachment)
# pre_save.connect(pre_save_image, sender=Attachment)
# post_delete.connect(post_save_image, sender=Mainevent)
# pre_save.connect(pre_save_image, sender=Mainevent)
