from rest_framework import serializers

from .models import (
    SkillCategory,
    Skill,
    UserSkill,
    SkillOffer,
    SkillRequest,
)


class SkillCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillCategory
        fields = "__all__"

    def validate_name(self, value):

        if SkillCategory.objects.filter(
            name__iexact=value
        ).exists():

            raise serializers.ValidationError(
                "Category already exists."
            )

        return value


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class UserSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkill
        fields = "__all__"
        read_only_fields = ["user"]


class SkillOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillOffer
        fields = "__all__"
        read_only_fields = ["user"]

    def validate(self, attrs):

        request = self.context["request"]

        has_skill = UserSkill.objects.filter(
            user=request.user,
            skill = attrs["skill"]
        ).exists()

        if not has_skill:
            raise serializers.ValidationError("You can only offer skills you possess.")

        return attrs 


class SkillRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillRequest
        fields = "__all__"
        read_only_fields = ["user"]