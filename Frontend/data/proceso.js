import axios from "axios";

const getProcesos = async() => {
    const response = await axios.get(`${process.env.SERVIDOR}/proceso/all`);
    return response
}

const addProceso = (proceso) => {
    console.log("Estamos dentro de proceso",proceso)
    const response = axios.post(`${process.env.SERVIDOR}/proceso`, proceso);
    return response
}

const UpdateProceso = (id, proceso) => {
    const response = axios.put(`${process.env.SERVIDOR}/proceso/update/${id}`, proceso);
    return response
}

const DeleteProceso = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/proceso/delete/${id}`);
    return response
}

const findProceso = async (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/proceso/search/${id}`);
    return response
}

module.exports = {
    getProcesos,
    findProceso,
    addProceso,
    UpdateProceso,
    DeleteProceso
}
