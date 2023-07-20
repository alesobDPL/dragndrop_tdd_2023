const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProcesoSchema = new Schema({
  fecha: {
    type: Date,
    default: Date.now
  },
  horno: {
    type: Schema.Types.ObjectId,
    ref: 'equipo',
    required: true
  },
  mascota: {
    type: Schema.Types.ObjectId,
    ref: 'pet',
    required: true
  },
  tiempoEjecucion: {
    type: Number,
    required: true
  },
  cantidadAgua: {
    type: Number,
    required: true
  },
  operario: {
    type: Schema.Types.ObjectId,
    ref: 'operario',
    required: true
  }
});

module.exports = mongoose.model('proceso', ProcesoSchema);
