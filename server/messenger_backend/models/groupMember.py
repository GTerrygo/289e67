from django.db import models

from . import utils
from .group import Group
from .user import User

class GroupMember(utils.CustomModel):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        db_column="userId"
    )
    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        db_column="groupId"
    )
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)