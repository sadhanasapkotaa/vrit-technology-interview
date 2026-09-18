from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Service
from .serializers import ServiceSerializer


@api_view(["GET", "POST"])
def service_list(request):
    if request.method == "GET":
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

    serializer = ServiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def service_detail(request, pk):
    try:
        service = Service.objects.get(pk=pk)
    except Service.DoesNotExist:
        return Response(
            {"detail": "Service not found."}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        serializer = ServiceSerializer(service)
        return Response(serializer.data)

    if request.method in ("PUT", "PATCH"):
        partial = request.method == "PATCH"
        serializer = ServiceSerializer(service, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    service.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)