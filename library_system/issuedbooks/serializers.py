from rest_framework import serializers
from .models import IssuedBook
from students.models import Student
from books.models import Book

class IssuedBookSerializer(serializers.ModelSerializer):
    admission_number = serializers.CharField(write_only=True, required=False)
    book_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = IssuedBook
        fields = ['id', 'student', 'book', 'issue_date', 'due_date', 'returned', 'admission_number', 'book_id']
        read_only_fields = ['student', 'book']

    def create(self, validated_data):
        admission_number = validated_data.pop('admission_number', None)
        book_id = validated_data.pop('book_id', None)

        # Look up student
        try:
            student = Student.objects.get(admission_number=admission_number)
        except Student.DoesNotExist:
            raise serializers.ValidationError({"admission_number": "Student not found."})

        # Look up book
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            raise serializers.ValidationError({"book_id": "Book not found."})

        # Check if the book is already issued and not returned
        if IssuedBook.objects.filter(book=book, returned=False).exists():
            raise serializers.ValidationError({
                "book_id": f"The book '{book.book_name}' is already issued to another student and not yet returned."
            })

        # Create issued book
        issued_book = IssuedBook.objects.create(
            student=student,
            book=book,
            **validated_data
        )

        return issued_book













