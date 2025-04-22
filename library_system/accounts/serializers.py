from rest_framework import serializers
from .models import PasswordResetOTP, AdminUser
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ['first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        if AdminUser.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists.")
        return value

    def validate_password(self, value):
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def validate_first_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError(
                "First name must contain only letters.")
        return value

    def validate_last_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError(
                "Last name must contain only letters.")
        return value

    def create(self, validated_data):
        return AdminUser.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            raise serializers.ValidationError(
                "Email and password are required.")

        if not AdminUser.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                "Admin with this email does not exist.")

        return data


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not AdminUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user with this email")
        return value

    def save(self):
        email = self.validated_data['email']
        user = AdminUser.objects.get(email=email)
        otp = get_random_string(length=6, allowed_chars='1234567890')
        PasswordResetOTP.objects.create(user=user, otp_code=otp)
        send_mail(
            'Your Password Reset Code',
            f'Your OTP code is: {otp}',
            'noreply@yourdomain.com',
            [email],
            fail_silently=False
        )


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp_code = serializers.CharField(max_length=6)

    def validate(self, data):
        try:
            user = AdminUser.objects.get(email=data['email'])
            otp_obj = PasswordResetOTP.objects.filter(
                user=user, otp_code=data['otp_code'], is_used=False
            ).last()

            if not otp_obj or not otp_obj.is_valid():
                raise serializers.ValidationError("Invalid or expired OTP")

            otp_obj.is_used = True
            otp_obj.save()

            return data

        except AdminUser.DoesNotExist:
            raise serializers.ValidationError("Email not found")


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")

        try:
            AdminUser.objects.get(email=data['email'])
        except AdminUser.DoesNotExist:
            raise serializers.ValidationError("Email not found")

        try:
            validate_password(data['new_password'])
        except DjangoValidationError as e:
            raise serializers.ValidationError({"new_password": e.messages})

        return data

    def save(self):
        user = AdminUser.objects.get(email=self.validated_data['email'])
        user.set_password(self.validated_data['new_password'])
        user.save()
