const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProcesoSchema = new Schema({
  fechaInicio: {
    type: Date,
    default: Date.now
  },
  tiempoEjecucion: {
    type: String,
    required: true
  },
  equipo: {
    type: Schema.Types.ObjectId,
    ref: 'equipo',
    required: true
  },
  mascota1: {
    type: Schema.Types.ObjectId,
    ref: 'pet',
    required: true
  },
  mascota2: {
    type: Schema.Types.ObjectId,
    ref: 'pet',
  },
  operario: {
    type: Schema.Types.ObjectId,
    ref: 'operario',
    required: true
  }
});

module.exports = mongoose.model('proceso', ProcesoSchema);
