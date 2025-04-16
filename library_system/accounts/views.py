from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import AdminUser
from rest_framework.authentication import TokenAuthentication
from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        # Check if any admin exists in the DB
        total_admins = AdminUser.objects.count()

        # If admins already exist, require authentication
        if total_admins > 0:
            if not request.user or not request.user.is_authenticated:
                return Response(
                    {"error": "Only authenticated admins can create new admins."},
                    status=status.HTTP_403_FORBIDDEN
                )

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Admin registered successfully.",
                "token": token.key
            }, status=201)
        return Response(serializer.errors, status=400)



class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"message": "Login successful!", "token": token.key})
            return Response({"error": "Invalid credentials"}, status=401)
        return Response(serializer.errors, status=400)
