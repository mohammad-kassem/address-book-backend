const User = require('../../model/User');
const { addContact, getById, getContacts, updateContact, removeContact } = require('./service');
const jwt_decode = require('jwt-decode');


async function add(req, res) {
  try {
    const user_id = jwt_decode(req.headers['authorization'])._id;
    let newContact;
    try {newContact = await addContact(req.body, user_id)}
    catch (err) {
      return res.status(400).json({message: err.code ===11000 ? 'Phone number must be unique' : Object.values(err.errors).map(val => val.message)})};

    const updateUser = await User.updateOne({
        _id: newContact.user
      },{
        $push: {
          contacts: newContact._id
        }
      }
    );
    return res.status(200).send(newContact);
  }catch (err) {
    res.status(500).json(err);
  }
}

async function get(req, res){
  try{
    if (req.query.id) {
      const id = req.query.id;
      let result;
      try {result = await getById(id)
        if(!Object.keys(result)) return res.status(404).json({message: 'Not found'})}
      catch(err) {return res.status(404).json({message: 'Not found'})};
      return res.status(200).send(result);
    }
    const user_id = jwt_decode(req.headers['authorization'])._id;
    const result = await getContacts(user_id);
    return res.status(200).send(result);
    }
  catch (err) {
    res.status(500).json(err);
  }
}

async function update(req, res){
  try {
    const id = req.query.id;
    let updatedContact;
    try {updatedContact = await getById(id);
      if (!Object.keys(updatedContact)) {return res.status(404).json({message: 'Not found'})};
      try {updatedContact = await updateContact(req.body, id);
      return res.status(200).send(updatedContact);}
      catch (err) {return res.status(400).json({message: err.code ===11000 ? 'Phone must be unique' : Object.values(err.errors).map(val => val.message)})};
    }
    catch (err) { return res.status(404).json({message: 'Not found'})};
    }
    catch (err) {
      res.status(500).json(err);
  }
}

async function remove(req, res) {
  try {
    const id = req.query.id;
    let deletedContact;
    try {deletedContact = await removeContact(id)
    if (!Object.keys(deletedContact)) return res.status(404).json({message: 'Not found'}) }
    catch(err) {return res.status(404).json({message: 'Not found'})}

    await User.updateOne({ _id: deletedContact.user }, { $pull: { contacts: deletedContact._id } });

    return res.send("Contact removed");
  } catch (error) {
    res.status(500).json(err);
  }
}


module.exports = { add, get, update, remove };
