import axios from "axios";

const getEquipos = async() => {
    const response = await axios.get(`${process.env.SERVIDOR}/equipo/all`);
    return response
}
const addEquipo = (mascota) => {
    const response = axios.post(`${process.env.SERVIDOR}/equipo`, mascota);
    return response
}

const UpdateEquipo = (id, mascota) => {
    const response = axios.put(`${process.env.SERVIDOR}/equipo/update/${id}`, mascota);
    return response
}

const DeleteEquipo = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/equipo/delete/${id}`);
    return response
}

const findEquipo = async (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/equipo/search/${id}`);
    return response
}

module.exports = {
    getEquipos,
    findEquipo,
    addEquipo,
    UpdateEquipo,
    DeleteEquipo
}
