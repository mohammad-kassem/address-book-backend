const { addUser, getByEmail } = require('./service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || "";



async function register(req, res){
    try{
       let salt =  await bcrypt.genSalt(8);
       let hashPassword = await bcrypt.hash(req.body.password, salt);
       let addUserResult = await addUser(req.body, hashPassword);    
       return res.status(200).send({
        'status': 'Success',
        'message': 'User added succesfully',
        'id': addUserResult._id,
        });
     } catch (err) {
      return res.status(400).send(Object.values(err.errors).map(val => val.message));
     }
}

async function login(req, res) {
  try {
    const user = await getByEmail(req.body.email);
    if (!user) return res.status(400).send('Invalid credentials');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    const token = jwt.sign(
      {_id: user._id, name: user.name, email: user.email},
      TOKEN_SECRET
    );
    return res.status(200).header('auth-token', token).send({
      'status': 'Success',
      'auth-token': token
    });
  }
   catch (err) {
    return(res.send(err))
  }
}

module.exports = { register, login };
