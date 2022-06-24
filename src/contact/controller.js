const User = require('../../model/User');
const { addContact, getById, getContacts, updateContact } = require('./service');
const jwt_decode = require('jwt-decode');


async function add(req, res) {
  try {
    const user_id = jwt_decode(req.headers['authorization'])._id;
    let newContact;
    try {newContact = await addContact(req.body, user_id)}
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
  }catch (err) {
    res.status(500).send(err);
  }
}

async function get(req, res){
  try{
    if (req.query.id) {
      const id = req.query.id;
      let result;
      try {result = await getById(id)}
      catch(err) {return res.status(404).send({'message': 'Not found'})};
      return res.status(200).send({'contact': result});
    }

    const result = await getContacts();
    return res.status(200).send({'contacts': result});
    }
  catch (err) {
    res.status(500).send(err);
  }
}

async function update(req, res){
  try {
    const id = req.query.id;
    let updatedContact;
    try {updatedContact = await updateContact(req.body, mongoose.Types.ObjectId(id));
    if(!Object.keys(updateContact)) return res.send("hello")}
    catch (err) {
      console.log("hello");
      if(Object.keys(updateContact).length == 0) return res.status(404).send({'message': 'Not found'});
      return res.status(400).send(err.code ===11000 ? 'Phone number must be unique' : Object.values(err.errors).map(val => val.message))};

    return res.status(200).send(updatedContact);
  }catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}




module.exports = { add, get, update };
