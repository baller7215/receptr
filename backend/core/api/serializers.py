from rest_framework import serializers
from .models import Item

# allows data like query sets and model instances to be converted to native python datatypes
# that can be rendered into json, xml, or other content types
class ItemSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    # item_name = serializers.CharField(max_length=30)
    # date = serializers.DateField()
    # price = serializers.DecimalField(max_digits=10, decimal_places=2)
    # description = serializers.TextField(max_length=150, required=False, allow_blank=True)
    # quantity = serializers.IntegerField(min_value=1, default=1)
    # necessary = serializers.BooleanField(default=False)

    # def create(self, validated_data):
    #     '''
    #     create and return a new 'item' instance, given the validated data
    #     '''
    #     return Item.objects.create(**validated_data)
    
    # def update(self, instance, validated_data):
    #     '''
    #     update and return an existing 'item' instance, given the validated data
    #     '''
    #     instance.item_name = validated_data.get('item_name', instance.item_name)
    #     instance.date = validated_data.get('date', instance.date)
    #     instance.price = validated_data.get('price', instance.price)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.quantity = validated_data.get('quantity', instance.quantity)
    #     instance.necessary = validated_data.get('necessary', instance.necessary)
    #     instance.save()
    #     return instance
    price = serializers.DecimalField(max_digits=10, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = Item
        fields = '__all__'