const express = require('express')
const api = express.Router()
const petController = require('../controllers/petController')

api.post('/pet', petController.createPet)
api.get('/pet/all', petController.getPets)
api.get('/pet/search/:id', petController.getPet)
api.delete('/pet/delete/:id', petController.delPet)
api.put('/pet/update/:id', petController.updatePet)

module.exports = api