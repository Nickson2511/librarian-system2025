from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/students/', include('students.urls')),
    path('api/books/', include('books.urls')),
    path('api/issued/', include('issuedbooks.urls')),
]
