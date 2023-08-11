const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s-]+$/
  },
  weight: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0.1 && value <= 100;
      },
      message: 'Weight must be between 0.1 and 100'
    }
  },
  pet_type: {
    type: String,
    required: true,
   
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
  },
  dueñoEmail:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('pet', PetSchema);
