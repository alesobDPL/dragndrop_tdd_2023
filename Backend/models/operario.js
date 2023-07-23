const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OperarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/
  },
  apellido: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/
  },
  email: {
    type: String,
    required: true
  },
  contacto: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('operario', OperarioSchema);
