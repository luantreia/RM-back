const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const ejerciciosRoutes = require('./routes/ejercicios.routes');
const registrosRoutes = require('./routes/registros.routes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ejercicios', ejerciciosRoutes);
app.use('/api/registros', registrosRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Algo salió mal!' });
});

module.exports = app;
