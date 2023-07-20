const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (req, res, next) => {
    // Extract the token from the request headers, cookies, or query parameters
    const token = req.headers.authorization || req.cookies.token || req.query.token;
  
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      // Token is valid, extract the user ID from it
      const userId = decodedToken.id;
  
      // Find the user in the database
      User.findById(userId, (err, user) => {
        if (err || !user) {
          return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
  
        // Store the user object in the request for further use
        req.user = user;
  
        // Proceed to the next middleware or route handler
        next();
      });
    });
  };
  
  module.exports = auth;
  