from django.urls import path
from . import views

urlpatterns = [
    path("services/", views.service_list, name="service-list"),
    path("services/<int:pk>/", views.service_detail, name="service-detail"),
]