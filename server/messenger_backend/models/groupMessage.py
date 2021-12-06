from django.db import models

from . import utils
from .group import Group

class GroupMessage(utils.CustomModel):
    text = models.TextField(null=False)
    senderId = models.IntegerField(null=False)
    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        db_column="groupId",
        related_name="messages",
    )
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)