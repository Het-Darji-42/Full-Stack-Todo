import React from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useTodo } from './Context/TodoContext';
const CreateTodo = () => {

  const {fetchTodos} = useTodo()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isLoading },
  } = useForm({
    mode : 'onSubmit', 
  })

  const todohandler =async (d)=>{

    try {
      const Response =await axios.post('http://localhost:3000/api/todo/addTodo' , {
      task : d.task ,
      description : d.description, 
    })
      toast.success(Response.data.message)
      reset()
      console.log(Response);
      fetchTodos()
      
    } catch (error) {
      if ( error.Response?.data?.message) {
        toast.error(error.Response?.data?.message);  // Corrected to use error.response
      } else {
        toast.error("An unexpected error occurred");  // Handle unexpected errors
      }
      
    }
    

  }
  return (
    <div className='sticky top-0 w-screen'>
      <form onSubmit={handleSubmit(todohandler)}>
        <div className='createTodo bg-gray-600 p-4 flex items-center justify-center gap-3 border-b-2 border-white'>
            <div>
                <input {...register("task", { required: "The task is required",
                   minLength : {value : 3 , message : 'Min Length is 3 ' },
                   maxLength : {value : 25 , message : 'Max Length is 25' }})}
                   type="text"
                   className={ `${errors.task ? "border-red-600": "border-black" } border-2  p-2 rounded text-white font-semibold `}
                   placeholder='ENTER TASK '
                   />
                
                {errors.task && <p className='text-red-500 text-sm'>{errors.task.message}</p>}
                  
            </div>

            <div>
              <input type="text" 
              {...register("description" , {required :"The task is required " ,
               minLength:{value : 3 , message : 'min length is 3 '} ,
              maxLength:{ value : 120 , message : "max length is 120 "} })}
              placeholder='ENTER DESCRIPTION'
              className={ `${errors.description ? "border-red-600": "border-black" } border-2  p-2 rounded text-white font-semibold `}
              /> 
              {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
            </div>
            <button disabled={isLoading} className={`px-4 py-2 ${errors.task || errors.description ? "bg-red-500 hover:bg-red-500 active:bg-red-600 border-red-700" : "bg-green-500 hover:bg-green-500 active:bg-green-600 border-green-700" }  rounded font-semibold   border-2 `}>{isLoading ? 'Submitting' : 'Submit'}</button>
          </div>
      </form>
    </div>

  )
}

export default CreateTodo
