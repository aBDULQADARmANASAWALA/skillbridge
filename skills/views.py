from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import (
    SkillCategory,
    Skill,
    UserSkill,
    SkillOffer,
    SkillRequest,
)

from .serializers import (
    SkillCategorySerializer,
    SkillSerializer,
    UserSkillSerializer,
    SkillOfferSerializer,
    SkillRequestSerializer,
)

from .permissions import IsOwnerOrAdmin


class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
    permission_classes = [IsAuthenticated]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]


class UserSkillViewSet(viewsets.ModelViewSet):
    serializer_class = UserSkillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserSkill.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permission(self):
        
        if self.action in [
            "create",
            "update",
            "partial_update",
            "destory"
        ]:
            return [
                IsAuthenticated(),
                IsOwnerOrAdmin(),
            ]
        
        return [IsAuthenticated()]


class SkillOfferViewSet(viewsets.ModelViewSet):
    queryset = SkillOffer.objects.all()
    serializer_class = SkillOfferSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in [
            "update",
            "partial_update",
            "destroy"
        ]:
            return [
                IsAuthenticated(),
                IsOwnerOrAdmin()
            ]

        return [IsAuthenticated()]


class SkillRequestViewSet(viewsets.ModelViewSet):
    queryset = SkillRequest.objects.all()
    serializer_class = SkillRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in [
            "update",
            "partial_update",
            "destroy"
        ]:
            return [
                IsAuthenticated(),
                IsOwnerOrAdmin()
            ]

        return [IsAuthenticated()]