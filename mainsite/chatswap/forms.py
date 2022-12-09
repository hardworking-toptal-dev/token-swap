from django.forms import ModelForm
from chatswap.models import *

#Not used
class UserForm(ModelForm):
    class Meta:
        model = generalUser
        fields = "username"