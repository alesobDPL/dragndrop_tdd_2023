const express = require('express');
const router = express.Router();
const hornoController = require('../controllers/hornoController');

router.post('/horno', hornoController.createHorno);
router.get('/horno/all', hornoController.getHornos);
router.get('/horno/search/:id', hornoController.getHorno);
router.delete('/horno/delete/:id', hornoController.deleteHorno);
router.put('/horno/update/:id', hornoController.updateHorno);

module.exports = router;
