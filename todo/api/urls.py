from django.urls import path 
from . import views   

urlpatterns = [
    path('todo-list/', views.TodoListView.as_view(), name='todo-list'),
    path('todo/create/', views.TodoListCreateView.as_view(), name='create-todo'),
    path('todo/<int:pk>/update/', views.TodoUpdateView.as_view(), name='todo-update'),
    path('todo/<int:pk>/delete/', views.TodoItemDeleteView.as_view(), name='todo-delete'),

]
