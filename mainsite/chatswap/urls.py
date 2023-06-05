from django.urls import path
from . import views
# import chatswap.swapscripts.zrxrequests as zrxrequests

urlpatterns = [
    path('', views.index, name = "index"),
    path('getuser/<str:address>/', views.getUser, name = "getuser"),
    # path('pullPrice/<str:sellTokenAddress>/<str:buyTokenAddress>', views.pullPrice, name = 'pullPrice')
    path('react', views.reactMigrate, name = "reactMigrate")
]
