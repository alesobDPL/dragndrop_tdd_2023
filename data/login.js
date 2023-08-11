import axios from "axios";

const login = async (sesion) => {
    const response = await axios.post(`${process.env.SERVIDOR}/login`, sesion)
    return response
}

const logout = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/logout`)
    return response
}

const checkToken = async (token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/checkToken`, {
      headers: {
        Cookie: `token=${token}`, // Set the token as a cookie
      },
    });
    return response;
  };

  const checkTokenAdmin = async (token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/checkTokenAdmin`, {
      headers: {
        Cookie: `token=${token}`,
      },
      withCredentials: true, // Add this line
    });
    return response;
  };

  const getUser = async (id) => {
    const response = await axios.get(`${process.env.SERVIDOR}//user/search/${id}`)
    return response
}
  

module.exports = {
    login,
    logout,
    checkToken,
    checkTokenAdmin,
    getUser
}