const { default: mongoose } = require('mongoose')
const mogoose = require('mongoose')
const todoSchema = mogoose.Schema(
    {
        task: { 
            type : String , 
            required : true ,
            min : [3, "min length is 3 "],
            max : [8 , "max length is 8 "]
        },
        description: { 
            type : String , 
            required : true ,
            min : [3, "min length is 3 "],
            max : [150 , "max length is 150"]
        },
        isCompleted : {
            type : Boolean , 
            default : false

        }
    } , 
    {timestamps : true})

    const todoModel = mongoose.model('Todo' , todoSchema)
    module.exports = todoModel