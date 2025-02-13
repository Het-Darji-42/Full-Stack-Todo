import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

// import axios from 'axios'
// import { useForm } from "react-hook-form"
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors , },
  // } = useForm()


  

const AllTodos = () => {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])  
  
    const fetchTodos= async ()=>{
    try {
        const response = await axios.get('http://localhost:3000/api/todo/allTodo')
        toast.success(response.data.message)
        setTodos(response.data.todo)
        console.log(response);
        
      }
    catch (error) {
      toast.error(error.response?.data?.message)
    }}

  const deleteTodo =async (id)=>{
    try {
      console.log(id)
      const response = await axios.post(`http://localhost:3000/api/todo/deletTodo/${id}`)
      toast.success(response.data.message)

      //frontend

      setTodos(todos.filter((chacha) => chacha._id !== chacha.id ))
      fetchTodos()
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const isCompleted = async(id ,isCompleted)=>{
    
    try {
      const response = await axios.put(`http://localhost:3000/api/todo/isCompleted/${id}` , {isCompleted: !isCompleted})
      toast.success(response.data.message)
      //hange at frontend 
      setTodos(todos.map(chacha => chacha._id === id ? {...chacha , isCompleted : !isCompleted } : chacha )) 
      fetchTodos()
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
    
  }
  
  return (
   
    <>
      {todos.map((e)=>{
         return <div key={e._id} className='todosBody '>
         <div className='bg-gray-600  p-2'>
           <div className='bg-gray-700 py-4 flex items-center justify-between px-10 gap-4'>
            <div>
               <input type="checkbox" checked={e.isCompleted} onChange={()=> isCompleted(e._id , e.isCompleted)} className='h-[20px] w-[20px]'/>
             </div>
             <div>
               <h1 className={`font-bold text-yellow-400 text-2xl`}>{e.task}</h1>
               <p className={`w-[700px] text-white font-semibold`}>{e.description}</p>
             </div>
             <div className='flex gap-5'>
               <button className='bg-yellow-400 px-4 py-2 rounded font-semibold'>Edit</button>
               <button className='bg-red-400 px-4 py-2 rounded font-semibold' onClick={()=> deleteTodo(e._id)}>Delete</button>
             </div>
           </div>
         </div>
       </div>
      })}
    </> 
  
  )}
export default AllTodos
