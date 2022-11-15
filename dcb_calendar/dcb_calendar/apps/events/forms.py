from django import forms
from .models import FormsModel

class ContactForm(forms.ModelForm):
    description = forms.CharField(widget=forms.Textarea(attrs={'cols': 100, 'rows': 15}))
    class Meta:
        model = FormsModel
        fields = '__all__'