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

module.exports = {addTodo , allTodo}