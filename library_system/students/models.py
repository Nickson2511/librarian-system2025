from django.db import models

class Student(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ]

    GRADE_CHOICES = [
        ('1st grade', '1st grade'),
        ('2nd grade', '2nd grade'),
        ('3rd grade', '3rd grade'),
        ('4th grade', '4th grade'),
        ('5th grade', '5th grade'),
        ('6th grade', '6th grade'),
        ('7th grade', '7th grade'),
        ('8th grade', '8th grade')
    ]

    STREAM_CHOICES = [
        ('red', 'Red'),
        ('blue', 'Blue'),
        ('green', 'Green'),
        ('white', 'White')
    ]

    admission_number = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    primary_school_name = models.CharField(max_length=100)
    grade = models.CharField(max_length=20, choices=GRADE_CHOICES)
    stream = models.CharField(max_length=20, choices=STREAM_CHOICES)

    def __str__(self):
        return f"{self.full_name} ({self.admission_number})"
