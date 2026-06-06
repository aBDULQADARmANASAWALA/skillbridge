from django.conf import settings
from django.db import models


class SkillCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey(
        SkillCategory,
        on_delete=models.CASCADE,
        related_name="skills"
    )

    def __str__(self):
        return self.name


class UserSkill(models.Model):
    LEVELS = (
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("advanced", "Advanced"),
        ("expert", "Expert"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE
    )

    proficiency_level = models.CharField(
        max_length=20,
        choices=LEVELS
    )

    class Meta:
        unique_together = ("user", "skill")

    def __str__(self):
        return f"{self.user} - {self.skill}"
    

class SkillOffer(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=255)
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class SkillRequest(models.Model):
    STATUS_CHOICES = (
        ("open", "Open"),
        ("accepted", "Accepted"),
        ("completed", "Completed"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE
    )

    description = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="open"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.skill}"