const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";


function authMiddleware() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    try {
      jwt.verify(token, TOKEN_SECRET);
      next();
    } catch(err) {
      return res.status(403).json({message:'Unauthorized'});
    }
    
  }
}

module.exports = authMiddleware;