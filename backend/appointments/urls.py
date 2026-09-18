from django.urls import path
from . import views

urlpatterns = [
    path("appointments/", views.appointment_list, name="appointment-list"),
    path("appointments/<int:pk>/", views.appointment_detail, name="appointment-detail"),
    path("appointments/manage/", views.appointment_page, name="appointment-page"),
]