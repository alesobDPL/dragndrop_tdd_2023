const express = require('express');
const router = express.Router();
const operarioController = require('../controllers/operarioController');

router.post('/operario', operarioController.createOperario);
router.get('/operario/all', operarioController.getOperarios);
router.get('/operario/search/:id', operarioController.getOperario);
router.delete('/operario/delete/:id', operarioController.deleteOperario);
router.put('/operario/update/:id', operarioController.updateOperario);

module.exports = router;
