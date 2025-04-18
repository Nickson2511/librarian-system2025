from django.db import models

class Book(models.Model):
    book_name = models.CharField(max_length=100)
    author_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.book_name} by {self.author_name}"
