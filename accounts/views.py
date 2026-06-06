from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from django.contrib.auth import get_user_model

from .serializers import (
    RegisterSerializer,
    UserSerializer,
)

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]