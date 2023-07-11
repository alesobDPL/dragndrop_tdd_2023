const Horno = require('../models/horno');

const createHorno = async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const newHorno = new Horno({ nombre, estado });
    const savedHorno = await newHorno.save();
    res.status(201).json(savedHorno);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el Horno', error });
  }
};

const getHornos = async (_req, res) => {
  try {
    const hornos = await Horno.find({});
    res.status(200).json(hornos);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los Hornos', error });
  }
};

const getHorno = (req, res) => {
  const { id } = req.params;
  Horno.findById(id, (err, horno) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el Horno" });
    }
    if (!horno) {
      return res.status(404).send({ message: "Horno no encontrado" });
    }
    return res.status(200).send(horno);
  });
};

const updateHorno = (req, res) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;
  Horno.findByIdAndUpdate(id, { nombre, estado }, { new: true }, (err, horno) => {
    if (err) {
      return res.status(400).send({ message: "Error al actualizar el Horno" });
    }
    if (!horno) {
      return res.status(404).send({ message: "Horno no encontrado" });
    }
    return res.status(200).send(horno);
  });
};

const deleteHorno = (req, res) => {
  const { id } = req.params;
  Horno.findByIdAndDelete(id, (err, horno) => {
    if (err) {
      return res.status(400).send({ message: "Error al eliminar el Horno" });
    }
    if (!horno) {
      return res.status(404).send({ message: "Horno no encontrado" });
    }
    return res.status(200).send(horno);
  });
};

module.exports = {
  createHorno,
  getHornos,
  getHorno,
  updateHorno,
  deleteHorno,
};
