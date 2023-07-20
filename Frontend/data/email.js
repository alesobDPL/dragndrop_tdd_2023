import axios from "axios";

const enviarEmail = (mailBody) => {
    const response = axios.post(`${process.env.SERVIDOR}/EnviarEmail`, mailBody);
    return response
 
};



module.exports = {
    enviarEmail
}