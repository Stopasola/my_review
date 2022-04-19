const express = require('express')
const routes = express.Router() 

const FilmController = require('./controllers/film_controller')

routes.post('/createfilm', FilmController.create)
routes.post('/deletefilm', FilmController.delete)

module.exports = routes
