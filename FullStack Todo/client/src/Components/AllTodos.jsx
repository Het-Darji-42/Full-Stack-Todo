import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { useForm } from "react-hook-form"




const AllTodos = () => {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    reset, 
    formState: { errors  },
  } = useForm()
  
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
  

  const [editId, setEditId] = useState('')

  const editTodo=async (id , task ,description )=>{
    
    
    setEditId(id)
    setValue('task' , task)
    setValue('description' , description)
  }


  const updateTodo = async (d) =>{

    try {
      // console.log(d);
      
      const response = await axios.put(`http://localhost:3000/api/todo/updateTodo/${editId}`,{task : d.task, description : d.description}) 
      toast.success(response.data.message)
      setTodos(todos.map(chacha => chacha._id === editId ? {...chacha , task : d.task , description : d.description  } : chacha  ))
      setEditId(null)
      reset() 
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

            {editId === e._id 
            ? 
              <form onSubmit={handleSubmit(updateTodo)}>
                <input
                {...register('task' , {required : 'this field is required ', minLength:{value : 3 , message : 'min 3 character required'} ,maxLength:{value : 25 , message : "maximum 25 character is required"} })}
                type="text"
                className={ `${errors.task ? "border-red-600": "border-black" } border-2  p-2 rounded text-white font-semibold `}
                   placeholder='ENTER TASK '
                     />
                {errors.task && <p className='text-sm text-red-500'>{errors.task.message}</p>}
                <input
                {...register('description' , {required : 'this field is required ', minLength:{value : 3 , message : 'min 3 character required'} ,maxLength:{value : 120 , message : "maximum 120 character is required"} })}
                type="text"
                className={ `${errors.task ? "border-red-600": "border-black" } border-2  p-2 rounded text-white font-semibold `}
                   placeholder='ENTER DESCRIPTION '
                     />
                {errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
                <button className='bg-green-400 px-4 py-2 rounded font-semibold'>save</button>
              </form>
              :
             <div>

               <h1 className={`font-bold text-yellow-400 text-2xl ${e.isCompleted ?"line-through" :"" }`}>{e.task}</h1>
               <p className={`w-[700px] text-white font-semibold ${e.isCompleted ?"line-through" :"" }` }>{e.description}</p>
             </div>

            }



             <div className='flex gap-5'>
              
              
              
              
              <button className='bg-yellow-400 px-4 py-2 rounded font-semibold' onClick={()=>editTodo(e._id , e.task , e.description)}>Edit</button>
            
            <button className='bg-red-400 px-4 py-2 rounded font-semibold' onClick={()=> deleteTodo(e._id)}>Delete</button>
             </div>
           </div>
         </div>
       </div>
      })}
    </> 
  
  )}
export default AllTodos
