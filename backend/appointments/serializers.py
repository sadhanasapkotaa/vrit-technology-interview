from rest_framework import serializers

from .models import Appointment
from services.serializers import ServiceSerializer


class AppointmentSerializer(serializers.ModelSerializer):
    service_detail = ServiceSerializer(source="service", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "customer_name",
            "customer_phone",
            "service",
            "service_detail",
            "date",
            "time",
            "notes",
            "status",
            "status_display",
        ]
        read_only_fields = ["id"]

    def validate_customer_phone(self, value):
        cleaned = value.replace(" ", "").replace("-", "").replace("+", "")
        if not cleaned.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits, spaces, hyphens, or a +.")
        
        if len(cleaned) < 7:
            raise serializers.ValidationError("Phone number is too short.")
        return value

    def validate(self, attrs):
        instance = self.instance
        new_status = attrs.get("status")
        if instance and new_status and new_status != instance.status:
            allowed = Appointment.STATUS_TRANSITIONS.get(instance.status, set())
            if new_status not in allowed:
                raise serializers.ValidationError(
                    {
                        "status": (
                            f"Cannot change status from '{instance.status}' "
                            f"to '{new_status}'."
                        )
                    }
                )
        return attrs