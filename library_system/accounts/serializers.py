from rest_framework import serializers
from .models import AdminUser

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ['first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return AdminUser.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
