const express = require('express')
const app = express()

const hostname = '127.0.0.1'
const port = 3000

var AdminPerson = true

const admin = (req, res) => {
  return res.send("<h1>Admin</h1>")
}

const isAdmin = (req, res, next) => {
  if(AdminPerson) return next()
  else {
    res.send("<h1>you are not an admin</h1>")
  }
}

app.get('/admin', isAdmin, admin)

app.get('/', (req, res) => {
  res.send("<h1>Hello World</h1>")
})

app.listen(port, hostname, () => console.log(`server is running at http://${hostname}:${port}`))
