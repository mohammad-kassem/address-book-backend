const User = require('../../model/User');
const addContact = require('./service');
const jwt_decode = require('jwt-decode');


async function add(req, res) {
  try {
    const user_id = jwt_decode(req.headers['authorization'])._id;
    
    try {const newContact = await addContact(req.body, user_id)}
    catch (err) {
      return res.status(400).send(err.code ===11000 ? 'Phone number must be unique' : Object.values(err.errors).map(val => val.message))};

    const updateUser = await User.updateOne({
        _id: newContact.user
      },{
        $push: {
          contacts: newContact._id
        }
      }
    );
    return res.status(200).send(newContact); // 200
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = { add };
