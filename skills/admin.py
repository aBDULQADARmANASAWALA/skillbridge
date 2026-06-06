from django.contrib import admin
from .models import *

admin.site.register(SkillCategory)
admin.site.register(Skill)
admin.site.register(UserSkill)
admin.site.register(SkillOffer)
admin.site.register(SkillRequest)