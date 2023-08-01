const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();
const User = require('../models/user');

const auth = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.token || !cookies.token == null) {
    return res.status(401).send({ message: "No autorizado" });
  }

  try {
    const payload = jwt.decode(cookies.token, process.env.JWT_SECRET);
    const userId = payload.sub;

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token expirado' });
    }

    // Fetch the user from the database based on the userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }4

    // Check if the user's role is admin
    if (user.role !== 'admin') {
      return res.status(403).send({ message: 'No tienes permisos de administrador' });
    }

    next();
  } catch (error) {
    return res.status(401).send({ message: 'Token invalido' });
  }
};

module.exports = auth;
