const express = require('express')
const routes = express.Router() 
const FilmController = require('../src/controllers/film_controller')



routes.post('/createfilm', FilmController.create)
routes.get('/film/search/', FilmController.search)
routes.get('/film', FilmController.index)
routes.put('/updatefilm/:id', FilmController.update)
routes.delete('/deletefilm/:id', FilmController.delete)
routes.get('/film/:id', FilmController.show)


module.exports = routes
