const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createToken } = require('../services/token');

const createUser = async (req, res) => {
    const { username,role } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);

    try {
        const user = await User.findOne({ username });
        
        if (user) {
            return res.status(400).send({ message: 'El usuario ya se encuentra registrado' });
        }

        const newUser = new User({
            username,
            password,
            role
        });

        await newUser.save();

        return res.status(201).send(newUser);
    } catch (err) {
        return res.status(400).send({ message: "Error al registrar el usuario" });
    }
};

const checkToken = (req, res) => {
    return res.status(200).send({message: 'Token valido'})
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      
      res.cookie('token',  createToken(user), { httpOnly: true });
      res.status(200).json({ message: 'Login successful', token:createToken(user),user:user.role });
    } catch (error) {
      res.status(500).json({ message: 'Error during login', error });
    }
  };


const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).send({ message: 'Sesion cerrada' });
}

const getUsers = async (_req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).send(users);
    } catch (err) {
        return res.status(404).send({ message: "Error al mostrar los registros de los usuarios" });
    }
};

const getUser = async (req, res) => {
    const userID = req.params.id;
    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).send({ message: "Usuario no existe en la base de datos" });
        }
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ message: "Error al buscar el usuario" });
    }
};

const delUser = async (req, res) => {
    const userID = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userID);
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        return res.status(200).send(user);
    } catch (err) {
        return res.status(400).send({ message: "Error al eliminar el usuario" });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    delUser,
    login,
    checkToken,
    logout
};
