# gestures/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path 
from .views import LessonViewSet, PredictionViewSet, RegisterView # <-- Importar RegisterView

router = DefaultRouter()
router.register(r'lessons', LessonViewSet)
router.register(r'predictions', PredictionViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'), # <-- RUTA DE REGISTRO
] + router.urls