# ocr/serializers.py
from rest_framework import serializers

class ReceiptImageSerializer(serializers.Serializer):
    image = serializers.ImageField()