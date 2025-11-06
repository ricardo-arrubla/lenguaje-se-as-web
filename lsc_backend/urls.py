# lsc_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import ( 
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Rutas de Autenticación JWT
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # LOGIN
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # REFRESH
    
    # Rutas de la API de Contenido y Registro
    path('api/', include('gestures.urls')),
]