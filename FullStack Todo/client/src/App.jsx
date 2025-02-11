import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllTodos from './Components/AllTodos'
import CreateTodo from './Components/CreateTodo'

function App() {


  return (
    <>
    
      <AllTodos/>
      <CreateTodo/>
    </>
  )
}

export default App
