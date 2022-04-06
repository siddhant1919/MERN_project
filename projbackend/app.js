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
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')


// PORT
const port = process.env.PORT || 8000


// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


// Original Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)


// DB Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB connection error " + err))


// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`)
})

