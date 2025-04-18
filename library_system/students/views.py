from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer


class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            student = serializer.save()
            return Response({
                "success": True,
                "message": "Student created successfully",
                "data": StudentSerializer(student).data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "message": "Failed to create student",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class StudentListView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "success": True,
            "message": "Students retrieved successfully",
            "data": serializer.data
        })


class StudentDetailView(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        try:
            student = self.get_object()
            serializer = self.get_serializer(student)
            return Response({
                "success": True,
                "message": "Student retrieved successfully",
                "data": serializer.data
            })
        except Student.DoesNotExist:
            return Response({
                "success": False,
                "message": "Student not found"
            }, status=status.HTTP_404_NOT_FOUND)


class StudentUpdateView(generics.UpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            if serializer.is_valid():
                student = serializer.save()
                return Response({
                    "success": True,
                    "message": "Student updated successfully",
                    "data": StudentSerializer(student).data
                })
            return Response({
                "success": False,
                "message": "Failed to update student",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response({
                "success": False,
                "message": "Student not found"
            }, status=status.HTTP_404_NOT_FOUND)


class StudentDeleteView(generics.DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        try:
            student = self.get_object()
            student.delete()
            return Response({
                "success": True,
                "message": "Student deleted successfully"
            }, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({
                "success": False,
                "message": "Student not found"
            }, status=status.HTTP_404_NOT_FOUND)










