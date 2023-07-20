const Equipo = require('../models/equipo');

const createEquipo = async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const newEquipo = new Equipo({ nombre, estado });
    const savedEquipo = await newEquipo.save();
    res.status(201).json(savedEquipo);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el Equipo', error });
  }
};

const getEquipos = async (_req, res) => {
  try {
    const Equipos = await Equipo.find({});
    res.status(200).json(Equipos);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los Equipos', error });
  }
};

const getEquipo = (req, res) => {
  const { id } = req.params;
  Equipo.findById(id, (err, equipo) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el Equipo" });
    }
    if (!equipo) {
      return res.status(404).send({ message: "Equipo no encontrado" });
    }
    return res.status(200).send(equipo);
  });
};

const updateEquipo = (req, res) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;

  Equipo.findByIdAndUpdate(id, { nombre, estado }, { new: true })
    .then((equipo) => {
      if (!equipo) {
        return res.status(404).send({ message: "Equipo no encontrado" });
      }
      return res.status(200).send(equipo);
    })
    .catch((err) => {
      return res.status(400).send({ message: "Error al actualizar el Equipo" });
    });
};

const deleteEquipo = (req, res) => {
  const { id } = req.params;
  Equipo.findByIdAndDelete(id, (err, equipo) => {
    if (err) {
      return res.status(400).send({ message: "Error al eliminar el Equipo" });
    }
    if (!equipo) {
      return res.status(404).send({ message: "Equipo no encontrado" });
    }
    return res.status(200).send(equipo);
  });
};

module.exports = {
  createEquipo,
  getEquipos,
  getEquipo,
  updateEquipo,
  deleteEquipo,
};
