# gestures/serializers.py
from rest_framework import serializers
from .models import Lesson, Prediction
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        # Asegúrate de incluir 'email' y 'password'
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        
    def create(self, validated_data):
        # Sobreescribimos el método create para encriptar la contraseña de forma segura
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class PredictionSerializer(serializers.ModelSerializer):
    # Usaremos esta clase para recibir y guardar los datos de la IA del frontend
    class Meta:
        model = Prediction
        # Solo necesitamos estos campos para el registro inicial
        fields = ('id', 'user', 'lesson', 'sign_attempted', 'prediction_class', 'probability', 'is_correct', 'timestamp')
        read_only_fields = ('is_correct', 'timestamp') # Django los calcula automáticamente