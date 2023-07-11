import axios from "axios";

const getEquipos = async() => {
    const response = await axios.get(`${process.env.SERVIDOR}/horno/all`);
    return response
}
const addEquipo = (mascota) => {
    const response = axios.post(`${process.env.SERVIDOR}/horno`, mascota);
    return response
}

const UpdateEquipo = (id, mascota) => {
    const response = axios.put(`${process.env.SERVIDOR}/horno/update/${id}`, mascota);
    return response
}

const DeleteEquipo = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/horno/delete/${id}`);
    return response
}

const findEquipo = async (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/horno/search/${id}`);
    return response
}

module.exports = {
    getEquipos,
    findEquipo,
    addEquipo,
    UpdateEquipo,
    DeleteEquipo
}
