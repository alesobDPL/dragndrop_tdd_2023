const Proceso = require('../models/proceso');
const Horno = require('../models/equipo');

const createProceso = (req, res) => {
  const { horno, mascota, tiempoEjecucion, cantidadAgua, operario } = req.body;
  const newProceso = new Proceso({
    horno,
    mascota,
    tiempoEjecucion,
    cantidadAgua,
    operario,
  });
  newProceso
    .save()
    .then((proceso) => {
      res.status(200).send(proceso);
    })
    .catch((error) => {
      res.status(400).send({ message: 'Error al crear el Proceso', error });
    });
};

const getProcesos = (_req, res) => {
  Proceso.find({})
    .populate('horno')
    .populate('operario')
    .exec()
    .then((procesos) => {
      return res.status(200).send(procesos);
    })
    .catch((error) => {
      return res.status(400).send({ message: 'Error al obtener los Procesos', error: error.message });
    });
};

const getProceso = (req, res) => {
  const { id } = req.params;
  Proceso.findById(id)
    .populate('horno')
    .populate('operario')
    .exec((err, proceso) => {
      if (err) {
        return res.status(400).send({ message: "Error al obtener el Proceso" });
      }
      if (!proceso) {
        return res.status(404).send({ message: "Proceso no encontrado" });
      }
      return res.status(200).send(proceso);
    });
};

const updateProceso = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fecha,
      horno,
      mascota,
      tiempoEjecucion,
      cantidadAgua,
      operario,
    } = req.body;

    const proceso = await Proceso.findByIdAndUpdate(
      id,
      {
        fecha,
        horno,
        mascota,
        tiempoEjecucion,
        cantidadAgua,
        operario,
      },
      { new: true }
    )
      .populate('horno')
      .populate('operario')
      .exec();

    if (!proceso) {
      return res.status(404).send({ message: 'Proceso no encontrado' });
    }

    return res.status(200).send(proceso);
  } catch (error) {
    return res.status(400).send({ message: 'Error al actualizar el Proceso', error: error.message });
  }
};


const deleteProceso = (req, res) => {
  const { id } = req.params;
  Proceso.findByIdAndDelete(id)
    .populate('horno')
    .populate('operario')
    .exec((err, proceso) => {
      if (err) {
        return res.status(400).send({ message: "Error al eliminar el Proceso" });
      }
      if (!proceso) {
        return res.status(404).send({ message: "Proceso no encontrado" });
      }
      return res.status(200).send(proceso);
    });
};

module.exports = {
  createProceso,
  getProcesos,
  getProceso,
  updateProceso,
  deleteProceso,
};
