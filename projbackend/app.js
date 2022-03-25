require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()

const port = process.env.PORT || 8000

mongoose.connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB connection error " + err))


app.listen(port, () => {
  console.log(`app is running at ${port}`)
})

