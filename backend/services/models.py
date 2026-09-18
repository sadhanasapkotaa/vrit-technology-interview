from django.db import models
from django.core.validators import MinValueValidator

class Service(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    duration = models.PositiveIntegerField(validators=[MinValueValidator(1)], help_text="Duration in minutes")

    def __str__(self):
        return self.name