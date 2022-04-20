const express = require('express')
const routes = express.Router() 

const BadgeController = require('../src/controllers/badge_controller')


routes.post('/createbadge', BadgeController.create)
routes.put('/updatebadge/:id', BadgeController.update)
routes.delete('/deletebadge/:id', BadgeController.delete)
routes.get('/badge', BadgeController.index)
routes.get('/badge/:id', BadgeController.show)


module.exports = routes
