const Ejercicio = require('../models/Ejercicio');
const RegistroFuerza = require('../models/RegistroFuerza');

const createEjercicio = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });

    const ejercicio = new Ejercicio({
      nombre,
      usuario: req.userId
    });

    await ejercicio.save();
    res.status(201).json(ejercicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear ejercicio' });
  }
};

const getEjercicios = async (req, res) => {
  try {
    const ejercicios = await Ejercicio.find({ usuario: req.userId }).sort({ nombre: 1 });
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ejercicios' });
  }
};

const updateEjercicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });

    const ejercicio = await Ejercicio.findOneAndUpdate(
      { _id: id, usuario: req.userId },
      { nombre },
      { new: true }
    );

    if (!ejercicio) return res.status(404).json({ error: 'Ejercicio no encontrado' });

    res.json(ejercicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar ejercicio' });
  }
};

const deleteEjercicio = async (req, res) => {
  try {
    const { id } = req.params;

    const ejercicio = await Ejercicio.findOneAndDelete({ _id: id, usuario: req.userId });

    if (!ejercicio) return res.status(404).json({ error: 'Ejercicio no encontrado' });

    // Cascada: Eliminar todos los registros de fuerza asociados
    await RegistroFuerza.deleteMany({ ejercicio: id, usuario: req.userId });

    res.json({ message: 'Ejercicio y registros eliminados correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar ejercicio' });
  }
};

module.exports = { createEjercicio, getEjercicios, updateEjercicio, deleteEjercicio };
