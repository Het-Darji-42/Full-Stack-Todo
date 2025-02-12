const {allTodo , addTodo } = require('../Controllers/todoControllers')
const express = require('express')
const router = express.Router()

router.get('/allTodo' , allTodo )
router.post('/addTodo' , addTodo)
router.post('/deletTodo' , )
router.put('/isCompleted' , )
router.put('/updateTodo' , )

module.exports = router