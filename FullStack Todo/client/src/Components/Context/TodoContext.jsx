import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

// Create context
const TodoContext = createContext()

// Define the provider
export const TodoProvider = ({children}) => {
    const [todos, setTodos] = useState([])

    // Fetch todos
    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/todo/allTodo')
            toast.success(response.data.message)
            setTodos(response.data.todo)
            console.log(response)
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    // Provide todos, setTodos, and fetchTodos to consumers
    return (
        <TodoContext.Provider value={{ todos, setTodos, fetchTodos }}>
            {children}
        </TodoContext.Provider>
    )
}

// Custom hook to use the context
export const useTodo = () => {
    return useContext(TodoContext)
}
