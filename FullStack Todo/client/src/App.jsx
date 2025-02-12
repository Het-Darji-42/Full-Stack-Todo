import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllTodos from './Components/AllTodos'
import CreateTodo from './Components/CreateTodo'
import {ToastContainer} from 'react-toastify'

function App() {


  return (
    <>
    <ToastContainer/>
      <AllTodos/>
      <CreateTodo/>
    </>
  )
}

export default App
