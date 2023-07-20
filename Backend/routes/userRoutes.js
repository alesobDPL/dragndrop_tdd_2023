const express = require('express')
const api = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

api.post('/user', userController.createUser)
api.get('/user/all', userController.getUsers)
api.get('/user/search/:id', userController.getUser)
api.delete('/user/delete/:id', userController.delUser)
api.post('/login', userController.login)
api.get('/checkToken', auth, userController.checkToken)
api.post('/logout', userController.logout)
module.exports = api