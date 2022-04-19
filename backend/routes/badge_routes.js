const express = require('express')
const routes = express.Router() 

const BadgeController = require('./controllers/badge_controller')


routes.post('/createbadge', BadgeController.create)
routes.post('/deletebadge', BadgeController.delete)


module.exports = routes
