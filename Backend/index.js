const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

require('dotenv').config()

app.use(express.json());

app.options('*', cors());
app.use(
  cors({
    credentials: false,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

// Rutas exportadas
const hornoRoutes = require('./routes/hornoRoutes');
const operarioRoutes = require('./routes/operarioRoutes');
const procesoRoutes = require('./routes/procesoRoutes');
const petRoutes = require('./routes/petRoutes');


// Uso de rutas
app.use('/api', hornoRoutes);
app.use('/api', operarioRoutes);
app.use('/api', procesoRoutes);
app.use('/api', petRoutes);


mongoose
  .connect(process.env.DB1, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('La base de datos está conectada correctamente');
    app.listen(process.env.PORT, () => {
      console.log('El BACKEND esta corriendo en el puerto => ', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });


