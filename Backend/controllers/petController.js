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

const getPetsInProceso = async (_req, res) => {
  try {
    const pets = await Pet.find({ pet_status: "En proceso" }).exec();
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

const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pet = await Pet.findByIdAndUpdate(id, req.body, { new: true }).exec();
    
    return res.status(200).send({ pet });
  } catch (err) {
    return res.status(400).send({ message: "Error al actualizar los datos de la mascota" });
  }
};




module.exports = {
  createPet,
  getPets,
  getPetsInProceso,
  getPet,
  delPet,
  updatePet
};
