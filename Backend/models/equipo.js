const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/
  },
  estado: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('equipo', EquipoSchema);
