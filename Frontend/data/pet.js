import axios from "axios";

const getMascotas = async() => {
    const response = await axios.get(`${process.env.SERVIDOR}/pet/all`);
    return response
}
const addMascota = (mascota) => {
    const response = axios.post(`${process.env.SERVIDOR}/pet`, mascota);
    return response
}

const UpdateMascota = (id, mascota) => {
    const response = axios.put(`${process.env.SERVIDOR}/pet/update/${id}`, mascota);
    return response
}

const DeleteMascota = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/pet/delete/${id}`);
    return response
}

const findMascota = async (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/pet/search/${id}`);
    return response
}

module.exports = {
    getMascotas,
    findMascota,
    addMascota,
    UpdateMascota,
    DeleteMascota
}
