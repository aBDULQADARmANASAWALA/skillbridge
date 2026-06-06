from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = "__all__"
        read_only_fields = ["reviewer"]

    def validate(self, attrs):

        request = self.context["request"]
        
        if attrs["reviewed_user"] == request.user:
            raise serializers.ValidationError("You cannot review yourself.")

        if not (1 <= attrs["rating"] <= 5):
            raise serializers.ValidationError("Rating must be between 1 and 5.")

        if Review.objects.filter(
            reviewer=request.user,
            reviewed_user=attrs["reviewed_user"]
        ).exists():
            raise serializers.ValidationError("You have already reviewed this user.")

        return attrs