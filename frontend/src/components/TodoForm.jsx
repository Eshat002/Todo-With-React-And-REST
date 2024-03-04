import React, { useState } from 'react'
import './TodoForm.css'

const TodoForm = ({ addNewTodo }) => {
    const [newTodo, setNewTodo] = useState('')

    const handleAddTodo = (e) => {
        e.preventDefault()
        addNewTodo(newTodo)
        setNewTodo("")
    }

    return (
        <div className='todo-form-container'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <form className='input-group' action="">
                            <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} placeholder='Add Todo' className='form-control' type="text" />
                            <button onClick={handleAddTodo} className='btn btn-primary add-btn'>Add</button>
                        </form>
                    </div>
                    <div className="col-lg-3"></div>
                </div>

            </div>

        </div>
    )
}

export default TodoForm