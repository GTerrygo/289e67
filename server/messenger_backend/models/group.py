from django.db import models
from django.db.models import Q

from . import utils
from .user import User


class Group(utils.CustomModel):
    name = models.TextField(null=False)
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, db_column="userId", related_name="group"
    )
    memberCount = models.BigIntegerField()
    users = models.ManyToManyField('User',through='GroupMember', related_name='groups')
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)