const express = require('express')
const app = express()

const hostname = '127.0.0.1'
const port = 3000

var isPersonLoggedIn = true
var AdminPerson = false


const admin = (req, res) => {
  return res.send("<h1>Admin</h1>")
}

const isLoggedIn = (req, res, next) => {
  if(isPersonLoggedIn) return next()
  else res.send("<h1>Please Log In</h1>")
}

const isAdmin = (req, res, next) => {
  if(AdminPerson) return next()
  else {
    res.send("<h1>you are not an admin</h1>")
  }
}

app.get('/admin', isLoggedIn, isAdmin, admin)

app.get('/', (req, res) => {
  res.send("<h1>Hello World</h1>")
})

app.listen(port, hostname, () => console.log(`server is running at http://${hostname}:${port}`))
