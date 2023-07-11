const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HornoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('horno', HornoSchema);
