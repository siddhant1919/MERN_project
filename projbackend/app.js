require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require('./routes/authentication')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')


// PORT
const port = process.env.PORT || 8000


// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


// My Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)


// DB Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB connection error " + err))


// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`)
})

