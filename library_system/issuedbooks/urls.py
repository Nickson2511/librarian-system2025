from django.urls import path
from .views import IssueBookView, IssuedBooksListView, IssuedBookDetailView

urlpatterns = [
    path('issue/', IssueBookView.as_view(), name='issue-book'),
    path('', IssuedBooksListView.as_view(), name='issued-books-list'),
    path('<int:pk>/', IssuedBookDetailView.as_view(), name='issued-book-detail'),
]
