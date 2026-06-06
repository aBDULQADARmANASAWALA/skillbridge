from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Review
from .serializers import ReviewSerializer
from .permissions import IsReviewOwnerOrAdmin


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            reviewer=self.request.user
        )

    def get_permission(self):

        if self.action in [
            "update",
            "partial_update",
            "destroy"
        ]:
            return [
                IsAuthenticated(),
                IsReviewOwnerOrAdmin()
            ]

        return [IsAuthenticated()]