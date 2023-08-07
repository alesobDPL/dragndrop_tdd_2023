const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength:30,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest'],
        required: true
        
    },
    email: {
        type: String,
        maxLength:100,
        required: true
      }
})

module.exports = mongoose.model('user', UserSchema)