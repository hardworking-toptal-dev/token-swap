from django.urls import re_path

from . import clients

websocket_urlpatterns = [
    re_path(r"", clients.ChatUser.as_asgi()),
]