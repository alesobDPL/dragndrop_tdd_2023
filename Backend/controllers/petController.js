const Pet = require('../models/pet');

const createPet = (req, res) => {
  const { name, weight, pet_type } = req.body;
  const newPet = new Pet({
    name,
    weight,
    pet_type,
  });

  newPet
    .save()
    .then((pet) => {
      res.status(200).send(pet);
    })
    .catch((error) => {
      res.status(400).send({ message: 'Error al registrar a la mascota', error });
    });
};

const getPets = async (_req, res) => {
  try {
    const pets = await Pet.find({}).exec();
    return res.status(200).send(pets);
  } catch (error) {
    return res.status(400).send({ message: "Error al mostrar las mascotas", error: error.message });
  }
};

const getPet = (req, res) => {
  const ID = req.params.id;
  Pet.findById(ID)
    .exec((err, pet) => {
      if (err) {
        return res.status(400).send({ message: "Error al buscar el registro de la mascota" });
      }
      return res.status(200).send(pet);
    });
};

const delPet = (req, res) => {
  const ID = req.params.id;
  Pet.findByIdAndDelete(ID, (err, pet) => {
    if (err) {
      return res.status(400).send({ message: "Error al eliminar el registro de la mascota" });
    }
    return res.status(200).send(pet);
  });
};

const updatePet = (req, res) => {
  const { id } = req.params;
  Pet.findByIdAndUpdate(id, req.body, (err, pet) => {
    if (err) {
      return res.status(400).send({ message: "Error al actualizar los datos de la mascota" });
    }
    return res.status(200).send({ pet });
  });
};

const updatePetStatus = (req, res) => {
  const { id } = req.params;
  const { withdraw_date, service_status } = req.body;
  Pet.findByIdAndUpdate(id, { withdraw_date, service_status }, { new: true }, (err, pet) => {
    if (err) {
      return res.status(400).send({ message: "Error al actualizar el estado del servicio de la mascota" });
    }
    return res.status(200).send({ pet });
  });
};

module.exports = {
  createPet,
  getPets,
  getPet,
  delPet,
  updatePet,
  updatePetStatus,
};
