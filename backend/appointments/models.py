from django.core.exceptions import ValidationError
from django.db import models
from services.models import Service


class Appointment(models.Model):
    class Status(models.TextChoices):
        PENDING = "Pending", "Pending"
        CONFIRMED = "Confirmed", "Confirmed"
        COMPLETED = "Completed", "Completed"
        CANCELLED = "Cancelled", "Cancelled"

    STATUS_TRANSITIONS = {
        Status.PENDING: {Status.CONFIRMED, Status.CANCELLED},
        Status.CONFIRMED: {Status.COMPLETED, Status.CANCELLED},
        Status.COMPLETED: set(),
        Status.CANCELLED: set(),
    }

    customer_name = models.CharField(max_length=150)
    customer_phone = models.CharField(max_length=15)
    service = models.ForeignKey(Service, on_delete=models.PROTECT, related_name="appointments")
    date = models.DateField()
    time = models.TimeField()
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING,)

    def __str__(self):
        return f"{self.customer_name} - {self.service.name} on {self.date} {self.time}"


    def clean(self):
        if self.pk:
            previous_status = (Appointment.objects.filter(pk=self.pk).values_list("status", flat=True).first())

            if previous_status and previous_status != self.status:
                allowed = self.STATUS_TRANSITIONS.get(previous_status, set())
                if self.status not in allowed:
                    raise ValidationError(
                        {
                            "status": (
                                f"Cannot change status from '{previous_status}' "
                                f"to '{self.status}'."
                            )
                        }
                    )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)