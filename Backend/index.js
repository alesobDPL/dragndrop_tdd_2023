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
const equipoRoutes = require('./routes/equipoRoutes');
const operarioRoutes = require('./routes/operarioRoutes');
const procesoRoutes = require('./routes/procesoRoutes');
const petRoutes = require('./routes/petRoutes');
const userRoutes = require('./routes/userRoutes')
const emailRoutes = require('./routes/emailRoutes')


// Uso de rutas
app.use('/api', equipoRoutes);
app.use('/api', operarioRoutes);
app.use('/api', procesoRoutes);
app.use('/api', petRoutes);
app.use('/api', userRoutes)
app.use('/api', emailRoutes)


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


