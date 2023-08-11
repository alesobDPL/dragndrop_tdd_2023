import axios from "axios";

const enviarEmail = (mailBody) => {
    const response = axios.post(`${process.env.SERVIDOR}/EnviarEmail`, mailBody);
    return response
 
};

export { enviarEmail }