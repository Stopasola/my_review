const express = require('express')
const routes = express.Router() 

const PersonController = require('../src/controllers/person_controller')

routes.post('/createusers', PersonController.create)
routes.delete('/deleteusers', PersonController.delete)
routes.put('/updateusers', PersonController.update)

module.exports = routes
