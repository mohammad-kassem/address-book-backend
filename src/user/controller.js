const { addUser, getByEmail } = require('./service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || "";



async function register(req, res){
    try{
       let salt =  await bcrypt.genSalt(8);
       let hashPassword = await bcrypt.hash(req.body.password, salt);
       try {let addUserResult = await addUser(req.body, hashPassword)}
       catch (err) {return res.status(400).send({'message': err.code ===11000 ? 'Email must be unique' : Object.values(err.errors).map(val => val.message)})};
       return res.status(200).send({
        'message': 'User added succesfully',
        'id': addUserResult._id,
        });
     } catch (err) {
      return res.status(500).send(err);
     }
}

async function login(req, res) {
  try {
    const user = await getByEmail(req.body.email);
    if (!user) return res.status(400).send({'message':'Invalid credentials'});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({'message':'Invalid credentials'});

    const token = jwt.sign(
      {_id: user._id, name: user.name, email: user.email},
      TOKEN_SECRET
    );
    return res.status(200).header('auth-token', token).send({
      'message':'Login successful',
      'auth_token': token
    });
  }
   catch (err) {
    return(res.srarys(500).send(err))
  }
}

module.exports = { register, login };
