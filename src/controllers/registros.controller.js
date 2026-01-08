const RegistroFuerza = require('../models/RegistroFuerza');
const { calcularRM } = require('../utils/rmFormulas');

const createRegistro = async (req, res) => {
  try {
    const { ejercicioId, peso, reps, formula, fecha } = req.body;

    if (!ejercicioId || !peso || !reps || !formula) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const rmEstimado = calcularRM(peso, reps, formula);

    const registro = new RegistroFuerza({
      usuario: req.userId,
      ejercicio: ejercicioId,
      peso,
      reps,
      formula,
      rmEstimado,
      fecha: fecha || new Date()
    });

    await registro.save();
    res.status(201).json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

const getRegistros = async (req, res) => {
  try {
    const { ejercicioId } = req.query;
    const query = { usuario: req.userId };
    if (ejercicioId) query.ejercicio = ejercicioId;

    const registros = await RegistroFuerza.find(query).sort({ fecha: -1 });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registros' });
  }
};

const getRMActual = async (req, res) => {
  try {
    const { ejercicioId } = req.params;
    
    // El RM más alto registrado para ese ejercicio
    const maxRM = await RegistroFuerza.findOne({ 
      usuario: req.userId, 
      ejercicio: ejercicioId 
    }).sort({ rmEstimado: -1 });

    res.json(maxRM);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener RM actual' });
  }
};

const updateRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const { peso, reps, formula, fecha } = req.body;

    const rmEstimado = calcularRM(peso, reps, formula);

    const registro = await RegistroFuerza.findOneAndUpdate(
      { _id: id, usuario: req.userId },
      { peso, reps, formula, rmEstimado, fecha },
      { new: true }
    );

    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

const deleteRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await RegistroFuerza.findOneAndDelete({ _id: id, usuario: req.userId });

    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = { createRegistro, getRegistros, getRMActual, updateRegistro, deleteRegistro };
