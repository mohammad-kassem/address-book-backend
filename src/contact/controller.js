const User = require('../../model/User');
const { addContact, getById, getContacts, updateContact, removeContact } = require('./service');
const jwt_decode = require('jwt-decode');
const { findById } = require('../../model/User');


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
      try {result = await getById(id)
        if(!Object.keys(result)) return res.status(404).send({'message': 'Not found'})}
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
    try {updatedContact = await getById(id);
      console.log(updatedContact);
      if (!Object.keys(updatedContact)) {console.log("hi"); return res.status(404).send({'message': 'Not found'})};
      console.log(updatedContact);
      try {updatedContact = await updateContact(req.body, id);
      return res.status(200).send(updatedContact);}
      catch (err) {return res.status(400).send({'message': err.code ===11000 ? 'Phone must be unique' : Object.values(err.errors).map(val => val.message)})};
    }
    catch (err) { return res.status(404).send({'message': 'Not found'})};
    }
    catch (err) {
      res.status(500).send(err);
  }
}

async function remove(req, res) {
  try {
    const id = req.query.id;
    let deletedContact;
    try {deletedContact = await removeContact(id)
    if (!Object.keys(deletedContact)) return res.status(404).send({'message': 'Not found'}) }
    catch(err) {return res.status(404).send({'message': 'Not found'})}

    await User.updateOne({ _id: deletedContact.user }, { $pull: { contacts: deletedContact._id } });

    return res.send("Contact removed");
  } catch (error) {
    console.log(error);
  }
}


module.exports = { add, get, update, remove };
