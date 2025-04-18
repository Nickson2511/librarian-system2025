from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def validate_admission_number(self, value):
        if self.instance is None and Student.objects.filter(admission_number=value).exists():
            raise serializers.ValidationError("Admission number must be unique.")
        return value
