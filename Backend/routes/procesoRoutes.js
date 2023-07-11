const express = require('express');
const router = express.Router();
const procesoController = require('../controllers/procesoController');

router.post('/proceso', procesoController.createProceso);
router.get('/proceso/all', procesoController.getProcesos);
router.get('/proceso/search/:id', procesoController.getProceso);
router.delete('/proceso/delete/:id', procesoController.deleteProceso);
router.put('/proceso/update/:id', procesoController.updateProceso);

module.exports = router;
