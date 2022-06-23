const addUser = require('./service');
const bcrypt = require('bcryptjs');


async function register(req, res){
    try{
       let salt =  await bcrypt.genSalt(8);
       let hashPassword = await bcrypt.hash(req.body.password, salt);
       let addUserResult = await addUser(req.body, hashPassword);    
       return res.send({
        'status': 'Success',
        'message': 'User added succesfully',
        'id': addUserResult._id,
        });
     } catch (err) {
      return res.send({
        'status': 'Failure',
        'message':Object.values(err.errors).map(val => val.message)});
     }
}

module.exports = register;
