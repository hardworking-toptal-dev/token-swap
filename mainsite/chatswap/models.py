from django.db import models

class generalUser(models.Model):
    address = models.CharField(max_length = 40)
    username = models.CharField(max_length = 20)
    lastLogin = models.DateTimeField("Last Login")

class message(models.Model):
    text = models.CharField(max_length = 500)
    username = models.CharField(max_length = 20)
    upVotes = models.IntegerField()
    downVotes = models.IntegerField()
    messageTime = models.DateTimeField("Sent @")