from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer

class BookCreateView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            book = serializer.save()
            return Response({
                "success": True,
                "message": "Book created successfully",
                "data": BookSerializer(book).data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "message": "Failed to create book",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response({
            "success": True,
            "message": "Books retrieved successfully",
            "data": serializer.data
        })


class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        try:
            book = self.get_object()
            serializer = self.get_serializer(book)
            return Response({
                "success": True,
                "message": "Book retrieved successfully",
                "data": serializer.data
            })
        except Book.DoesNotExist:
            return Response({
                "success": False,
                "message": "Book not found"
            }, status=status.HTTP_404_NOT_FOUND)


class BookUpdateView(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            if serializer.is_valid():
                book = serializer.save()
                return Response({
                    "success": True,
                    "message": "Book updated successfully",
                    "data": BookSerializer(book).data
                })
            return Response({
                "success": False,
                "message": "Failed to update book",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return Response({
                "success": False,
                "message": "Book not found"
            }, status=status.HTTP_404_NOT_FOUND)


class BookDeleteView(generics.DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        try:
            book = self.get_object()
            book.delete()
            return Response({
                "success": True,
                "message": "Book deleted successfully"
            }, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({
                "success": False,
                "message": "Book not found"
            }, status=status.HTTP_404_NOT_FOUND)
