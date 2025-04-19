from django.db import models
from django.utils import timezone
from datetime import timedelta
from students.models import Student
from books.models import Book

def default_due_date():
    return timezone.now().date() + timedelta(days=14)

class IssuedBook(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='issued_books')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='issued_to_students')
    issue_date = models.DateField(auto_now_add=True)
    due_date = models.DateField(default=default_due_date)
    returned = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.book.book_name} issued to {self.student.full_name}'






