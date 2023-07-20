const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('equipo', EquipoSchema);
