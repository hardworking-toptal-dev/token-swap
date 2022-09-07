from django.urls import path
from . import views
# import chatswap.swapscripts.zrxrequests as zrxrequests

urlpatterns = [
    path('', views.index, name = "index"),
    path('new/', views.newIndex, name = "newIndex")
    # path('pullPrice/<str:sellTokenAddress>/<str:buyTokenAddress>', views.pullPrice, name = 'pullPrice')
]
