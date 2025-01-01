from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.
# django gives primary key autoatically

# add item_id, category, tags fields
class Item(models.Model):
    item_name = models.CharField(max_length=30)
    date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # item_id = models.CharField(max_length=255)
    description = models.TextField(max_length=150)
    quantity = models.IntegerField(validators=[MinValueValidator(1)], default=1)
    necessary = models.BooleanField(default=False)
    # item_id = models.CharField(max_length=255, unique=True)
    # category = models.CharField(max_length=100)

    def __str__(self):
        return self.item_name