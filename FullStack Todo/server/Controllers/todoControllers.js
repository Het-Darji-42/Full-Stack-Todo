const todoModel = require('../Models/todo.models')



const allTodo = async (req , res)=>{
    try {
        const todo = await todoModel.find()
        return res.status(200).json({
            message :"All Todo Fetched Successfully",
            todo : todo
        })
        
    } catch (error) {
        return res.status(500).json({
            message : "Server Error " ,
            error : error
        })
    }
}



const addTodo = async ( req,res)=>{
    try {
        const {task , description} = req.body;
        const existedTodo = await todoModel.findOne({task, description})
        if(existedTodo){
            return res.status(400).json({
                message : "Todo Alrady Exixted"
            })
        }
        const todo = await todoModel.create({task , description})
        res.status(200).json({
            message : "Todo Created Successfully",
            todo : todo
        })
    
    } catch (error) {
    return res.status(500).json({
        message : "Server Error " ,
        error : error
    })
    }   
}

const deleteTodo =async (req , res)=>{
    try {
        const {id}= req.params 
        const todo = await todoModel.findByIdAndDelete(id)
        if(!todo){
            return res.status(404).json({
                mmessage : "todo does not found",
            })
        }
        res.status(200).json({
            message : "Todo Deleted Successfully",
            todo : todo 
        })
    } catch (error) {
        return res.status(500).json({
            message : 'Server Error',
            error:error
        })
    }               
}

const updateTodo =async (req , res)=>{
    try {
        const { task , description} = req.body
        const { id } = req.params 

        const todo = await todoModel.findByIdAndUpdate(id , { task , description , isCompleted : false} , {new:true , runValidators : true})
        if(!todo){
            return res.status(404).json({
                mmessage : "todo does not found",
            })
        }
        res.status(200).json({
            message : "Todo Update Successfully",
            todo : todo 
        })
    } catch (error) {
        return res.status(500).json({
            message : 'Server Error',
            error:error
        })
    }
}

const isCompleted = async (req, res)=>{ 
    try {
        const { id } = req.params
        const { isCompleted } = req.body
        const todo = await todoModel.findByIdAndUpdate(id , { isCompleted } , {new:true , runValidators : true })
        if(!todo){
            return res.status(404).json({
                mmessage : "todo does not found",
            })
        }
        res.status(200).json({
            message : "Todo Toggled Successfully",
            todo : todo 
        })
    } catch (error) {
        
    }
}
module.exports = {addTodo , allTodo, deleteTodo , updateTodo , isCompleted}