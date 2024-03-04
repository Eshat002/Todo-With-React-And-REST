from rest_framework import generics
from ..models import Todo
from .serializers import TodoSerializer
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from django.urls import reverse
import json


class TodoListView(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = LimitOffsetPagination
    # Set the desired page size
    pagination_class.default_limit = 8




# class TodoListCreateView(generics.ListCreateAPIView):
#     queryset = Todo.objects.all()
#     serializer_class = TodoSerializer



class TodoListCreateView(generics.CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
 
    def create(self, request, *args, **kwargs):
        # Extract the offset parameter from the request query parameters
        # Perform any necessary validation or error handling for the offset parameter
        # Proceed with creating the todo item
        if request.data['title'].strip() == "":
            return Response({"message":"title can not be empty"})
        
        serializer = self.get_serializer(data=request.data)
      
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        todo_data = serializer.data
        # Return the response with the newly created todo item
        headers = self.get_success_headers(serializer.data)
        offset = request.GET.get('offset')
    
        next_url= None
        if offset != "null" : 
            limit=8    
            offset =int(offset) + 1
            next_url = f"http://127.0.0.1:8000/api/todo-list/?limit={limit}&offset={offset}" 
      
 
        return Response(
            {"message": "Todo created successfully", "next_url": next_url, "todo": todo_data},
             headers=headers
        )


class TodoUpdateView(generics.UpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get(self, request, *args, **kwargs):
            todos = self.queryset.all()
            serializer = self.serializer_class(todos, many=True)
            return Response(serializer.data)
 


# class TodoItemDeleteView(generics.DestroyAPIView):
#     queryset = Todo.objects.all()
#     serializer_class = TodoSerializer
 

class TodoItemDeleteView(generics.DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)

        # Update the pagination offset
        offset =  request.GET.get('offset')
        print("d_offset", offset)
        next_url= None
        if  offset != "null":
            offset =   int(offset) - 1  # Correctly decrement the offset
            limit =  8
            next_url = f"http://127.0.0.1:8000/api/todo-list/?limit={limit}&offset={offset}"
 

        return Response({'message': 'Item deleted successfully', 'next_url': next_url})