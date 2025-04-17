from django.urls import path
from .views import (
    RegisterView, LoginView, AdminDetailView, 
    AdminListView, AdminUpdateView, AdminDeleteView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin/<int:pk>/', AdminDetailView.as_view(), name='admin-detail'),
    path('admin/<int:pk>/update/', AdminUpdateView.as_view(), name='admin-update'),
    path('admin/<int:pk>/delete/', AdminDeleteView.as_view(), name='admin-delete'),
    path('admins/', AdminListView.as_view(), name='admin-list'),
]







