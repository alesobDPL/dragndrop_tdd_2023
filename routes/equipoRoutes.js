const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

router.post('/equipo', equipoController.createEquipo);
router.get('/equipo/all', equipoController.getEquipos);
router.get('/equipo/search/:id', equipoController.getEquipo);
router.delete('/equipo/delete/:id', equipoController.deleteEquipo);
router.put('/equipo/update/:id', equipoController.updateEquipo);

module.exports = router;
