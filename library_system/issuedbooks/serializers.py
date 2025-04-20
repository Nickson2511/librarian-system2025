from rest_framework import serializers
from .models import IssuedBook
from students.models import Student
from books.models import Book


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'full_name', 'gender', 'admission_number',
                  'primary_school_name', 'grade', 'stream']


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'book_name', 'author_name', 'quantity']


class IssuedBookSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    book = BookSerializer(read_only=True)

    admission_number = serializers.CharField(write_only=True, required=False)
    book_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = IssuedBook
        fields = ['id', 'student', 'book', 'issue_date',
                  'due_date', 'returned', 'admission_number', 'book_id']
        read_only_fields = ['student', 'book']

    def create(self, validated_data):
        admission_number = validated_data.pop('admission_number', None)
        book_id = validated_data.pop('book_id', None)

        # Look up student
        try:
            student = Student.objects.get(admission_number=admission_number)
        except Student.DoesNotExist:
            raise serializers.ValidationError(
                {"admission_number": "Student not found."})

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

        issued_book = IssuedBook.objects.create(
            student=student,
            book=book,
            **validated_data
        )

        return issued_book

class ReturnBookSerializer(serializers.Serializer):
    admission_number = serializers.CharField()
    book_id = serializers.IntegerField()

    def validate(self, data):
        admission_number = data.get('admission_number')
        book_id = data.get('book_id')

        try:
            student = Student.objects.get(admission_number=admission_number)
        except Student.DoesNotExist:
            raise serializers.ValidationError({"admission_number": "Student not found."})

        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            raise serializers.ValidationError({"book_id": "Book not found."})

        try:
            issued_book = IssuedBook.objects.get(
                student=student,
                book=book,
                returned=False
            )
        except IssuedBook.DoesNotExist:
            raise serializers.ValidationError({
                "detail": "This book has not been issued to this student or has already been returned."
            })

        # Attach for use in view
        data['student'] = student
        data['book'] = book
        data['issued_book'] = issued_book

        return data

