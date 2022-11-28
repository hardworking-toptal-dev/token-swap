from django.forms import ModelForm
from chatswap.models import *

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ["address", "username"]