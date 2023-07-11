const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    pet_type: {
        type: String,
        required: true
    },
    withdraw_date: {
            type: Date,
            default: Date.now
        },
    service_status: {
        type: Boolean,
        default: false
    },
    pet_status: {
        type: String,
        required: true,
        default: "Preparacion",
        enum: ['Preparacion', 'En proceso', 'Para entrega', 'En ruta', "Entregado"],
    }


})

module.exports = mongoose.model('pet', PetSchema)