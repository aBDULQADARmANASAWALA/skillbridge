from rest_framework import serializers


class DashboardSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    total_skills = serializers.IntegerField()
    total_offers = serializers.IntegerField()
    total_requests = serializers.IntegerField()
    average_rating = serializers.FloatField()