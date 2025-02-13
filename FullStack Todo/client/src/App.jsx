import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllTodos from './Components/AllTodos'
import CreateTodo from './Components/CreateTodo'
import {ToastContainer} from 'react-toastify'
import { TodoProvider } from './Components/Context/TodoContext'

function App() {


  return (
    <TodoProvider>
    <ToastContainer/>
      <CreateTodo/>
      <AllTodos/>
    </TodoProvider>
  )
}

export default App
