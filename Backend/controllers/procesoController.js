const Proceso = require('../models/proceso');
const Equipo = require('../models/equipo');

const createProceso = (req, res) => {
  const { equipo, mascota1, mascota2, tiempoEjecucion, operario } = req.body;
  console.log("dentro de createProceso en controller: ", equipo, mascota1, mascota2, tiempoEjecucion, operario);

  // Search for the equipo in the database based on its name
  Equipo.findOne({ nombre: equipo })
    .then((equipoDoc) => {
      if (!equipoDoc) {
        return res.status(400).send({ message: 'Equipo not found' });
      }

      // Get the equipo ID from the retrieved document
      const equipoId = equipoDoc._id;

      // Check if mascota2 is provided and set it to null if it's not defined
      const mascota2Id = mascota2 ? mascota2 : null;

      const newProceso = new Proceso({
        equipo: equipoId, // Use equipoId instead of equipo
        mascota1: mascota1,
        mascota2: mascota2Id,
        tiempoEjecucion: tiempoEjecucion,
        operario: operario,
      });

      newProceso
        .save()
        .then((proceso) => {
          res.status(200).send(proceso);
        })
        .catch((error) => {
          res.status(400).send({ message: 'Error al crear el Proceso', error });
        });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error searching for the equipo', error });
    });
};


const getProcesos = (_req, res) => {
  Proceso.find({})
    .populate('equipo')
    .populate('operario')
    .populate('mascota1')
    .populate('mascota2')
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
    .populate('equipo')
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
      equipo,
      mascota,
      tiempoEjecucion,
      cantidadAgua,
      operario,
    } = req.body;

    const proceso = await Proceso.findByIdAndUpdate(
      id,
      {
        fecha,
        equipo,
        mascota,
        tiempoEjecucion,
        cantidadAgua,
        operario,
      },
      { new: true }
    )
      .populate('equipo')
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
    .populate('equipo')
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
