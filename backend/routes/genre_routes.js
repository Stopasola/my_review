const express = require('express')
const routes = express.Router() 

const GenreController = require('../src/controllers/genre_controller')

routes.post('/creategenre', GenreController.create)

// routes.delete('/deleteusers', GenreController.delete)
// routes.put('/updateusers', GenreController.update)

module.exports = routes