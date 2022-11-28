from django.db import models

class User(models.Model):
    address = models.CharField(max_length = 40)
    username = models.CharField(max_length = 20)
    lastLogin = models.DateTimeField("Last Login")
