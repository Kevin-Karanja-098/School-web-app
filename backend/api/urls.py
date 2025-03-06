from django.urls import path
from .views import *

urlpatterns = [
    path('project_managers/', ProjectManagerListCreateView.as_view(), name='project_managers'),
    path('employees/', EmployeesListCreateView.as_view(), name='employees'),
    path('projects/', ProjectListCreateView.as_view(), name='projects'),
    path('projects/<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='project_detail'),
]

# urlpatterns = [
#     path('', home)
# ]