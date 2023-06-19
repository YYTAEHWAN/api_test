const express = require('express')
var cors = require('cors')
const app = express()
const port = 3003;
app.use(cors())

app.get('/', function (req, res) {
    res.send('firebase API Test Page')
  })
  