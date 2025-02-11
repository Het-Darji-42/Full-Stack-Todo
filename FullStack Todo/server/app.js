const express = require('express')
const cors = require('cors')
const todoRoute = require('./Routes/todoRoutes')
const app = express()


app.use(express.json())
app.use(cors())

app.use('/api/todo' , todoRoute)

module.exports = app
