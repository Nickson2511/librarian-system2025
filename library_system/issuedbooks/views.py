from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import IssuedBook
from .serializers import IssuedBookSerializer
from rest_framework.permissions import IsAuthenticated

class IssueBookView(generics.CreateAPIView):
    queryset = IssuedBook.objects.all()
    serializer_class = IssuedBookSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(
                {
                    "message": "Book issued successfully.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {
                    "error": "Book could not be issued.",
                    "details": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

class IssuedBooksListView(generics.ListAPIView):
    queryset = IssuedBook.objects.all()
    serializer_class = IssuedBookSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(
            {
                "message": "List of issued books retrieved successfully.",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

class IssuedBookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = IssuedBook.objects.all()
    serializer_class = IssuedBookSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(
            {
                "message": "Issued book details retrieved successfully.",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        try:
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(
                {
                    "message": "Issued book updated successfully.",
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {
                    "error": "Failed to update issued book.",
                    "details": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {
                "message": "Issued book deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )












