const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
connectDB()

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
