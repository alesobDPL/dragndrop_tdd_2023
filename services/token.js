const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

const createToken = (user) => {
    const payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(1, 'hours').unix(),
    };
    return jwt.encode(payload, process.env.JWT_SECRET);
  };
  

module.exports = {
    createToken
}