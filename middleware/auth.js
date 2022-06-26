const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";


function authMiddleware() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    try {
      jwt.verify(token, TOKEN_SECRET);
    } catch(err) {
      return res.status(403).json({message:'Unauthorized'});
    }
    // bcrypt you need to check if its valid conn

    // check jwt token if it is valid
    // validate forms
    // not authorized 403

    next();
    // res.send('result');
  }
}

module.exports = authMiddleware;