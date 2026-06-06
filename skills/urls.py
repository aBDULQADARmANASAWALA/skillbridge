from rest_framework.routers import DefaultRouter

from .views import (
    SkillCategoryViewSet,
    SkillViewSet,
    UserSkillViewSet,
    SkillOfferViewSet,
    SkillRequestViewSet,
)

router = DefaultRouter()

router.register(
    "categories",
    SkillCategoryViewSet
)

router.register(
    "skills",
    SkillViewSet
)

router.register(
    "user-skills",
    UserSkillViewSet,
    basename="user-skills"
)

router.register(
    "offers",
    SkillOfferViewSet,
    basename="offers"
)

router.register(
    "requests",
    SkillRequestViewSet,
    basename="requests"
)

urlpatterns = router.urls