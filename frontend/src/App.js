import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import TodoForm from './components/TodoForm';



function App() {

  const [todos, setTodos] = useState([])
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);




  const fetchTodos = (url = 'http://127.0.0.1:8000/api/todo-list/') => {


    axios.get(url)
      .then(response => {
        if (initialLoad) {
          // If it's the initial load, set todos directly
          setTodos(response.data.results);
          setInitialLoad(false); // Update initialLoad state
        } else {
          // If it's not the initial load, append todos to existing list
          setTodos(prevTodos => [...prevTodos, ...response.data.results]);
        }
        setNextPageUrl(response.data.next);
        console.log("tie", response)
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };




  const handleLoadMore = () => {

    fetchTodos(nextPageUrl);
  };




  // Example usage of handleLoadMore with different limit and offset
  // You can call this function with desired limit and offset values
  // handleLoadMore(4, 8);



  const handleAddNewTodo = (newTodo) => {
    let offsetParam = null;
    if (nextPageUrl) {
      const urlParams = new URLSearchParams(nextPageUrl);
      const offset = urlParams.get('offset');
      if (offset) {
        offsetParam = `&offset=${parseInt(offset)}`;
      }
    }

    axios.post(`http://127.0.0.1:8000/api/todo/create/?offset=${offsetParam}`, { title: newTodo })
      .then((response) => {
        console.log("ress", response.data);
        // setNextPageUrl(response.data.next_url);
        if (response.data.message === "title can not be empty") {
          console.log("do nothing")
        }
        else {
          setNextPageUrl(response.data.next_url);
          setTodos(prevResponse => [response.data.todo, ...prevResponse]);
        }


      })
      .catch(error => console.log(error));
  }



  // const handleAddNewTodo = (newTodo) => {

  //   const urlParams = new URLSearchParams(nextPageUrl)
  //   const offset = parseInt(urlParams.get('offset'));
  //   console.log("off", offset)



  //   axios.post(`http://127.0.0.1:8000/api/todo/create/?offset=${offset}`, { title: newTodo })
  //     .then((response) => {
  //       console.log("ress", response.data.next_url)
  //       setNextPageUrl(response.data.next_url)
  //       setTodos(prevResponse => [response.data.todo, ...prevResponse])
  //     })
  //     .catch(error => console.log(error))
  // }



  const handleUpdateTodo = (editedTitle, editedId) => {
    axios.patch(`http://127.0.0.1:8000/api/todo/${editedId}/update/`, { "title": editedTitle })
      .then((response) => {
        const updatedTodo = response.data
        console.log("great", updatedTodo)
        setTodos(prevTodos => prevTodos.map(prevTodo => prevTodo.id === updatedTodo.id ? updatedTodo : prevTodo)
        )

      }).catch(error => console.log(error))

    console.log("edited_title", editedTitle, "edited_id", editedId)
  }


  const handleUpdateStatus = (todoId, completedStatus) => {
    console.log("xavier", completedStatus)
    axios.patch(`http://127.0.0.1:8000/api/todo/${todoId}/update/`, { "completed": completedStatus })
      .then(response => {
        const updatedTodo = response.data
        console.log("og_data", updatedTodo)
        setTodos(prevTodos => prevTodos.map(prevTodo => prevTodo.id === updatedTodo.id ? updatedTodo : prevTodo)
        )

      })
      .catch(error => console.log(error))
  }


  const handleDeleteTodo = (todo) => {
    let offsetParam = null;
    if (nextPageUrl) {
      const urlParams = new URLSearchParams(nextPageUrl);
      const offset = urlParams.get('offset');
      if (offset) {
        offsetParam = `&offset=${parseInt(offset)}`;
      }
    }

    // const urlParams = new URLSearchParams(nextPageUrl);
    // const offset = parseInt(urlParams.get('offset'));
    // console.log("off", offset)


    axios.delete(`http://127.0.0.1:8000/api/todo/${todo.id}/delete/?offset=${offsetParam}`)
      .then(response => {
        setTodos(prevTodos => prevTodos.filter(prevTodo => prevTodo.id !== todo.id))
        console.log("next", response.data.next_url)
        setNextPageUrl(response.data.next_url)
      }
      )
      // .then(
      //   getTodoList()
      // )
      .catch(error => console.log(error))

  }




  return (
    <>
      <Navbar />
      <TodoForm addNewTodo={handleAddNewTodo} />
      <TodoList deleteTodo={handleDeleteTodo} todos={todos} updateTodo={handleUpdateTodo} handleUpdateStatus={handleUpdateStatus} />
      <div className='text-center mb-5'> {nextPageUrl && <button style={{ "background": "#712cf9" }} className='btn btn-primary border-0 px-3' onClick={handleLoadMore}>Load More</button>}
      </div>


    </>

  )
}

export default App;
