const express = require('express')
const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.get('/', (req, res) => {
  res.send("<h1>Hello World</h1>")
})

app.listen(port, hostname, () => console.log(`server is running at http://${hostname}:${port}`))
