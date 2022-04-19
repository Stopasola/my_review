const express = require('express')
const person_routes = require('../routes/person_routes')


const app = express()
const PORT = 3333;

app.use(express.json())

app.use(person_routes)

app.listen(PORT, console.log("Server don start for port: " + PORT))