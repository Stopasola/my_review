const express = require('express')
const routes = express.Router() 

const PersonController = require('./controllers/PersonController')
const BadgeController = require('./controllers/BadgeController')
const FilmController = require('./controllers/FilmController')

routes.post('/createusers', PersonController.create)
routes.post('/deleteusers', PersonController.delete)
routes.post('/updateusers', PersonController.update)

routes.post('/createbadge', BadgeController.create)
routes.post('/deletebadge', BadgeController.delete)

routes.post('/createfilm', FilmController.create)
routes.post('/deletefilm', FilmController.delete)

module.exports = routes
