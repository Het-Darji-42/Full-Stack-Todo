const {allTodo , addTodo , deleteTodo , isCompleted , updateTodo} = require('../Controllers/todoControllers')
const express = require('express')
const router = express.Router()

router.get('/allTodo' , allTodo )
router.post('/addTodo' , addTodo)
router.post('/deletTodo/:id' , deleteTodo )
router.put('/isCompleted/:id' , isCompleted )
router.put('/updateTodo/:id' ,updateTodo )

module.exports = router