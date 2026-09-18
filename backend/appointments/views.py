from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status as http_status
from django.db.models import Q
from .models import Appointment
from .serializers import AppointmentSerializer


@api_view(["GET", "POST"])
def appointment_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.select_related("service").all()
        status_filter = request.query_params.get("status")
        if status_filter:
            appointments = appointments.filter(status__iexact=status_filter)
        search = request.query_params.get("search")
        if search:
            appointments = appointments.filter(
                Q(customer_name__icontains=search) | Q(customer_phone__icontains=search)
            )

        date_filter = request.query_params.get("date")
        if date_filter:
            appointments = appointments.filter(date=date_filter)

        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    # POST
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=http_status.HTTP_201_CREATED)
    return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def appointment_detail(request, pk):
    try:
        appointment = Appointment.objects.select_related("service").get(pk=pk)
    except Appointment.DoesNotExist:
        return Response(
            {"detail": "Appointment not found."}, status=http_status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    if request.method in ("PUT", "PATCH"):
        partial = request.method == "PATCH"
        serializer = AppointmentSerializer(appointment, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

    appointment.delete()
    return Response(status=http_status.HTTP_204_NO_CONTENT)


def appointment_page(request):
    return render(request, "appointments/manage.html")