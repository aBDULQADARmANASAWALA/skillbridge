from django.contrib.auth import get_user_model
from django.db.models import Avg

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from skills.models import (
    Skill,
    SkillOffer,
    SkillRequest,
    UserSkill
)

from reviews.models import Review

from django.core.cache import cache

User = get_user_model()


class DashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        cache_key = f"dashboard_{request.user.id}"

        cached_data = cache.get(cache_key)

        if cached_data:
            # print("Cache hit")
            return Response(cached_data)

        if request.user.role == "admin":

            data = {
                "total_users": User.objects.count(),
                "total_skills": Skill.objects.count(),
                "total_offers": SkillOffer.objects.count(),
                "total_requests": SkillRequest.objects.count(),
                "average_rating":
                    Review.objects.aggregate(
                        Avg("rating")
                    )["rating__avg"] or 0
            }

        else:

            data = {
                "my_skills": UserSkill.objects.filter(
                    user=request.user
                ).count(),

                "my_offers": UserSkill.objects.filter(
                    user=request.user
                ).count(),

                "my_requests": UserSkill.objects.filter(
                    user=request.user
                ).count(),

                "my_average_ratings": Review.objects.filter(
                    reviewed_user=request.user
                ).aggregate(
                    Avg("rating")
                )["rating__avg"] or 0
            }

        cache.set(
            cache_key,
            data,
            timeout=300
        )

        # print("Cache miss") 
        return Response(data)