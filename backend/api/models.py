from django.db import models
from django.core.validators import MinValueValidator
import random

# Create your models here.
# django gives primary key autoatically

# add item_id, category, tags fields
# item class
class Item(models.Model):
    item_name = models.CharField(max_length=30)
    date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=150, blank=True, null=True) #not required
    quantity = models.IntegerField(validators=[MinValueValidator(1)], default=1)
    necessary = models.BooleanField(default=False)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True) #foreign key to category - not required
    tags = models.ManyToManyField('Tag', blank=True) #many to many relationship with tags (item can have many tags) - not required

    def __str__(self):
        return self.item_name


# there will be categories of 'groceries', 'entertainment', 'utilities', 'subscriptions', that are predefined
# user can create more categories
# category class -> each item can have at most one category
class Category(models.Model):
    category_name = models.CharField(max_length=20, unique=True) # unique
    color = models.CharField(max_length=7, default='random_color') # the color this category, if not given, will be randomly generated (IN HEX)

    def save(self, *args, **kwargs):
        if not self.color or self.color == 'random_color':
            self.color = self.generate_random_color()
        super().save(*args, **kwargs)

    def generate_random_color(self):
        return '#' + ''.join(random.choices('0123456789ABCDEF', k=6))

    def __str__(self):
        return self.category_name


# users can create new tags for themselves
# tags can basically be used to create lists of items
# in which each item can have multiple tag
# tag class -> each item can have as many tags as possible
class Tag(models.Model):
    tag_name = models.CharField(max_length=50, unique=True)

    def __str__(self): return self.tag_name
