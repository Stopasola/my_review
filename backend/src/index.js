const express = require('express')
const person_routes = require('../routes/person_routes')
const badge_routes = require('../routes/badge_routes')
const film_routes = require('../routes/film_routes')
const genre_routes = require('../routes/genre_routes')


const app = express()
const port = 3333;

app.use(express.json())

app.use(person_routes)
app.use(badge_routes)
app.use(film_routes)
app.use(genre_routes)

app.listen(port, console.log("Server started on port: " + port))