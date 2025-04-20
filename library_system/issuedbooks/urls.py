from django.urls import path
from .views import IssueBookView, IssuedBooksListView, IssuedBookDetailView, ReturnBookView, ReturnedBooksListView, ReturnedBookDetailView

urlpatterns = [
    path('issue/', IssueBookView.as_view(), name='issue-book'),
    path('', IssuedBooksListView.as_view(), name='issued-books-list'),
    path('<int:pk>/', IssuedBookDetailView.as_view(), name='issued-book-detail'),
    path('return/', ReturnBookView.as_view(), name='return-book'),
    path('returned/', ReturnedBooksListView.as_view(), name='returned-books-list'),
    path('returned/<int:pk>/', ReturnedBookDetailView.as_view(), name='returned-book-detail'),
     
]
