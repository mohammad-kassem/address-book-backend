const User = require('../../model/User');

async function addUser(body, hashPassword) {
    const {
      name,
      email,
    } = body;
  
    const user = new User({
      name,
      email,
      password: hashPassword
});
  
    return await user.save();
  }

  module.exports = addUser;