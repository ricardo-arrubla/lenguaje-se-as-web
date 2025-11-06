# gestures/models.py
from django.db import models
from django.contrib.auth.models import User # Usamos el modelo de usuario de Django

class Lesson(models.Model):
    """Define una lección disponible en la plataforma."""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Prediction(models.Model):
    """
    Registra el intento de predicción de una seña por parte de un usuario.
    """
    # Relaciones
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(
        Lesson, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )

    # Datos de la predicción
    sign_attempted = models.CharField(max_length=50)
    prediction_class = models.CharField(max_length=50)
    probability = models.FloatField()
    
    # Lógica de negocio
    is_correct = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Sobreescribimos el método save para calcular is_correct automáticamente
        self.is_correct = (self.sign_attempted.upper() == self.prediction_class.upper())
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.sign_attempted} -> {self.prediction_class} ({self.probability:.2f})"