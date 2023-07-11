const Operario = require('../models/operario');

const createOperario = (req, res) => {
  const { nombre, apellido, email, contacto } = req.body;
  const newOperario = new Operario({ nombre, apellido, email, contacto });
  
  newOperario
    .save()
    .then((operario) => {
      res.status(200).send(operario);
    })
    .catch((error) => {
      res.status(400).send({ message: 'Error al crear el Operario', error });
    });
};

const getOperarios = (_req, res) => {
  Operario.find({})
    .then((operarios) => {
      res.status(200).send(operarios);
    })
    .catch((error) => {
      res.status(400).send({ message: 'Error al obtener los Operarios', error });
    });
};

const getOperario = (req, res) => {
  const { id } = req.params;
  Operario.findById(id, (err, operario) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el Operario" });
    }
    if (!operario) {
      return res.status(404).send({ message: "Operario no encontrado" });
    }
    return res.status(200).send(operario);
  });
};

const updateOperario = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, contacto } = req.body;
  Operario.findByIdAndUpdate(id, { nombre, apellido, email, contacto }, { new: true }, (err, operario) => {
    if (err) {
      return res.status(400).send({ message: "Error al actualizar el Operario" });
    }
    if (!operario) {
      return res.status(404).send({ message: "Operario no encontrado" });
    }
    return res.status(200).send(operario);
  });
};

const deleteOperario = (req, res) => {
  const { id } = req.params;
  Operario.findByIdAndDelete(id, (err, operario) => {
    if (err) {
      return res.status(400).send({ message: "Error al eliminar el Operario" });
    }
    if (!operario) {
      return res.status(404).send({ message: "Operario no encontrado" });
    }
    return res.status(200).send(operario);
  });
};

module.exports = {
  createOperario,
  getOperarios,
  getOperario,
  updateOperario,
  deleteOperario,
};
