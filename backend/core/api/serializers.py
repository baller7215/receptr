from rest_framework import serializers
from .models import Item

# allows data like query sets and model instances to be converted to native python datatypes
# that can be rendered into json, xml, or other content types
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'