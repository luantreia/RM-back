const mongoose = require('mongoose');

const registroFuerzaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  ejercicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ejercicio',
    required: true
  },
  peso: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  formula: {
    type: String,
    enum: ['epley', 'brzycki', 'lombardi'],
    required: true
  },
  rmEstimado: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RegistroFuerza', registroFuerzaSchema);
