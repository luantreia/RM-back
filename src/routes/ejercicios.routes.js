const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { 
  createEjercicio, 
  getEjercicios, 
  updateEjercicio, 
  deleteEjercicio 
} = require('../controllers/ejercicios.controller');

router.use(auth);

router.post('/', createEjercicio);
router.get('/', getEjercicios);
router.put('/:id', updateEjercicio);
router.delete('/:id', deleteEjercicio);

module.exports = router;
