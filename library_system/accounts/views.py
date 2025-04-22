# accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import AdminUser
from .serializers import RegisterSerializer, LoginSerializer, ForgotPasswordSerializer, VerifyOTPSerializer, ResetPasswordSerializer
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Admin registered successfully", "token": token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                email=serializer.validated_data['email'], password=serializer.validated_data['password'])
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"message": "Login successful", "token": token.key}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminDetailView(RetrieveAPIView):
    queryset = AdminUser.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        admin = get_object_or_404(AdminUser, pk=pk)
        return Response({
            "id": admin.id,
            "first_name": admin.first_name,
            "last_name": admin.last_name,
            "email": admin.email,
            "role": admin.role
        })


class AdminListView(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        admins = AdminUser.objects.all()
        data = [{
            "id": admin.id,
            "first_name": admin.first_name,
            "last_name": admin.last_name,
            "email": admin.email,
            "role": admin.role
        } for admin in admins]
        return Response(data)


class AdminUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        admin = get_object_or_404(AdminUser, pk=pk)

        for field in ['first_name', 'last_name', 'email', 'role']:
            if field in request.data:
                setattr(admin, field, request.data[field])

        admin.save()
        return Response({"message": "Admin updated successfully"})


class AdminDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        admin = get_object_or_404(AdminUser, pk=pk)

        admin.delete()
        return Response({"message": "Admin deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "OTP sent to email"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "OTP verified"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
