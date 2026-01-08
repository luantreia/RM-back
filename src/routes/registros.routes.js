const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { createRegistro, getRegistros, getRMActual, updateRegistro, deleteRegistro } = require('../controllers/registros.controller');

router.use(auth);

router.post('/', createRegistro);
router.get('/', getRegistros);
router.get('/actual/:ejercicioId', getRMActual);
router.put('/:id', updateRegistro);
router.delete('/:id', deleteRegistro);

module.exports = router;
