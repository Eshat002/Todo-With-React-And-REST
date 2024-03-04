import React from 'react'
import './TodoList.css'
import { useState } from 'react';


const TodoList = ({ todos, updateTodo, handleUpdateStatus, deleteTodo }) => {
    const [editTitle, setEditTitle] = useState('');
    const [editId, setEditId] = useState(null);


    const handleEdit = (todoItem, e) => {
        e.preventDefault()
        setEditId(todoItem.id);
        setEditTitle(todoItem.title);

    };

    const handleUpdate = (e) => {
        e.preventDefault()
        updateTodo(editTitle, editId)
        setEditId(null)
    }

    const handleStatus = (todo) => {
        handleUpdateStatus(todo.id, !todo.completed)
    }

    const handleDelete = (todo, e) => {
        e.preventDefault()
        deleteTodo(todo)

    }

    return (
        <div className='todo-list mb-5'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 ">
                        {todos.map((todo, index) => (

                            <div key={index} className='list-item'>

                                <form className='d-flex'>
                                    {editId == todo.id ? (
                                        <>

                                            <input
                                                className='form-control'
                                                type="text"
                                                value={editTitle} // Use editTitle for editing
                                                onChange={(e) => setEditTitle(e.target.value)}
                                            />
                                            <button onClick={handleUpdate} className='btn btn-primary update-btn'>Update</button>


                                        </>
                                    )
                                        : (
                                            <>
                                                {todo.completed ?
                                                    <strike>
                                                        <a style={{ "cursor": "pointer" }} onClick={() => handleStatus(todo)} className='list-item-link'>
                                                            {todo.title}
                                                        </a></strike>

                                                    :
                                                    <a style={{ "cursor": "pointer" }} onClick={() => handleStatus(todo)} className='list-item-link'>
                                                        {todo.title}
                                                    </a>

                                                }

                                            </>
                                        )}

                                </form>

                                <a style={{ "cursor": "pointer" }} onClick={(e) => handleEdit(todo, e)} ><svg style={{ "marginLeft": "50px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#712cf9" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                </svg></a>
                                <a style={{ "cursor": "pointer" }} onClick={(e) => handleDelete(todo, e)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#712cf9" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                </svg></a>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-3"></div>
                </div>


            </div >
        </div >
    )
}

export default TodoList



