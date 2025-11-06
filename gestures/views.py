# gestures/views.py
from rest_framework import viewsets, generics
from .models import Lesson, Prediction
from .serializers import LessonSerializer, PredictionSerializer, UserSerializer
from rest_framework.permissions import AllowAny # Para pruebas. Luego se usará IsAuthenticated
from django.contrib.auth.models import User

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all().filter(is_available=True)
    serializer_class = LessonSerializer
    # Permitimos acceso a las lecciones a todos (incluso sin login), si es contenido público.
    permission_classes = [AllowAny] 

class PredictionViewSet(viewsets.ModelViewSet):
    queryset = Prediction.objects.all().order_by('-timestamp')
    serializer_class = PredictionSerializer
    # Aquí deberías usar IsAuthenticated para asegurar que solo usuarios logueados puedan registrar predicciones.
    # Por ahora, para pruebas de POST:
    permission_classes = [AllowAny] 

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,) # Permitimos el registro a cualquiera
    serializer_class = UserSerializer
    
    def perform_create(self, serializer):
        # Aquí puedes agregar lógica antes de guardar si es necesario
        serializer.save()